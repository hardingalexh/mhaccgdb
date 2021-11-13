import search from './search'
import store from '@/store/index'
import {types} from '@/utils/lookups'

export default async (state, pageObject, hs) => {
    // get all cards
    const cards = store.getters.cards
    // create list of cards in deck with quantity included
    let cardsInDeck = cards.filter(c => hs.getFilter('deck').includes(c.id))
    .map(c => {return {...c, quantity: hs.getFilter('deck').filter(card => card === c.id).length}})
    let sortOrder = {'low': 0, 'mid': 1, 'high': 2 }
    cardsInDeck = types.reduce((acc, type) => {
        acc[type] = cardsInDeck
            .filter(c => c.type.toLowerCase() === type.toLowerCase())
            .sort((a, b) => {
            if (type === 'Attack'){
                return sortOrder[a['attack_zone']] - sortOrder[b['attack_zone']]
            }
            return sortOrder[a['block_zone']] - sortOrder[b['block_zone']]
        })
        return acc
    }, {})


    let attacks = cardsInDeck['Attack']
    
    const results = await search(hs)
    let ret = {
        results: results,
        deck: cardsInDeck,
        combatPotency: combatPotency(attacks, cardsInDeck),
        consistency: consistency(cardsInDeck)
        // }
    }
    return ret
}

function consistency(cardsInDeck){
    return Object.values(cardsInDeck).reduce((acc, cat) => {
        return cat.reduce((acc2, card) => {
            acc2['difficulty'] += card.difficulty * card.quantity
            acc2['check'] += card.check * card.quantity
            return acc2
        }, acc)
    }, {'difficulty': 0, 'check': 0})
}

function combatPotency(attacks, cards){
        // [atkspeed, atkdamage, atkdifficulty, atklength, blockmod, blocklength]
        let zones = {'low': [0,0,0,0,0,0], 'mid': [0,0,0,0,0,0], 'high': [0,0,0,0,0,0], 'total': [0,0,0,0,0,0]}
        // gather attack stats
        attacks.forEach(card => {
            let loop = [card.attack_zone, 'total']
            loop.forEach(zone => {
                zones[zone][0] += card.speed * card.quantity
                zones[zone][1] += card.damage * card.quantity
                zones[zone][2] += card.difficulty * card.quantity
                zones[zone][3] += card.quantity
            })
        })
        // gather block stats
        Object.values(cards).forEach(cardType => {
            cardType.forEach(card => {
                zones[card.block_zone][4] += card.block_modifier * card.quantity
                zones[card.block_zone][5] += card.quantity
                zones['total'][4] += card.block_modifier * card.quantity
                zones['total'][5] += card.quantity
            })
        })
        // create averages
        if( zones['total'].reduce((acc, s) => acc += s, 0) > 0){
            Object.keys(zones).forEach(zone => {
                // avg speed
                zones[zone][0] = zones[zone][0] / zones[zone][3]
                // avg damage
                zones[zone][1] = zones[zone][1] / zones[zone][3]
                // avg difficulty
                zones[zone][2] = zones[zone][2] / zones[zone][3]
                // avg block
                zones[zone][4] = zones[zone][4] / zones[zone][5]
                // scale quantities to percent and 10
                zones[zone][3] = (zones[zone][3] * 10) / zones['total'][3]
                zones[zone][5] = (zones[zone][5] * 10) / zones['total'][5]
            })
        }
        return zones
}
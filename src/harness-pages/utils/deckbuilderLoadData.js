import search from './search'
import store from '@/store/index'
import {types} from '@/utils/lookups'

export default async (state, pageObject, hs) => {
    // get all cards
    const cards = store.getters.cards
    // create list of cards in deck with quantity included
    let cardsInDeck = cards.filter(c => hs.getFilter('deck').includes(c.id))
    .map(c => {return {...c, quantity: hs.getFilter('deck').filter(card => card === c.id).length}})
    cardsInDeck = types.reduce((acc, type) => {
        acc[type] = cardsInDeck.filter(c => c.type.toLowerCase() === type.toLowerCase())
        return acc
    }, {})


    
    
    return {
        results: await search(hs),
        checkToDifficulty: checkToDifficulty(cardsInDeck),
        deck: cardsInDeck
    }
}

function checkToDifficulty(cardsInDeck){
    return Object.values(cardsInDeck).reduce((acc, cat) => {
        return cat.reduce((acc2, card) => {
            acc2['difficulty'] += card.difficulty ? card.difficulty * card.quantity : 0
            acc2['check'] += card.check ? card.check * card.quantity: 0
            return acc2
        }, acc)
    }, {'difficulty': 0, 'check': 0})
}

// function averageSpeed(cardsInDeck){
//         let atkLen = 0
//         const stats = cardsInDeck['Attack'].reduce((acc, card) => {atkLen += card.quantity; return acc += card.speed * card.quantity}, 0)
//         return stats / atkLen
// }

// function averageDamage(cardsInDeck){
//     const stats = cardsInDeck['Attack'].reduce((acc, card) => acc += card.damage * card, 0)
//     return stats / this.getChartData(this.chart.key)['Attack'].length
// }

// function zoneCount(cardsInDeck, type){
//     const zones = {'low': 0, 'mid': 0, 'high': 0}
//     return cardsInDeck.reduce((acc, card))
// }
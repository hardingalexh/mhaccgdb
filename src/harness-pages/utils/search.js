import store from '@/store/index'
export default async (hs) => {
    let cards = store.getters.cards

    // general filters
    if(hs.isFilterDirty('collectors_sets')){
        cards = cards.filter(card => hs.getFilter('collectors_sets').includes(card.collectors_set.toLowerCase()))
    }

    if(hs.isFilterDirty('types')){
        console.log(hs.getFilter('types'))
        cards = cards.filter(card => hs.getFilter('types').includes(card.type) )
    }
    
    if(hs.isFilterDirty('rarity')){
        cards = cards.filter(card => hs.getFilter('rarity').includes(card.rarity))
    }

    if(hs.isFilterDirty('resources')){
        console.log(hs.getFilter('resources'))
        cards = cards.filter(card => hs.getFilter('resources').some(r => card.resources.includes(r.toLowerCase())))
    }

    if(hs.isFilterDirty('keywords')){
        console.log(hs.getFilter('keywords'))
        cards = cards.filter(card => hs.getFilter('keywords').some(r => card.keywords ? card.keywords.filter(k => k.toLowerCase().includes(r.toLowerCase())).length : false))
    }

    if(hs.isFilterDirty('title')){
        cards = cards.filter(card => card.title.toLowerCase().includes(hs.getFilter('title').toLowerCase()))
    }

    if(hs.isFilterDirty('abilities')){
        let query = hs.getFilter('abilities').toLowerCase()
        cards = cards.filter(card => {
            let ret = false
            card.abilities.forEach(ability => {
                if(ability.ability_type.toLowerCase().includes(query) || ability.ability_text.toLowerCase().includes(query)){
                    ret = true
                }
            })
            return ret
        })
    }

    // attack
    if(hs.isFilterDirty('attack_zone')){
        cards = cards.filter(card => card.type === 'attack' && hs.getFilter('attack_zone').includes(card.attack_zone.toLowerCase()))
    }

    if(hs.isFilterDirty('min_speed')){
        cards = cards.filter(card => card.speed >= hs.getFilter('min_speed'))
    }

    if(hs.isFilterDirty('min_damage')){
        cards = cards.filter(card => card.damage >= hs.getFilter('min_damage'))
    }

    // block
    if(hs.isFilterDirty('block_zone')){
        cards = cards.filter(card => card.block_zone && hs.getFilter('block_zone').includes(card.block_zone.toLowerCase()))
    }

    if(hs.isFilterDirty('max_block_modifier') && hs.getFilter('max_block_modifier') !== ''){
        console.log(hs.getFilter('max_block_modifier'))
        cards = cards.filter(card => (card.block_modifier || card.block_modifier === 0) && card.block_modifier <= hs.getFilter('max_block_modifier'))
    }

    return cards
}
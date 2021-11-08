<template>
    <div>
        <div class="row">
            <div class="col-5">
                <chartGrid :only="['deck']" />
            </div>
            <div class="col-7" id="deckbuilder-search-col">
                <filtersAccordion />
                <chartGrid :only="['results']" />
            </div>
        </div>
    </div>
</template>
<script>
import filtersAccordion from '@/components/utils/filtersAccordion'
export default {
    title: "deckbuilder",
    components: {filtersAccordion},
    methods: {
        updateDeck(card, quantity){
            let deck = this.getFilter('deck')
            let currQ = deck.filter(d => d === card)
            console.log(currQ, deck)
            deck = deck.filter(d => d !== card)
            if(currQ !== quantity){
                deck.append(Array(quantity).fill(card))
            }
            this.setFilter(deck)
            this.loadData()
        }
    }
}
</script>
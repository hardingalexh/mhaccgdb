<template>
    <div>
        <div class="row">
            <div class="col-5">
                <filterGrid :only="['deck_title']" :clearButton="false" />
                <p>Card Count: {{getFilter('deck').length}}</p>
                <hr />
                <chartGrid :only="['deck']"/>
                <hr />
                
            </div>
            <div class="col-7" id="deckbuilder-search-col">
                <ul class="nav nav-pills mb-3" id="pills-tab" role="tablist">
                    <li class="nav-item">
                        <a class="nav-link active" id="pills-Cards-tab" data-toggle="pill" href="#pills-Cards" role="tab" aria-controls="pills-Cards" aria-selected="true">Cards</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" id="pills-Insights-tab" data-toggle="pill" href="#pills-Insights" role="tab" aria-controls="pills-Insights" aria-selected="false">Insights</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" id="pills-Description-tab" data-toggle="pill" href="#pills-Description" role="tab" aria-controls="pills-Description" aria-selected="false">Description</a>
                    </li>
                </ul>
                <div class="tab-content" id="pills-tabContent">
                    <div class="tab-pane fade show active" id="pills-Cards" role="tabpanel" aria-labelledby="pills-Cards-tab">
                        <filtersAccordion />
                        <chartGrid :only="['results']" />   
                    </div>
                    <div class="tab-pane fade" id="pills-Insights" role="tabpanel" aria-labelledby="pills-Insights-tab">
                        <chartGrid :only="['combatPotency', 'consistency']" />
                    </div>
                    <div class="tab-pane fade" id="pills-Description" role="tabpanel" aria-labelledby="pills-Description-tab">
                        <textarea class="form-control" rows=10 />
                    </div>
                </div>
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
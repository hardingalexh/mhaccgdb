<template>
    <div>
        <div class="row">
            <div class="col-5">
                <filterGrid :only="['deck_title']" :clearButton="false" />
                <p>Card Count: {{getFilter('deck').length}}</p>
                <hr />
                <chartGrid :only="['deck']"/>
                <hr />
                <h4>Insights</h4>
                <ul class="nav nav-pills mb-3" id="insights-tab" role="tablist">
                    <li class="nav-item">
                        <a class="nav-link active" id="insights-combatPotency-tab" data-toggle="pill" href="#insights-combatPotency" role="tab" aria-controls="insights-combatPotency" aria-selected="false">Combat Potency</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" id="insights-consistency-tab" data-toggle="pill" href="#insights-consistency" role="tab" aria-controls="insights-consistency" aria-selected="false">Consistency</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" id="insights-deckMakeup-tab" data-toggle="pill" href="#insights-deckMakeup" role="tab" aria-controls="insights-deckMakeup" aria-selected="false">Deck Makeup</a>
                    </li>
                </ul>
                <div class="tab-content" id="insights-tabContent">
                    <div class="tab-pane fade show active" id="insights-combatPotency" role="tabpanel" aria-labelledby="insights-combatPotency-tab">
                        <chartGrid :only="['combatPotency']" />
                    </div>
                    <div class="tab-pane fade" id="insights-consistency" role="tabpanel" aria-labelledby="insights-consistency-tab">
                        <chartGrid :only="['consistency']" />
                    </div>
                    <div class="tab-pane fade" id="insights-deckMakeup" role="tabpanel" aria-labelledby="insights-deckMakeup-tab">
                        <chartGrid :only="['deckMakeup']" />
                    </div>
                </div>
            </div>
            <div class="col-7" id="deckbuilder-search-col">
                <ul class="nav nav-pills mb-3" id="pillsRight-tab" role="tablist">
                    <li class="nav-item">
                        <a class="nav-link active" id="pillsRight-Cards-tab" data-toggle="pill" href="#pillsRight-Cards" role="tab" aria-controls="pillsRight-Cards" aria-selected="true">Cards</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" id="pillsRight-Description-tab" data-toggle="pill" href="#pillsRight-Description" role="tab" aria-controls="pillsRight-Description" aria-selected="false">Description</a>
                    </li>
                </ul>
                <div class="tab-content" id="pillsRight-tabContent">
                    <div class="tab-pane fade show active" id="pillsRight-Cards" role="tabpanel" aria-labelledby="pillsRight-Cards-tab">
                        <filtersAccordion />
                        <chartGrid :only="['results']" />   
                    </div>
                    <div class="tab-pane fade" id="pillsRight-Description" role="tabpanel" aria-labelledby="pillsRight-Description-tab">
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
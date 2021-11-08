<template>
    <div class="btn-group btn-group-sm" role="group" aria-label="Second group">
        <button v-for="(key, quantity) in Array(4)" 
            :class="'btn btn-primary ' + (getFilter('deck').filter(c => c ===card.id).length === (quantity + 1) ? 'active' : '')"
            :key="quantity" 
            type="button"
            @click="updateDeck(card.id, quantity + 1)"
            >
            {{quantity + 1}}
        </button>
    </div>
</template>
<script>
export default {
    title: "cardQuantity",
    props: ['card'],
    methods: {
        updateDeck(card, quantity){
            let deck = this.getFilter('deck')
            let currQ = deck.filter(d => d === card).length
            deck = deck.filter(d => d !== card)
            if(currQ !== quantity){
                deck = deck.concat(Array(quantity).fill(card))
            }
            this.setFilter('deck', deck)
            this.loadData() 
        }
  }
}
</script>
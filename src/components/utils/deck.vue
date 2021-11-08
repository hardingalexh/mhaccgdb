<template>
    <div>
        <div class="row" v-if="getChartData(chart.key)">
            <div v-for="(type, key) in types" :key="type+key" class="col-6">
                <h3>{{type}}s <br /><small>{{getTypeQuantityString(type)}}</small></h3>
                <ul class="list-group">
                    <li 
                        class=" deck-list-group d-flex justify-content-between align-items-center"
                        v-for="card in getChartData(chart.key)[type]" :key="card.id"
                    >
                        <a href="" @click.prevent="$store.dispatch('SET_CARD', card)" data-toggle="modal" data-target="#cardModal">{{card.title}}</a>
                        <cardQuantity :card="card" />
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>
<script>
import {types} from '@/utils/lookups'
import cardQuantity from './cardQuantity'
export default {
    title: 'deck',
    components: {cardQuantity},
    data() {
        return {
            types: types
        }
    },
    props: {
        chart: {
            required: true,
            type: Object
        },
        deckbuilder: {
            required: false,
            type: Boolean,
            default: false
        }
    },
    methods: {
        getTypeQuantityString(type){
            let q = 0
            let pct = 0
            if(this.getChartData(this.chart.key) && this.getChartData(this.chart.key)[type].length > 0){
            q = this.getChartData(this.chart.key)[type].reduce((acc, card) => acc += card.quantity, 0)
            pct = (q / this.getFilter('deck').length) * 100    
            }
            
            
            return `${q} (${pct.toFixed(2)}%)`
        }
    }
}
</script>
<template>
  <div id="search-results-table-wrapper">
    <p v-if="getChartData(chart.key)" class="lead">Results: {{getChartData(chart.key).length}}</p>
    <table class="table table-striped table-bordered" id="search-results-table" v-if="getChartData(chart.key)">
      <thead>
          <td class="text-center">Title</td>
          <td class="text-center">Type</td>
          <td class="text-center">Resources</td>
          <td class="text-center">Difficulty</td>
          <td class="text-center">Check</td>
          <td class="text-center">Attack</td>
          <td class="text-center">Damage</td>
          <td class="text-center">Block</td>
      </thead>
      <tbody>
        <tr v-for="(result, key) in getChartData(chart.key)" :key="key">
          <td class="align-middle text-center"> 
            <a href="" @click.prevent="$store.dispatch('SET_CARD', result)" data-toggle="modal" data-target="#cardModal">{{result.title}}</a>
            <cardQuantity v-if="deckbuilder" :card="result" />
          </td>
          <td class="align-middle text-center">{{result.type | capitalize}}</td>
          <td class="align-middle text-center">
            <div class="row no-gutters">
                <div class="col" v-for="(resource, rkey) in result.resources" :key="rkey">
                    <resource :resource="resource" />
                </div>
            </div>
          </td>
          <td class="align-middle text-center big-text">{{result.difficulty}}</td>
          <td class="align-middle text-center big-text">{{result.check}}</td>
          <td class="align-middle text-center"><attack v-if="result.type === 'attack'" :zone="result.attack_zone" :speed="result.speed"/></td>
          <td class="align-middle text-center"><damage v-if="result.type === 'attack'" :damage="result.damage"/></td>
          <td class="align-middle text-center"><block v-if="result.block_modifier && result.block_zone" :modifier="result.block_modifier" :zone="result.block_zone" /></td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import resource from './resource'
import cardQuantity from './cardQuantity'
import block from './block'
import attack from './attack'
import damage from './damage'
export default {
  name: 'searchResults',
  components: {cardQuantity, resource, block, attack, damage},
  props: {
    chart: {
      type: Object,
      required: true
    },
    deckbuilder: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  data() {
    return {
      card: false
    }
  }
}
</script>
<template>
    <div class="card card-card">
        <img class="card-img-top text-center mx-auto" :src="card_image" :alt="card.title" @click="xr = !xr">
        <div class="card-body text-center">
            <!-- Metadata -->
            <table class="table table-striped table-bordered">
                <thead>
                </thead>
                <tbody>
                    <tr>
                        <td>Collector's Information</td>
                        <td>{{card.collectors_set}} - {{card.collectors_number}} - {{card.rarity.toUpperCase()}}</td>
                    </tr>
                    <tr>
                        <td>Card Type</td>
                        <td>{{card.type | capitalize}}</td>
                    </tr>
                    <tr>
                        <td v-if="card.type === 'character'">Health</td>
                        <td v-if="card.type === 'character'">{{card.health}}</td>
                    </tr>
                    <tr>
                        <td v-if="card.type === 'character'">Hand Size</td>
                        <td v-if="card.type === 'character'">{{card.hand_size}}</td>
                    </tr>
                    <tr>
                        <td>Resources</td>
                        <td>
                            <div class="row">
                                <div class="col" v-for="(resource, rkey) in card.resources" :key="rkey">
                                    <resource :resource="resource" />
                                </div>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td>Difficulty</td>
                        <td class="big-text">{{card.difficulty}}</td>
                    </tr>
                    <tr>
                        <td>Check</td>
                        <td class="big-text">{{card.check}}</td>
                    </tr>
                    <tr>
                        <td v-if="card.block_zone">Block</td>
                        <td v-if="card.block_zone"><block :zone="card.block_zone" :modifier="card.block_modifier" /></td>
                    </tr>
                    <tr v-if="card.type === 'attack'">
                        <td>Attack</td>
                        <td><attack :zone="card.attack_zone" :speed="card.speed" /></td>
                    </tr>
                    <tr v-if="card.type === 'attack'">
                        <td>Damage</td>
                        <td><damage :damage="card.damage" /></td>
                    </tr>

                </tbody>
            </table>
            <p><em>
                <span v-for="(keyword, tkey) in card.keywords" :key="tkey">{{keyword.toUpperCase()}} <span v-if="tkey < card.keywords.length -1"> &nbsp;|&nbsp;</span></span>
            </em></p>
            <p v-for="(ability, akey) in card.abilities" :key="akey">
                <strong v-if="ability.ability_type">{{ability.ability_type.toUpperCase()}}:</strong> <span v-html="ability.ability_text" />
            </p>
        </div>
    </div>
</template>

<script>
import resource from './resource'
import block from './block'
import attack from './attack'
import damage from './damage'
export default {
  name: 'card',
  components: {resource, block, attack, damage},
  props: {
      card: {
          type: Object,
          required: true
      }
  },
  data() {
      return {
          xr: false
      }
  },
  computed: {
      card_image() {
          if(this.card){
              return `/images/${this.card.id}${this.xr ? 'xr' : ''}.png`
          }
          return null
      }
  }
}
</script>
<template>
  <div id="app">
    <nav class="navbar navbar-expand-lg">
      <a class="navbar-brand" href="#">MHACCGDB</a>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item" v-for="page in pages" :key="`${page}-nav-item`">
            <router-link
              :to="`/${page}`"
              :class="`nav-link ${$router.currentRoute.name === page ? 'active' : ''}`"
            >
              {{page}}
            </router-link>
          </li>
        </ul>
      </div>
    </nav>
    <div class="row">
      <div class="container">
        <router-view />
      </div>
    </div>
    <!-- Modal -->
    <div class="modal fade" id="cardModal" tabindex="-1" role="dialog" aria-labelledby="cardModalLabel" aria-hidden="true" v-if="card">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="cardModalLabel">{{card.title}}</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <card :card="card" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import card from '@/components/utils/card'
export default {
  name: 'app',
  components: {card},
  computed: {
    ...mapGetters(['cards', 'card'])
  },
}
</script>

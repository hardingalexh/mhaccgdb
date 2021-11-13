import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    cards: null,
    card: null
  },
  mutations: {
    SET_CARDS: (state, payload) => {
      state.cards = payload
    },
    SET_CARD: (state, payload) => {
      state.card = payload
    }
  },
  actions: {
    RETRIEVE_CARDS: async (context) => {
      await fetch('/data/cards.json')
      .then(response => response.json())
      .then(data => {
          context.commit("SET_CARDS", data)
      })
    },
    SET_CARD: (context, payload) => {
      context.commit("SET_CARD", payload)
    }
  },
  getters: {
    cards: (state) => state.cards,
    card: (state) => state.card
  }
})

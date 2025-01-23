import { createStore } from 'vuex';

// Create a new store instance.
export interface State {
  searchQuery: string;
}

const store = createStore({
  state(): State {
    return {
      searchQuery: '',
    };
  },
  mutations: {
    search(state: State, query: string) {
      state.searchQuery = query;
    },
  },
  actions: {
    search({ commit }, query: string) {
      commit('search', query);
    },
  },
});
export default store;

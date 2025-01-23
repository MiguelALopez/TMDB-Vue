import { createStore } from 'vuex';
import type { MovieGenre } from '@/types/movie.ts';

// Create a new store instance.
export interface State {
  searchQuery: string;
  genres: { [key: number]: string };
}

const store = createStore({
  state(): State {
    return {
      searchQuery: '',
      genres: [],
    };
  },
  mutations: {
    search(state: State, query: string) {
      state.searchQuery = query;
    },
    setGenres(state: State, genres: MovieGenre[]) {
      state.genres = genres.reduce((acc: { [key: number]: string }, genre) => {
        acc[genre.id] = genre.name;
        return acc;
      }, {});
    },
  },
  actions: {
    search({ commit }, query: string) {
      commit('search', query);
    },
    setGenres({ commit }, genres: MovieGenre[]) {
      commit('setGenres', genres);
    },
  },
  getters: {
    getSearchQuery(state: State) {
      return state.searchQuery;
    },
    getGenres(state: State) {
      return state.genres;
    },
    findGenreById: (state: State) => (id: number) => {
      return state.genres[id];
    },
  },
});

export default store;

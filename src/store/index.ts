import { createStore } from 'vuex';
import type { MovieGenre } from '@/types/movie.ts';

// Create a new store instance.
export interface State {
  searchQuery: string;
  genres: { [key: number]: string };
  languages: { [key: string]: string };
}

const store = createStore({
  state(): State {
    return {
      searchQuery: '',
      genres: {},
      languages: {},
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
    setLanguages(
      state: State,
      languages: {
        iso_639_1: string;
        english_name: string;
        name: string;
      }[],
    ) {
      state.languages = languages.reduce((acc: { [key: string]: string }, language) => {
        acc[language.iso_639_1] = language.english_name;
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
    setLanguages(
      { commit },
      languages: {
        iso_639_1: string;
        english_name: string;
        name: string;
      }[],
    ) {
      commit('setLanguages', languages);
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
    getLanguages(state: State) {
      return state.languages;
    },
  },
});

export default store;

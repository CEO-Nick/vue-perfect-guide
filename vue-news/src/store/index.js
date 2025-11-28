import Vue from 'vue';
import Vuex from 'vuex';
import { fetchAskList, fetchJobsList, fetchNewsList } from '../api/index';

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    news: [],
    ask: [],
    jobs: [],
  },
  mutations: {
    SET_NEWS(state, news) {
      state.news = news;
    },
    SET_ASK(state, ask) {
      state.ask = ask;
    },
    SET_JOBS(state, jobs) {
      state.jobs = jobs;
    },
  },
  actions: {
    FETCH_NEWS(context) {
      fetchNewsList()
        .then((response) => context.commit('SET_NEWS', response.data))
        .catch((error) => console.log(error));
    },
    FETCH_ASK(context) {
      fetchAskList()
        .then((response) => context.commit('SET_ASK', response.data))
        .catch((error) => console.log(error));
    },
    FETCH_JOBS({ commit }) {
      // response 객체를 destructuring 가능
      fetchJobsList()
        .then(({ data }) => commit('SET_JOBS', data))
        .catch((error) => console.log(error));
    },
  },
});

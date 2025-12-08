import Vue from 'vue';
import Vuex from 'vuex';
import {fetchAskList, fetchJobsList, fetchNewsList} from '../api/index';

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
    // context 안에 commit이 있어서 바로 꺼내서 쓴다 = destructuring
    FETCH_JOBS({commit}) {
      // response 객체를 destructuring 가능
      fetchJobsList()
      .then(({data}) => commit('SET_JOBS', data))
      .catch((error) => console.log(error));
    },
    FETCH_ASK({commit}) {
      fetchAskList()
      .then(({data}) => commit('SET_ASK', data))
      .catch((error) => console.log(error));
    },
  },
});

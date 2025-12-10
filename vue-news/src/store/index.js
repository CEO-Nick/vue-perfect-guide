import Vue from 'vue';
import Vuex from 'vuex';
import mutations  from "@/store/mutations";
import actions from "@/store/actions";

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    news: [],
    ask: [],
    jobs: [],
    user: {},
    item: {},
  },
  getters: {
    fetchedAsk(state) {
      return state.ask;
    },
    fetchedNews(state) {
      return state.news;
    },
    fetchedJobs(state) {
      return state.jobs
    },
    fetchedUserInfo(state) {
      return state.user;
    },
    fetchedItemInfo(state) {
      return state.item;
    }
  },
  mutations,
  actions,
});

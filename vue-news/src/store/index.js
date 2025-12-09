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
    }
  },
  mutations,
  actions,
});

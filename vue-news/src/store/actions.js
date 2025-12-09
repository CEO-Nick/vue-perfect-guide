import {fetchAskList, fetchJobsList, fetchNewsList, fetchUserInfo} from "@/api";

export default {
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
  FETCH_USER({commit}, name) {
    fetchUserInfo(name)
      .then(({data}) => commit('SET_USER', data))
      .catch((error) => console.log(error));
  },
}
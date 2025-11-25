import Vue from 'vue';
import VueRouter from 'vue-router';
import NewsView from '../views/NewsView.vue';
import AskView from '../views/AskView.vue';
import JobsView from '../views/JobsView.vue';

Vue.use(VueRouter);

export const router = new VueRouter({
  mode: 'history', // url에서 # 없애기
  routes: [
    {
      path: '/',
      redirect: '/news',
    },
    {
      // path: url 주소
      // component: url 주소로 갔을 때 표시될 컴포넌트
      path: '/news',
      component: NewsView,
    },
    {
      path: '/ask',
      component: AskView,
    },
    {
      path: '/jobs',
      component: JobsView,
    },
  ],
});

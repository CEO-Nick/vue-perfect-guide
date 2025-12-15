<template>
  <div>
    <ul class="ask-list">
      <li class="ask" v-for="item in fetchedAsk" :key="item.id">
        <!-- 포인트 영역 -->
        <div class="points">
          {{ item.points }}
        </div>

        <!-- 기타 정보 영역-->
        <div>
          <router-link class="ask-title" :to="`/item/${item.id}`">
            {{ item.title }}
          </router-link>

          <small class="ask-text">
            {{ item.time_ago }} by
            <router-link class="link-text" :to="`/user/${item.user}`">
              {{ item.user }}
            </router-link>
          </small>
        </div>

      </li>
    </ul>
    <p v-for="item in fetchedAsk" :key="item.id">
      <router-link :to="`/item/${item.id}`"> {{ item.title }}</router-link>
      <small> {{ item.time_ago }} by {{ item.user }}</small>
    </p>
  </div>
</template>
<script>
import {mapGetters} from 'vuex';

export default {
  computed: {
    ...mapGetters([
      'fetchedAsk'
    ])
  },
  // 컴포넌트가 생성될 때 실행되는 life cycle hook
  created() {
    this.$store.dispatch('FETCH_ASK');
  },
};
</script>

<style scoped>
.ask-list {
  margin: 0;
  padding: 0;
}
.ask {
  list-style: none;
  display: flex;
  align-items: center;
  border-bottom: 1px solid #eee;

}
.points {
  width: 80px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #42b883
}
.ask-title {
  margin: 0;
}
.ask-text {
  color:#828282;
}
</style>

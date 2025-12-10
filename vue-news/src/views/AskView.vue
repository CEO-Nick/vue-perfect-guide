<template>
  <div>
    <p v-for="item in fetchedAsk" :key="item.id">
      <router-link :to="`/item/${item.id}`"> {{ item.title }} </router-link>
      <small> {{ item.time_ago}} by {{ item.user }}</small>
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

<style></style>

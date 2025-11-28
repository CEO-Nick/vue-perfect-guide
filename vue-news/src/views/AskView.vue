<template>
  <div>
    <div v-for="item in asks" :key="item.id">{{ item.title }}</div>
  </div>
</template>

<script>
import { fetchAskList } from '../api/index';

export default {
  data() {
    return {
      asks: [],
    };
  },
  // 컴포넌트가 생성될 때 실행되는 life cycle hook
  created() {
    fetchAskList()
      .then((res) => (this.asks = res.data))
      .catch((err) => console.log(err));
  },
};
</script>

<style></style>

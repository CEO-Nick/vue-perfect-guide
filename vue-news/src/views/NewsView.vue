<template>
  <div>
    <div v-for="item in news" :key="item.id">{{ item.title }}</div>
  </div>
</template>

<script>
import { fetchNewsList } from '../api/index';

export default {
  data() {
    return {
      news: [],
    };
  },

  created() {
    fetchNewsList()
      .then((response) => (this.news = response.data))
      .catch((error) => console.log(error));
  },
};
</script>

<style></style>

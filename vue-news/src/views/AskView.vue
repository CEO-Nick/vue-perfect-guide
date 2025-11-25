<template>
  <div>
    <div v-for="ask in asks"> {{ ask.title }}</div>
  </div>
</template>

<script>
import {fetchAskList} from '../api/index';

export default {
  data() {
    return {
      asks: [],
    }
  },
  created() {
    fetchAskList()
    .then(res => this.asks = res.data)
    .catch(err => console.log(err))
  }
};
</script>

<style></style>

<template>
  <div>
    <div v-for="item in fetchedNews" :key="item.id">
      {{ item.title }}
    </div>
  </div>
</template>

<script>
import {mapGetters} from "vuex";

export default {
  computed: {
    ...mapGetters([
        'fetchedNews'
    ])
  },
  created() {
    this.$store.dispatch('FETCH_NEWS');
  },
};
</script>

<style></style>

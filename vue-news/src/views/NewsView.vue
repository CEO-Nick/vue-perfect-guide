<template>
  <div>
    <div v-for="item in this.$store.state.news" :key="item.id">
      {{ item.title }}
    </div>
  </div>
</template>

<script>
export default {
  created() {
    this.$store.dispatch('FETCH_NEWS');
  },
};
</script>

<style></style>

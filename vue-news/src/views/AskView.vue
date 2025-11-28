<template>
  <div>
    <div v-for="item in this.$store.state.ask" :key="item.id">
      {{ item.title }}
    </div>
  </div>
</template>

<script>
export default {
  // 컴포넌트가 생성될 때 실행되는 life cycle hook
  created() {
    this.$store.dispatch('FETCH_ASK');
  },
};
</script>

<style></style>

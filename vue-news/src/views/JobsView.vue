<template>
  <div>
    <div v-for="job in this.$store.state.jobs" :key="job.id">
      {{ job.title }}
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      jobs: [],
    };
  },
  created() {
    this.$store.dispatch('FETCH_JOBS');
  },
};
</script>

<style></style>

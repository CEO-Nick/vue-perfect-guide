<template>
  <div>
    <p v-for="item in fetchedNews" :key="item.id">
      <a v-bind:href="item.url">
        {{ item.title }}
      </a>
      <small>{{ item.time_ago }} by
<!--        <router-link :to="'/user/' + item.user"> {{ item.user }} </router-link>-->
        <router-link :to="`/user/${item.user}`"> {{ item.user }} </router-link>
      </small>

    </p>
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

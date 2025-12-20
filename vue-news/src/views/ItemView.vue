<template>
  <div>
    <section>
    <!-- 사용자 정보 -->
      <user-profile :info="itemInfo">
        <router-link slot="username" :to="`/user/${itemInfo.user}`">
          {{itemInfo.user}}
        </router-link>
        <template slot="time">{{ 'Posted: ' + itemInfo.time_ago }}</template>
      </user-profile>
    </section>

    <section>
      <h2> {{ itemInfo.title }}</h2>
    </section>
    <section>
      <!-- 질문 댓글 -->
      <div v-html="itemInfo.content"/>
    </section>

    <p> comments ({{ itemInfo.comments_count }})</p>
    <p v-for="comment in itemInfo.comments" :key="comment.id">
      {{ comment.content }}
    </p>

  </div>
</template>

<script>
  import {mapGetters} from "vuex";
  import UserProfile from "@/components/UserProfile.vue";

  export default {
    components: {UserProfile},
    computed: {
      ...mapGetters({
        itemInfo: 'fetchedItemInfo',
      })
    },
    created() {
      const itemId = this.$route.params.id;
      this.$store.dispatch('FETCH_ITEM', itemId);
    },
  }
</script>

<style scoped>
.user-container{
  display: flex;
  align-items: center;
  padding: 0.5rem;
}
.fa-user{
  font-size: 2.5rem;
}
.user-description{
  padding-left: 8px;
}
.time{
  font-size: 0.7rem;
}
</style>

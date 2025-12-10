<template>
  <div>
    <section>
    <!-- 질문 상세 정보-->
      <div class="user-container">
        <div>
          <i class="fas fa-user"></i>
        </div>
        <div class="user-description">
          <router-link :to="`/user/${itemInfo.user}`">
            {{ itemInfo.user }}
          </router-link>
          <div class="time">
            {{ itemInfo.time_ago }}
          </div>
        </div>
      </div>
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

  export default {
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

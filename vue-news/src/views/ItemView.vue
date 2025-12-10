<template>
  <div>
    <p>title: {{ itemInfo.title}}</p>
    <p>user: {{ itemInfo.user}}</p>
    <p>content: {{ itemInfo.content}}</p>

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

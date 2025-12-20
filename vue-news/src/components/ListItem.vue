<template>
  <div>
    <ul class="news-list">
      <li v-for="item in listItems" :key="item.id" class="post">
        <!-- 포인트 영역 -->
        <div class="points">
          {{ item.points || 0 }}
        </div>
        <!-- 기타 정보 영역 -->
        <div>
          <!-- 타이틀 영역 -->
          <p class="news-title">
            <!-- news는 domain이 있고, ask는 domain이 없다-->
            <template v-if="item.domain">
              <a v-bind:href="item.url">
                {{ item.title }}
              </a>
            </template>
            <template v-else>
              <router-link v-bind:to="`item/${item.id}`">
                {{ item.title }}
              </router-link>
            </template>
          </p>
          <small class="link-text">
            by
            <router-link
                v-if="item.user"
                class="link-text"
                :to="`/user/${item.user}`"> {{ item.user }}
            </router-link>
            <a :href="item.url" v-else>
              {{ item.domain }}
            </a>
          </small>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import {mapGetters} from 'vuex';

export default {
  computed: {
    ...mapGetters(['fetchedNews', 'fetchedAsk', 'fetchedJobs']),
    // eslint-disable-next-line vue/return-in-computed-property
    listItems() {
      const name = this.$route.name;
      if (name === 'news') {
        return this.fetchedNews;
      } else if (name === 'ask') {
        return this.fetchedAsk;
      } else if (name === 'jobs') {
        return this.fetchedJobs;
      }
    }
  },
};
</script>

<style scoped>
.news-list {
  margin: 0;
  padding: 0;
}

.post {
  list-style: none;
  display: flex;
  align-items: center;
  border-bottom: 1px solid #eee;

}

.points {
  width: 80px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #42b883
}

.news-title {
  margin: 0;
}

.link-text {
  color: #828282;
}
</style>
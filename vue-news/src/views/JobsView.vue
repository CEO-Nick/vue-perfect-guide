<template>
  <div>
    <ul class="jobs-list">
      <li class="job" v-for="item in fetchedJobs" :key="item.id">
        <!-- 포인트 영역 -->
        <div class="points">
          {{ item.points || 0 }}
        </div>

        <!-- 기타 정보 영역 -->
        <p class="job-title">
          <a :href="item.url">
            {{ item.title }}
          </a>
        </p>
        <small class="job-text">
          {{ item.time_ago}} by
          <a :href="item.url">
            {{ item.domain }}
          </a>
        </small>
      </li>
    </ul>
  </div>
</template>

<script>
import {mapGetters} from "vuex";

export default {
  computed: {
    ...mapGetters([
      'fetchedJobs'
    ])
  },
  created() {
    this.$store.dispatch('FETCH_JOBS');
  },
};
</script>

<style scoped>
.jobs-list {
  margin: 0;
  padding: 0;
}
.job {
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
.job-title {
  margin: 0;
}
.job-text {
  color:#828282;
}
</style>

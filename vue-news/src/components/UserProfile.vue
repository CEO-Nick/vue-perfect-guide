<template>
  <div>
    <section>
      <!-- 질문 상세 정보-->
      <div class="user-container">
        <div>
          <i class="fas fa-user"></i>
        </div>
        <div class="user-description">
<!--          <router-link :to="`/user/${itemInfo.user}`">-->
<!--            {{ itemInfo.user }}-->
<!--          </router-link>-->
<!--          <div class="time">-->
<!--            {{ itemInfo.time_ago }}-->
<!--          </div>-->
        </div>
      </div>
<!--      <h2> {{ itemInfo.title }}</h2>-->
    </section>
  </div>
</template>

<script>
export default {
  name: 'UserProfile'
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
<template>
  <div class="header">
    <router-link to="/news">News</router-link> |
    <router-link to="/ask">Ask</router-link> |
    <router-link to="/jobs">Jobs</router-link>
  </div>
</template>

<style scoped>
.header {
  color: white;
  background-color: #42b883;
  display: flex;
  padding: 8px;
}

.header .router-link-exact-active {
  color: #35495e;
}

/* 
.header a는 .header 요소 안에 있는 <a> 요소에 적용됩니다.
<router-link>는 실제로 <a> 태그로 렌더링되므로,
.header a 셀렉터의 css는 툴바 내부의 모든 링크(<router-link>로 생성된 <a>)에 적용됩니다.
*/
.header a {
  color: white;
}
</style>

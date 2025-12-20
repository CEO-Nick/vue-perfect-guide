# Vue News 프로젝트 종합 분석 및 학습 가이드

> **프로젝트**: Hacker News 클론 애플리케이션
> **프레임워크**: Vue 2.6.14 (Options API)
> **작성일**: 2025-12-20

---

## 📋 목차

1. [프로젝트 개요](#프로젝트-개요)
2. [프로젝트 구조](#프로젝트-구조)
3. [핵심 기술 스택](#핵심-기술-스택)
4. [라우팅 구조](#라우팅-구조)
5. [상태 관리 (Vuex)](#상태-관리-vuex)
6. [컴포넌트 아키텍처](#컴포넌트-아키텍처)
7. [API 통신 패턴](#api-통신-패턴)
8. [적용된 디자인 패턴](#적용된-디자인-패턴)
9. [Vue 핵심 개념 적용 사례](#vue-핵심-개념-적용-사례)
10. [코드 스타일 및 설정](#코드-스타일-및-설정)
11. [특별한 기법들](#특별한-기법들)
12. [배포 및 인프라](#배포-및-인프라)
13. [학습 포인트](#학습-포인트)

---

## 프로젝트 개요

이 프로젝트는 **Hacker News API**를 활용한 뉴스 애플리케이션입니다. Vue 2의 핵심 기능들을 실무 수준으로 활용하여 구현되었으며, 다음과 같은 주요 기능을 제공합니다:

- 📰 뉴스 목록 조회
- ❓ 질문(Ask) 목록 조회
- 💼 채용(Jobs) 목록 조회
- 👤 사용자 프로필 상세 조회
- 💬 아이템 상세 정보 및 댓글 조회

**학습 가치**: 컴포넌트 재사용성, 상태 관리, 라우팅, API 통신 등 실무 패턴을 종합적으로 학습할 수 있는 프로젝트입니다.

---

## 프로젝트 구조

```
vue-news/
├── public/                           # 정적 파일
│   ├── index.html                   # HTML 템플릿 (Font Awesome CDN 포함)
│   └── favicon.ico
│
├── src/
│   ├── main.js                      # 🔑 앱 엔트리 포인트
│   ├── App.vue                      # 🔑 루트 컴포넌트
│   │
│   ├── api/                         # API 통신 모듈
│   │   └── index.js                # Axios 기반 API 함수들
│   │
│   ├── components/                  # 재사용 가능한 컴포넌트
│   │   ├── ToolBar.vue             # 네비게이션 바
│   │   ├── ListItem.vue            # 🌟 공통 리스트 아이템 컴포넌트
│   │   ├── UserProfile.vue         # 🌟 사용자 프로필 공통 컴포넌트 (Slots 사용)
│   │   ├── Spinner.vue             # 로딩 인디케이터
│   │   └── HelloWorld.vue          # (미사용)
│   │
│   ├── views/                       # 페이지 레벨 컴포넌트
│   │   ├── NewsView.vue            # 뉴스 목록 페이지
│   │   ├── AskView.vue             # 질문 목록 페이지
│   │   ├── JobsView.vue            # 채용 목록 페이지
│   │   ├── UserView.vue            # 사용자 상세 페이지
│   │   └── ItemView.vue            # 아이템 상세 페이지
│   │
│   ├── routes/                      # 라우팅 설정
│   │   └── index.js                # Vue Router 설정
│   │
│   └── store/                       # 🔑 Vuex 상태 관리
│       ├── index.js                # Store 설정, state, getters
│       ├── actions.js              # 비동기 액션
│       └── mutations.js            # 동기적 상태 변경
│
├── babel.config.js                  # Babel 설정
├── vue.config.js                    # Vue CLI 설정
├── jsconfig.json                    # JavaScript 설정 (경로 별칭)
├── package.json                     # 프로젝트 메타데이터 및 의존성
│
├── Dockerfile                       # Multi-stage Docker 빌드
├── docker-compose.yml               # Docker Compose 설정
├── nginx.conf                       # Nginx 서버 설정
└── DEPLOYMENT.md                    # 배포 가이드
```

### 구조 설계 특징

- **관심사의 분리**: API, 라우팅, 상태 관리를 각각 별도 디렉토리로 분리
- **컴포넌트 계층화**: `components` (재사용 가능) vs `views` (페이지 레벨)
- **모듈화된 Vuex**: actions, mutations를 파일 단위로 분리

---

## 핵심 기술 스택

### 프로덕션 의존성

| 라이브러리 | 버전 | 역할 |
|----------|------|------|
| **vue** | 2.6.14 | Vue 2 프레임워크 (Options API) |
| **vue-router** | 3.6.5 | 공식 라우팅 라이브러리 |
| **vuex** | 3.6.2 | 공식 상태 관리 라이브러리 |
| **axios** | 1.13.2 | HTTP 클라이언트 (API 통신) |
| **core-js** | 3.8.3 | 폴리필 라이브러리 |

### 개발 의존성

| 라이브러리 | 버전 | 역할 |
|----------|------|------|
| **@vue/cli-service** | 5.0.0 | Vue CLI 빌드 도구 |
| **@vue/cli-plugin-babel** | 5.0.0 | Babel 트랜스파일러 플러그인 |
| **@vue/cli-plugin-eslint** | 5.0.0 | ESLint 플러그인 |
| **eslint** | 7.32.0 | 코드 품질 검사 도구 |
| **eslint-plugin-vue** | 8.0.3 | Vue 전용 ESLint 규칙 |
| **vue-template-compiler** | 2.6.14 | Vue 템플릿 컴파일러 |

### NPM 스크립트

```json
{
  "serve": "vue-cli-service serve",      // 개발 서버 실행 (http://localhost:8080)
  "build": "vue-cli-service build",      // 프로덕션 빌드 (dist/ 생성)
  "lint": "vue-cli-service lint"         // ESLint 검사
}
```

---

## 라우팅 구조

### Vue Router 설정

**파일**: `src/routes/index.js`

```javascript
import Vue from 'vue'
import VueRouter from 'vue-router'
import NewsView from '../views/NewsView.vue'
import AskView from '../views/AskView.vue'
import JobsView from '../views/JobsView.vue'
import UserView from '../views/UserView.vue'
import ItemView from '../views/ItemView.vue'

Vue.use(VueRouter)

export const router = new VueRouter({
  mode: 'history',  // 🔑 History 모드 (URL에서 # 제거)
  routes: [
    {
      path: '/',
      redirect: '/news'  // 루트 접근 시 /news로 리디렉션
    },
    {
      path: '/news',
      name: 'news',
      component: NewsView
    },
    {
      path: '/ask',
      name: 'ask',
      component: AskView
    },
    {
      path: '/jobs',
      name: 'jobs',
      component: JobsView
    },
    {
      path: '/user/:id',      // 🔑 동적 라우트 파라미터
      name: 'user',
      component: UserView
    },
    {
      path: '/item/:id',      // 🔑 동적 라우트 파라미터
      name: 'item',
      component: ItemView
    }
  ]
})
```

### 라우팅 특징

#### 1. History 모드
```javascript
mode: 'history'
```
- **장점**: 깔끔한 URL (`/news` vs `/#/news`)
- **주의**: 서버 설정 필요 (모든 요청을 `index.html`로 전달)
- **Nginx 설정**: `try_files $uri $uri/ /index.html;`

#### 2. 동적 라우트 파라미터
```javascript
// 라우트 정의
{ path: '/user/:id', component: UserView }

// 컴포넌트에서 접근
created() {
  const userName = this.$route.params.id;
  this.$store.dispatch('FETCH_USER', userName);
}
```

#### 3. 선언적 네비게이션
```vue
<!-- ToolBar.vue -->
<router-link to="/news">News</router-link>
<router-link to="/ask">Ask</router-link>

<!-- ListItem.vue -->
<router-link :to="`item/${item.id}`">
  {{ item.title }}
</router-link>
```

#### 4. 라우터 뷰와 트랜지션
```vue
<!-- App.vue -->
<transition name="routing-fade">
  <router-view></router-view>
</transition>
```

### 라우트별 페이지 매핑

| 경로 | 컴포넌트 | 설명 |
|------|---------|------|
| `/` | NewsView (redirect) | 루트 경로 |
| `/news` | NewsView | 뉴스 목록 |
| `/ask` | AskView | 질문 목록 |
| `/jobs` | JobsView | 채용 공고 목록 |
| `/user/:id` | UserView | 사용자 프로필 (동적) |
| `/item/:id` | ItemView | 아이템 상세 (동적) |

---

## 상태 관리 (Vuex)

### Store 구조

**파일**: `src/store/index.js`, `actions.js`, `mutations.js`

```
store/
├── index.js         # Store 설정, state, getters
├── actions.js       # 비동기 액션 (API 호출)
└── mutations.js     # 동기적 상태 변경
```

### State (상태)

```javascript
// src/store/index.js
state: {
  news: [],      // 뉴스 목록 데이터
  ask: [],       // 질문 목록 데이터
  jobs: [],      // 채용 목록 데이터
  user: {},      // 사용자 상세 정보
  item: {}       // 아이템 상세 정보 (댓글 포함)
}
```

**특징**:
- 모든 데이터를 중앙에서 관리 (Single Source of Truth)
- 컴포넌트는 직접 수정 불가, mutations를 통해서만 변경

### Getters (계산된 상태)

```javascript
// src/store/index.js
getters: {
  fetchedNews(state) {
    return state.news;
  },
  fetchedAsk(state) {
    return state.ask;
  },
  fetchedJobs(state) {
    return state.jobs;
  },
  fetchedUserInfo(state) {
    return state.user;
  },
  fetchedItemInfo(state) {
    return state.item;
  }
}
```

**활용**:
```javascript
// 컴포넌트에서 사용
import { mapGetters } from 'vuex';

computed: {
  ...mapGetters(['fetchedNews', 'fetchedAsk', 'fetchedJobs'])
}
```

### Mutations (동기적 상태 변경)

```javascript
// src/store/mutations.js
export default {
  SET_NEWS(state, news) {
    state.news = news;
  },
  SET_ASK(state, ask) {
    state.ask = ask;
  },
  SET_JOBS(state, jobs) {
    state.jobs = jobs;
  },
  SET_USER(state, user) {
    state.user = user;
  },
  SET_ITEM(state, item) {
    state.item = item;
  }
}
```

**네이밍 규칙**:
- 대문자 + 언더스코어 (`SET_NEWS`)
- 동사 + 명사 형태
- 동기적 작업만 수행

### Actions (비동기 작업)

```javascript
// src/store/actions.js
import { fetchNewsList, fetchAskList, fetchJobsList, fetchUserInfo, fetchCommentItemInfo } from '../api/index.js';

export default {
  // ES6 Destructuring으로 commit만 추출
  FETCH_NEWS({ commit }) {
    fetchNewsList()
      .then(({ data }) => {
        commit('SET_NEWS', data);
      })
      .catch(error => {
        console.log(error);
      });
  },

  FETCH_ASK({ commit }) {
    fetchAskList()
      .then(({ data }) => {
        commit('SET_ASK', data);
      })
      .catch(error => {
        console.log(error);
      });
  },

  FETCH_JOBS({ commit }) {
    fetchJobsList()
      .then(({ data }) => {
        commit('SET_JOBS', data);
      })
      .catch(error => {
        console.log(error);
      });
  },

  // 파라미터를 받는 액션
  FETCH_USER({ commit }, name) {
    fetchUserInfo(name)
      .then(({ data }) => {
        commit('SET_USER', data);
      })
      .catch(error => {
        console.log(error);
      });
  },

  FETCH_ITEM({ commit }, itemId) {
    fetchCommentItemInfo(itemId)
      .then(({ data }) => {
        commit('SET_ITEM', data);
      })
      .catch(error => {
        console.log(error);
      });
  }
}
```

**특징**:
- Promise 기반 (async/await 미사용)
- ES6 Destructuring: `{ commit }`, `{ data }`
- 에러는 콘솔 로깅만 수행 (개선 여지 있음)

### 데이터 흐름

```
[Component]
    ↓ (created 훅)
this.$store.dispatch('FETCH_NEWS')
    ↓
[Action: FETCH_NEWS]
    ↓
fetchNewsList() (API 호출)
    ↓
axios.get(...)
    ↓
.then(response)
    ↓
commit('SET_NEWS', data)
    ↓
[Mutation: SET_NEWS]
    ↓
state.news = news
    ↓
[Getter: fetchedNews]
    ↓
[Component] (computed 자동 업데이트)
```

### 컴포넌트에서의 사용 예시

```javascript
// NewsView.vue
export default {
  computed: {
    ...mapGetters(['fetchedNews'])
  },
  created() {
    // 컴포넌트 생성 시 데이터 요청
    this.$store.dispatch('FETCH_NEWS');
  }
}
```

---

## 컴포넌트 아키텍처

### 컴포넌트 계층도

```
App.vue (루트 컴포넌트)
│
├── ToolBar.vue (네비게이션 바)
│   └── <router-link> × 3
│
└── <router-view> (동적 페이지 영역)
    │
    ├── NewsView.vue
    │   └── ListItem.vue (공통 컴포넌트)
    │
    ├── AskView.vue
    │   └── ListItem.vue (재사용)
    │
    ├── JobsView.vue
    │   └── ListItem.vue (재사용)
    │
    ├── UserView.vue
    │   └── UserProfile.vue (Named Slots)
    │
    └── ItemView.vue
        ├── UserProfile.vue (Named Slots)
        └── 댓글 렌더링 (v-for)
```

### 1. App.vue (루트 컴포넌트)

**파일**: `src/App.vue`

```vue
<template>
  <div id="app">
    <!-- 네비게이션 바 -->
    <tool-bar></tool-bar>

    <!-- 페이지 전환 애니메이션 -->
    <transition name="routing-fade">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
import ToolBar from './components/ToolBar.vue'

export default {
  components: {
    ToolBar
  }
}
</script>

<style>
/* 전역 스타일 (scoped 없음) */
body {
  padding: 0;
  margin: 0;
}

a {
  color: #34495e;
  text-decoration: none;
}

a:hover {
  color: #42b883;
  text-decoration: underline;
}

/* 라우팅 트랜지션 애니메이션 */
.routing-fade-enter-active, .routing-fade-leave-active {
  transition: opacity .3s ease;
}

.routing-fade-enter, .routing-fade-leave-to {
  opacity: 0;
}

/* 활성 라우터 링크 스타일 */
a.router-link-exact-active {
  text-decoration: underline;
}
</style>
```

**학습 포인트**:
- `<transition>`: Vue의 트랜지션 시스템
- 전역 스타일 정의 (모든 컴포넌트에 적용)
- `.router-link-exact-active`: 라우터가 자동으로 추가하는 클래스

---

### 2. ToolBar.vue (네비게이션 바)

**파일**: `src/components/ToolBar.vue`

```vue
<template>
  <div class="header">
    <!-- router-link-exact-active 클래스로 현재 페이지 강조 -->
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

.header a {
  color: white;
}

/* 활성 링크 스타일 */
.header a.router-link-exact-active {
  text-decoration: underline;
}
</style>
```

**학습 포인트**:
- `scoped` 스타일: 이 컴포넌트에만 적용
- `.header a` 선택자: `<router-link>`는 `<a>` 태그로 렌더링됨

---

### 3. ListItem.vue (공통 리스트 컴포넌트) ⭐

**파일**: `src/components/ListItem.vue`

이 컴포넌트는 **컴포넌트 공통화 패턴**의 핵심 예시입니다.

```vue
<template>
  <div>
    <ul class="news-list">
      <!-- v-for로 리스트 렌더링 -->
      <li v-for="item in listItems" :key="item.id" class="post">
        <!-- 조건부 렌더링: 외부 링크 vs 내부 라우터 링크 -->
        <div class="points">
          {{ item.points || 0 }}
        </div>

        <div>
          <!-- domain이 있으면 외부 링크 -->
          <template v-if="item.domain">
            <a :href="item.url">{{ item.title }}</a>
          </template>
          <!-- domain이 없으면 내부 라우터 링크 -->
          <template v-else>
            <router-link :to="`item/${item.id}`">
              {{ item.title }}
            </router-link>
          </template>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  computed: {
    // 세 가지 getter를 한 번에 매핑
    ...mapGetters(['fetchedNews', 'fetchedAsk', 'fetchedJobs']),

    // 🔑 현재 라우트에 따라 동적으로 데이터 선택
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
  }
}
</script>

<style scoped>
.news-list {
  padding: 0;
  margin: 0;
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
  color: #42b883;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
```

**학습 포인트**:

1. **컴포넌트 재사용**: NewsView, AskView, JobsView에서 동일 컴포넌트 사용
2. **동적 데이터 처리**: `this.$route.name`으로 현재 라우트 파악
3. **조건부 렌더링**: `v-if`, `v-else`로 외부/내부 링크 구분
4. **mapGetters**: Vuex 헬퍼로 여러 getter 한 번에 매핑
5. **Optional Chaining 대체**: `item.points || 0`

---

### 4. UserProfile.vue (Slots 패턴) ⭐

**파일**: `src/components/UserProfile.vue`

이 컴포넌트는 **Named Slots 패턴**의 핵심 예시입니다.

```vue
<template>
  <div class="user-container">
    <!-- FontAwesome 아이콘 -->
    <i class="fas fa-user"></i>

    <div class="user-description">
      <!-- Named Slot: 사용자 이름 -->
      <slot name="username"></slot>

      <div class="time">
        <!-- Named Slot: 시간 정보 -->
        <slot name="time"></slot>
        <!-- Named Slot: 카르마 점수 -->
        <slot name="karma"></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    info: Object,  // 실제로는 slots만 사용됨
  }
}
</script>

<style scoped>
.user-container {
  display: flex;
  align-items: center;
  padding: 0.5rem;
}
.fa-user {
  font-size: 2.5rem;
}
.user-description {
  padding-left: 8px;
}
.time {
  font-size: 0.7rem;
}
</style>
```

#### UserView.vue에서의 사용

```vue
<template>
  <div>
    <!-- UserProfile 컴포넌트 사용 -->
    <user-profile :info="fetchedUserInfo">
      <!-- username 슬롯에 사용자 ID 주입 -->
      <div slot="username">{{ fetchedUserInfo.id }}</div>

      <!-- time 슬롯에 가입 날짜 주입 -->
      <span slot="time">{{ 'Joined: ' + fetchedUserInfo.created }}</span>

      <!-- karma 슬롯에 카르마 점수 주입 -->
      <span slot="karma">{{ fetchedUserInfo.karma }}</span>
    </user-profile>
  </div>
</template>
```

#### ItemView.vue에서의 사용 (다른 데이터로 재사용)

```vue
<template>
  <div>
    <!-- 동일한 컴포넌트, 다른 데이터 -->
    <user-profile :info="itemInfo">
      <!-- username 슬롯에 라우터 링크 주입 -->
      <router-link slot="username" :to="`/user/${itemInfo.user}`">
        {{ itemInfo.user }}
      </router-link>

      <!-- time 슬롯에 작성 시간 주입 -->
      <template slot="time">{{ 'Posted: ' + itemInfo.time_ago }}</template>
    </user-profile>
  </div>
</template>
```

**학습 포인트**:
1. **Named Slots**: 여러 개의 명명된 슬롯으로 유연한 컴포넌트
2. **컨텐츠 분배**: 부모가 원하는 컨텐츠를 각 슬롯에 주입
3. **재사용성**: 같은 컴포넌트를 다른 용도로 재사용
4. **Props vs Slots**: Props는 데이터, Slots는 템플릿 전달

---

### 5. Spinner.vue (로딩 컴포넌트)

**파일**: `src/components/Spinner.vue`

```vue
<template>
  <div v-if="loading" class="lds-facebook">
    <div></div>
    <div></div>
    <div></div>
  </div>
</template>

<script>
export default {
  props: {
    loading: {
      type: Boolean,      // 타입 검증
      required: true,     // 필수 prop
    }
  }
}
</script>

<style scoped>
.lds-facebook {
  display: inline-block;
  position: absolute;
  width: 64px;
  height: 64px;
  top: 47%;
  left: 47%;
}

.lds-facebook div {
  display: inline-block;
  position: absolute;
  left: 6px;
  width: 13px;
  background: #42b883;
  animation: lds-facebook 1.2s cubic-bezier(0, 0.5, 0.5, 1) infinite;
}

.lds-facebook div:nth-child(1) {
  left: 6px;
  animation-delay: -0.24s;
}

.lds-facebook div:nth-child(2) {
  left: 26px;
  animation-delay: -0.12s;
}

.lds-facebook div:nth-child(3) {
  left: 45px;
  animation-delay: 0;
}

@keyframes lds-facebook {
  0% { top: 6px; height: 51px; }
  50%, 100% { top: 19px; height: 26px; }
}
</style>
```

**학습 포인트**:
- **Props 타입 검증**: `type`, `required`
- **CSS 애니메이션**: `@keyframes`로 로딩 효과
- **조건부 렌더링**: `v-if="loading"`

**주의**: 현재 프로젝트에서는 정의만 되어 있고 실제로 사용되지 않음

---

### 6. View 컴포넌트 (페이지 레벨)

#### NewsView.vue, AskView.vue, JobsView.vue

**공통 패턴**:

```vue
<template>
  <div>
    <!-- ListItem 공통 컴포넌트 사용 -->
    <list-item></list-item>
  </div>
</template>

<script>
import ListItem from '../components/ListItem.vue';

export default {
  components: {
    ListItem,
  },
  created() {
    // 🔑 컴포넌트 생성 시 데이터 fetch
    this.$store.dispatch('FETCH_NEWS');  // 각 View마다 다른 액션
  }
}
</script>

<style scoped>
</style>
```

#### UserView.vue (사용자 상세)

```vue
<template>
  <div>
    <!-- UserProfile 컴포넌트에 Named Slots 주입 -->
    <user-profile :info="fetchedUserInfo">
      <div slot="username">{{ fetchedUserInfo.id }}</div>
      <span slot="time">{{ 'Joined: ' + fetchedUserInfo.created }}</span>
      <span slot="karma">{{ fetchedUserInfo.karma }}</span>
    </user-profile>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import UserProfile from '../components/UserProfile.vue'

export default {
  components: {
    UserProfile,
  },
  computed: {
    ...mapGetters(['fetchedUserInfo'])
  },
  created() {
    // 🔑 동적 라우트 파라미터 활용
    const userName = this.$route.params.id;
    this.$store.dispatch('FETCH_USER', userName);
  }
}
</script>
```

#### ItemView.vue (아이템 상세 + 댓글)

```vue
<template>
  <div>
    <section>
      <!-- UserProfile 재사용 (다른 데이터) -->
      <user-profile :info="itemInfo">
        <router-link slot="username" :to="`/user/${itemInfo.user}`">
          {{ itemInfo.user }}
        </router-link>
        <template slot="time">{{ 'Posted: ' + itemInfo.time_ago }}</template>
      </user-profile>
    </section>

    <!-- 아이템 본문 (HTML 렌더링) -->
    <section>
      <h2>{{ itemInfo.title }}</h2>
      <!-- 🚨 보안 주의: v-html은 XSS 위험 -->
      <div v-html="itemInfo.content"/>
    </section>

    <!-- 댓글 목록 -->
    <section>
      <h3>Comments</h3>
      <div v-for="comment in itemInfo.comments" :key="comment.id">
        <div>
          <strong>{{ comment.user }}</strong>
          <span>{{ comment.time_ago }}</span>
        </div>
        <p v-html="comment.content"></p>
      </div>
    </section>
  </div>
</template>

<script>
import UserProfile from '../components/UserProfile.vue';
import { mapGetters } from 'vuex';

export default {
  components: {
    UserProfile,
  },
  computed: {
    // 🔑 Getter 별칭 사용
    ...mapGetters({
      itemInfo: 'fetchedItemInfo',  // fetchedItemInfo를 itemInfo로 매핑
    })
  },
  created() {
    const itemId = this.$route.params.id;
    this.$store.dispatch('FETCH_ITEM', itemId);
  }
}
</script>
```

**학습 포인트**:
1. **v-html**: HTML 문자열 렌더링 (보안 주의)
2. **mapGetters 별칭**: `{ itemInfo: 'fetchedItemInfo' }`
3. **중첩 데이터 렌더링**: `itemInfo.comments` 배열

---

## API 통신 패턴

### API 모듈 구조

**파일**: `src/api/index.js`

```javascript
import axios from 'axios';

// 1. 환경 설정 객체
const config = {
  baseUrl: 'https://api.hnpwa.com/v0'
}

// 2. API 함수 정의 (명명된 export)
function fetchNewsList() {
  return axios.get(`${config.baseUrl}/news/1.json`);
}

function fetchAskList() {
  return axios.get(`${config.baseUrl}/ask/1.json`);
}

function fetchJobsList() {
  return axios.get(`${config.baseUrl}/jobs/1.json`);
}

function fetchUserInfo(username) {
  return axios.get(`${config.baseUrl}/user/${username}.json`);
}

function fetchCommentItemInfo(itemId) {
  return axios.get(`${config.baseUrl}/item/${itemId}.json`);
}

// 3. 함수들을 명명된 export로 내보내기
export {
  fetchNewsList,
  fetchAskList,
  fetchJobsList,
  fetchUserInfo,
  fetchCommentItemInfo
}
```

### API 호출 흐름

```
1. Component (created 훅)
   ↓
   this.$store.dispatch('FETCH_NEWS')

2. Vuex Action
   ↓
   import { fetchNewsList } from '../api/index.js'
   ↓
   fetchNewsList()

3. API 모듈
   ↓
   axios.get('https://api.hnpwa.com/v0/news/1.json')

4. Promise 반환
   ↓
   .then(response => ...)

5. Vuex Action에서 처리
   ↓
   .then(({ data }) => {
     commit('SET_NEWS', data);
   })

6. Mutation이 State 업데이트
   ↓
   state.news = news;

7. Getter를 통해 Component로 자동 반영
   ↓
   computed: { ...mapGetters(['fetchedNews']) }
```

### Axios 활용 패턴

#### 1. 템플릿 리터럴로 동적 URL
```javascript
axios.get(`${config.baseUrl}/user/${username}.json`)
```

#### 2. Promise 체이닝
```javascript
fetchNewsList()
  .then(response => {
    // 성공 처리
  })
  .catch(error => {
    // 에러 처리
    console.log(error);
  })
```

#### 3. ES6 Destructuring
```javascript
.then(({ data }) => {  // response.data를 바로 추출
  commit('SET_NEWS', data);
})
```

### 개선 가능한 영역

1. **에러 처리 강화**
```javascript
// 현재
.catch(error => {
  console.log(error);
})

// 개선안
.catch(error => {
  commit('SET_ERROR', error.message);
  // 사용자에게 에러 메시지 표시
})
```

2. **로딩 상태 관리**
```javascript
FETCH_NEWS({ commit }) {
  commit('SET_LOADING', true);  // 로딩 시작

  fetchNewsList()
    .then(({ data }) => {
      commit('SET_NEWS', data);
    })
    .finally(() => {
      commit('SET_LOADING', false);  // 로딩 종료
    });
}
```

3. **Async/Await 활용**
```javascript
async FETCH_NEWS({ commit }) {
  try {
    commit('SET_LOADING', true);
    const { data } = await fetchNewsList();
    commit('SET_NEWS', data);
  } catch (error) {
    commit('SET_ERROR', error.message);
  } finally {
    commit('SET_LOADING', false);
  }
}
```

---

## 적용된 디자인 패턴

### 1. 컴포넌트 공통화 패턴 (Component Reusability)

#### ListItem.vue 공통화

**문제**: NewsView, AskView, JobsView가 거의 동일한 리스트 UI

**해결**: 하나의 공통 컴포넌트로 추출

```javascript
// ListItem.vue
computed: {
  listItems() {
    // 🔑 현재 라우트에 따라 데이터 동적 선택
    const name = this.$route.name;
    if (name === 'news') return this.fetchedNews;
    else if (name === 'ask') return this.fetchedAsk;
    else if (name === 'jobs') return this.fetchedJobs;
  }
}
```

**이점**:
- 코드 중복 제거 (DRY 원칙)
- 유지보수성 향상
- 일관된 UI

---

### 2. Slots 패턴 (Content Distribution)

#### UserProfile.vue에 Named Slots 적용

**문제**: UserView와 ItemView에서 유사한 사용자 정보 UI 필요

**해결**: Named Slots로 유연한 컴포넌트 설계

```vue
<!-- UserProfile.vue (정의) -->
<template>
  <div class="user-container">
    <i class="fas fa-user"></i>
    <div class="user-description">
      <slot name="username"></slot>
      <div class="time">
        <slot name="time"></slot>
        <slot name="karma"></slot>
      </div>
    </div>
  </div>
</template>
```

```vue
<!-- UserView.vue (사용) -->
<user-profile>
  <div slot="username">{{ fetchedUserInfo.id }}</div>
  <span slot="time">{{ 'Joined: ' + fetchedUserInfo.created }}</span>
  <span slot="karma">{{ fetchedUserInfo.karma }}</span>
</user-profile>

<!-- ItemView.vue (다르게 사용) -->
<user-profile>
  <router-link slot="username" :to="`/user/${itemInfo.user}`">
    {{ itemInfo.user }}
  </router-link>
  <template slot="time">{{ 'Posted: ' + itemInfo.time_ago }}</template>
</user-profile>
```

**이점**:
- 유연한 컨텐츠 삽입
- Props보다 복잡한 템플릿 전달 가능
- 부모 컴포넌트가 제어권 유지

---

### 3. 컨테이너/프레젠테이션 패턴

#### 컨테이너 컴포넌트 (Views)

**역할**: 데이터 로직, 상태 관리

```javascript
// NewsView.vue
export default {
  created() {
    // 🔑 데이터 fetch 로직
    this.$store.dispatch('FETCH_NEWS');
  }
}
```

#### 프레젠테이션 컴포넌트 (ListItem, UserProfile)

**역할**: UI 렌더링만 담당

```javascript
// ListItem.vue
export default {
  computed: {
    // 데이터를 받아서 표시만
    ...mapGetters(['fetchedNews', 'fetchedAsk', 'fetchedJobs'])
  }
  // created 훅 없음 (데이터 fetch 안 함)
}
```

**이점**:
- 관심사의 분리
- 컴포넌트 재사용성 향상
- 테스트 용이성

---

### 4. Vuex 아키텍처 패턴

#### Module Pattern (파일 분리)

```
store/
├── index.js         # Store 설정, state, getters
├── actions.js       # 비동기 로직
└── mutations.js     # 동기 로직
```

#### Helper Pattern

```javascript
// mapGetters 헬퍼
computed: {
  ...mapGetters(['fetchedNews', 'fetchedAsk'])
}

// 별칭 사용
computed: {
  ...mapGetters({
    itemInfo: 'fetchedItemInfo'
  })
}
```

#### Action Pattern (비동기 로직 캡슐화)

```javascript
// 컴포넌트는 dispatch만 호출
this.$store.dispatch('FETCH_NEWS');

// Action에서 복잡한 로직 처리
FETCH_NEWS({ commit }) {
  fetchNewsList()
    .then(({ data }) => commit('SET_NEWS', data))
    .catch(error => console.log(error));
}
```

---

### 5. 라우터 기반 코드 스플리팅 (잠재적 패턴)

**현재**: 정적 import

```javascript
import NewsView from '../views/NewsView.vue'
```

**개선안**: 동적 import (Lazy Loading)

```javascript
const NewsView = () => import('../views/NewsView.vue')
```

**이점**:
- 초기 로딩 시간 단축
- 필요할 때만 컴포넌트 로드
- 번들 사이즈 최적화

---

## Vue 핵심 개념 적용 사례

### 1. 반응성 시스템 (Reactivity)

Vue의 핵심인 반응성 시스템이 프로젝트 전반에 적용되어 있습니다.

#### State 반응성

```javascript
// Vuex State
state: {
  news: []  // 🔑 반응형 데이터
}

// Mutation으로 변경
SET_NEWS(state, news) {
  state.news = news;  // 자동으로 UI 업데이트 트리거
}

// Component에서 사용
computed: {
  ...mapGetters(['fetchedNews'])  // news가 변경되면 자동 재계산
}
```

#### Computed Properties 반응성

```javascript
computed: {
  listItems() {
    const name = this.$route.name;
    // 🔑 fetchedNews, fetchedAsk 등이 변경되면 자동 재계산
    if (name === 'news') return this.fetchedNews;
    else if (name === 'ask') return this.fetchedAsk;
    else if (name === 'jobs') return this.fetchedJobs;
  }
}
```

**작동 원리**:
1. Vue가 데이터를 `Object.defineProperty()`로 감싸기
2. getter/setter로 의존성 추적
3. 데이터 변경 시 자동으로 관련 컴포넌트 업데이트

---

### 2. 생명주기 훅 (Lifecycle Hooks)

#### Created 훅 활용

**모든 View 컴포넌트에서 사용**:

```javascript
export default {
  created() {
    // 🔑 DOM이 생성되기 전에 데이터 요청
    this.$store.dispatch('FETCH_NEWS');
  }
}
```

#### 생명주기 흐름

```
1. beforeCreate    (사용 안 함)
2. created         ✅ 데이터 fetch
3. beforeMount     (사용 안 함)
4. mounted         (사용 안 함)
5. beforeUpdate    (사용 안 함)
6. updated         (사용 안 함)
7. beforeDestroy   (사용 안 함)
8. destroyed       (사용 안 함)
```

**왜 created를 선택했는가?**
- DOM 접근이 필요 없음 (데이터만 fetch)
- `mounted`보다 빠르게 데이터 요청 시작
- SSR 호환성 (mounted는 클라이언트에서만 실행)

---

### 3. Props (부모 → 자식 데이터 전달)

#### 타입 검증

```javascript
// Spinner.vue
props: {
  loading: {
    type: Boolean,      // 타입 지정
    required: true,     // 필수 여부
  }
}

// UserProfile.vue
props: {
  info: Object,         // 타입만 지정
}
```

#### Props 사용

```vue
<!-- 부모 컴포넌트 -->
<spinner :loading="isLoading"></spinner>
<user-profile :info="fetchedUserInfo"></user-profile>

<!-- 자식 컴포넌트에서 접근 -->
{{ info.id }}
{{ info.created }}
```

**학습 포인트**:
- Props는 단방향 바인딩 (부모 → 자식만 가능)
- 자식이 Props를 직접 수정하면 안 됨
- 타입 검증으로 버그 예방

---

### 4. Custom Events (자식 → 부모 통신)

**현재 프로젝트에서는 미사용**

왜냐하면:
- Vuex로 상태 관리하므로 직접 통신 불필요
- 모든 상태는 중앙 Store를 통해 관리

**일반적인 사용 예시** (참고용):

```vue
<!-- 자식 컴포넌트 -->
<button @click="$emit('custom-event', data)">Click</button>

<!-- 부모 컴포넌트 -->
<child-component @custom-event="handleEvent"></child-component>
```

---

### 5. Slots (컨텐츠 분배)

#### Default Slot (미사용)

```vue
<slot></slot>
```

#### Named Slots (프로젝트에서 활용)

**정의**:
```vue
<!-- UserProfile.vue -->
<slot name="username"></slot>
<slot name="time"></slot>
<slot name="karma"></slot>
```

**사용**:
```vue
<!-- UserView.vue -->
<user-profile>
  <div slot="username">{{ fetchedUserInfo.id }}</div>
  <span slot="time">{{ 'Joined: ' + fetchedUserInfo.created }}</span>
  <span slot="karma">{{ fetchedUserInfo.karma }}</span>
</user-profile>
```

**Vue 2.6+ 문법** (v-slot):
```vue
<!-- 최신 문법 (프로젝트에서는 미사용) -->
<template v-slot:username>
  <div>{{ fetchedUserInfo.id }}</div>
</template>
```

---

### 6. Computed Properties vs Methods

**프로젝트 특징**: Computed만 사용, Methods는 미사용

#### Computed Properties

```javascript
computed: {
  // 🔑 캐싱됨 - 의존성이 변경될 때만 재계산
  listItems() {
    const name = this.$route.name;
    if (name === 'news') return this.fetchedNews;
    // ...
  }
}
```

#### Methods (사용 안 함, 참고용)

```javascript
methods: {
  // 캐싱 안 됨 - 호출할 때마다 재실행
  getListItems() {
    const name = this.$route.name;
    if (name === 'news') return this.fetchedNews;
  }
}
```

**차이점**:

| 구분 | Computed | Methods |
|-----|----------|---------|
| 캐싱 | ✅ 있음 | ❌ 없음 |
| 의존성 추적 | ✅ 자동 | ❌ 수동 |
| 사용 | `{{ listItems }}` | `{{ getListItems() }}` |
| 용도 | 계산된 값 | 이벤트 처리 |

---

### 7. Directives (디렉티브)

#### 조건부 렌더링 (v-if, v-else)

```vue
<template v-if="item.domain">
  <a :href="item.url">{{ item.title }}</a>
</template>
<template v-else>
  <router-link :to="`item/${item.id}`">
    {{ item.title }}
  </router-link>
</template>
```

#### 리스트 렌더링 (v-for)

```vue
<li v-for="item in listItems" :key="item.id" class="post">
  {{ item.title }}
</li>

<div v-for="comment in itemInfo.comments" :key="comment.id">
  <p>{{ comment.content }}</p>
</div>
```

**🔑 key 속성의 중요성**:
- Vue가 각 노드를 추적하는 힌트
- 리스트 재렌더링 최적화
- 반드시 고유한 값 사용 (`item.id`)

#### 속성 바인딩 (v-bind, :)

```vue
<!-- 전체 문법 -->
<a v-bind:href="item.url">Link</a>

<!-- 축약형 (프로젝트에서 주로 사용) -->
<a :href="item.url">Link</a>
<router-link :to="`/user/${itemInfo.user}`">User</router-link>
```

#### HTML 바인딩 (v-html) ⚠️

```vue
<div v-html="itemInfo.content"/>
```

**🚨 보안 주의사항**:
- XSS(Cross-Site Scripting) 공격에 취약
- 신뢰할 수 있는 컨텐츠에만 사용
- 사용자 입력은 절대 v-html에 사용 금지

---

### 8. Scoped CSS

#### Scoped 스타일

```vue
<style scoped>
/* 이 스타일은 현재 컴포넌트에만 적용 */
.header {
  color: white;
  background-color: #42b883;
}
</style>
```

**작동 원리**:
```html
<!-- Vue가 자동으로 고유 속성 추가 -->
<div class="header" data-v-2f0a9e4c>...</div>

<!-- CSS도 자동으로 변환 -->
.header[data-v-2f0a9e4c] {
  color: white;
}
```

#### 전역 스타일

```vue
<!-- App.vue -->
<style>
/* scoped 없음 - 모든 컴포넌트에 적용 */
body {
  padding: 0;
  margin: 0;
}
</style>
```

**프로젝트 패턴**:
- 대부분 컴포넌트: `<style scoped>`
- App.vue만: `<style>` (전역)

---

### 9. Vue Router 통합

#### $route 객체 활용

```javascript
// 현재 라우트 이름
this.$route.name  // 'news', 'ask', 'jobs'

// 동적 라우트 파라미터
this.$route.params.id  // '/user/:id'에서 id 추출
```

#### $router 객체 활용

```javascript
// 프로그래매틱 네비게이션 (프로젝트에서는 미사용)
this.$router.push('/news')
this.$router.go(-1)
```

---

### 10. Vuex 통합

#### mapGetters 헬퍼

```javascript
import { mapGetters } from 'vuex';

computed: {
  ...mapGetters(['fetchedNews', 'fetchedAsk'])
  // 이는 다음과 동일:
  // fetchedNews() { return this.$store.getters.fetchedNews }
  // fetchedAsk() { return this.$store.getters.fetchedAsk }
}
```

#### dispatch로 액션 호출

```javascript
created() {
  this.$store.dispatch('FETCH_NEWS');

  // 파라미터 전달
  this.$store.dispatch('FETCH_USER', userName);
}
```

---

## 코드 스타일 및 설정

### ESLint 설정

**위치**: `package.json`

```json
{
  "eslintConfig": {
    "root": true,
    "env": {
      "node": true
    },
    "extends": [
      "plugin:vue/essential",    // Vue 필수 규칙
      "eslint:recommended"       // ESLint 권장 규칙
    ],
    "parserOptions": {
      "parser": "@babel/eslint-parser",
      "requireConfigFile": false
    },
    "rules": {}  // 커스텀 규칙 없음
  }
}
```

**적용된 규칙**:
- Vue Essential 규칙 (컴포넌트 이름, props 타입 등)
- ESLint Recommended (일반 JavaScript 규칙)

---

### Babel 설정

**위치**: `babel.config.js`

```javascript
module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset'
  ]
}
```

**지원하는 기능**:
- ES6+ 문법 변환
- Polyfill 자동 주입
- 브라우저 호환성 확보

---

### Vue CLI 설정

**위치**: `vue.config.js`

```javascript
module.exports = {
  lintOnSave: false,  // 저장 시 린트 검사 비활성화
};
```

---

### JavaScript 설정

**위치**: `jsconfig.json`

```json
{
  "compilerOptions": {
    "target": "es5",
    "module": "esnext",
    "baseUrl": "./",
    "moduleResolution": "node",
    "paths": {
      "@/*": ["src/*"]  // 🔑 @ 별칭 설정
    }
  },
  "exclude": ["node_modules", "dist"]
}
```

**경로 별칭 활용**:

```javascript
// 상대 경로
import ListItem from '../components/ListItem.vue'

// @ 별칭 (프로젝트 루트의 src/)
import ListItem from '@/components/ListItem.vue'
```

---

### 코드 스타일 특징

#### 1. ES6+ 문법 활용

```javascript
// Template Literals
const url = `${config.baseUrl}/news/1.json`;
const path = `item/${item.id}`;

// Arrow Functions
const router = new VueRouter({
  routes: routes.map(route => ({ ...route }))
});
(h) => h(App)

// Destructuring
const { data } = response;
const { commit } = context;
const userName = this.$route.params.id;

// Spread Operator
...mapGetters(['fetchedNews'])
```

#### 2. 일관성 없는 부분 (개선 필요)

```javascript
// 경로 별칭 혼용
'../components/ListItem.vue'    // 상대 경로
'@/components/ListItem.vue'     // 별칭

// 세미콜론 누락
export default {
  name: 'App',     // ❌ 세미콜론 없음
  components: {
    ToolBar
  }
}

// 따옴표 혼용 (대부분 작은따옴표)
'fetchedNews'   // ✅ 주로 사용
"fetchedNews"   // ❌ 가끔 사용
```

#### 3. 네이밍 컨벤션

| 대상 | 컨벤션 | 예시 |
|-----|-------|------|
| 컴포넌트 | PascalCase | `ListItem.vue`, `UserProfile.vue` |
| 변수/함수 | camelCase | `fetchedNews`, `listItems` |
| Actions | UPPER_SNAKE_CASE | `FETCH_NEWS`, `FETCH_USER` |
| Mutations | UPPER_SNAKE_CASE | `SET_NEWS`, `SET_USER` |
| 상수 | UPPER_SNAKE_CASE | `baseUrl` (❌ 일관성 없음) |

---

## 특별한 기법들

### 1. Router Transition 애니메이션

**App.vue**:

```vue
<template>
  <transition name="routing-fade">
    <router-view></router-view>
  </transition>
</template>

<style>
/* 페이지 전환 시 Fade 효과 */
.routing-fade-enter-active, .routing-fade-leave-active {
  transition: opacity .3s ease;
}

.routing-fade-enter, .routing-fade-leave-to {
  opacity: 0;
}
</style>
```

**동작 원리**:
1. 라우트 변경 감지
2. `routing-fade-leave-active` 클래스 추가 (기존 페이지)
3. `routing-fade-enter-active` 클래스 추가 (새 페이지)
4. CSS transition으로 부드러운 효과

---

### 2. 조건부 라우터 링크

**ListItem.vue**:

```vue
<!-- 외부 링크 vs 내부 라우터 링크 -->
<template v-if="item.domain">
  <!-- domain이 있으면 외부 링크 -->
  <a :href="item.url">{{ item.title }}</a>
</template>
<template v-else>
  <!-- domain이 없으면 내부 라우터 링크 -->
  <router-link :to="`item/${item.id}`">
    {{ item.title }}
  </router-link>
</template>
```

**장점**:
- 외부 링크는 새 탭으로 열기
- 내부 링크는 SPA 방식으로 부드러운 전환

---

### 3. 동적 라우트 파라미터 활용

```javascript
// UserView.vue
created() {
  // 🔑 URL에서 파라미터 추출
  const userName = this.$route.params.id;

  // API 호출
  this.$store.dispatch('FETCH_USER', userName);
}

// URL: /user/johndoe
// userName = 'johndoe'
```

---

### 4. Optional Chaining 대체 패턴

**Vue 2에서는 Optional Chaining (`?.`) 미지원**

```vue
<!-- Optional Chaining (사용 불가) -->
{{ item.points?.toString() }}

<!-- 대체 패턴 -->
{{ item.points || 0 }}
{{ item.user ? item.user : 'Anonymous' }}
```

---

### 5. MapGetters 별칭 사용

```javascript
// 일반 사용
computed: {
  ...mapGetters(['fetchedItemInfo'])
}
// this.fetchedItemInfo로 접근

// 별칭 사용
computed: {
  ...mapGetters({
    itemInfo: 'fetchedItemInfo'  // 🔑 짧은 이름으로 매핑
  })
}
// this.itemInfo로 접근
```

---

### 6. CSS 선택자 활용

**ToolBar.vue**:

```vue
<style scoped>
.header a {
  color: white;
}

/* 🔑 router-link는 <a> 태그로 렌더링됨 */
.header a.router-link-exact-active {
  text-decoration: underline;
}
</style>
```

**렌더링 결과**:

```html
<div class="header" data-v-123>
  <a href="/news" class="router-link-exact-active">News</a>
</div>
```

---

### 7. FontAwesome CDN 사용

**public/index.html**:

```html
<link rel="stylesheet"
      href="https://use.fontawesome.com/releases/v5.1.0/css/all.css">
```

**UserProfile.vue**:

```vue
<i class="fas fa-user"></i>
```

**장점**:
- 빠른 아이콘 사용
- 번들 사이즈 증가 없음

**단점**:
- CDN 의존성
- 오프라인 미지원

---

### 8. v-html 사용 (보안 주의)

**ItemView.vue**:

```vue
<div v-html="itemInfo.content"/>
<p v-html="comment.content"></p>
```

**🚨 보안 위험**:
```javascript
// 악의적인 스크립트 삽입 가능
const content = '<img src=x onerror="alert(\'XSS\')">';
```

**안전한 사용법**:
- 신뢰할 수 있는 API 데이터만 사용
- 사용자 입력은 절대 금지
- DOMPurify 같은 라이브러리로 sanitize

---

### 9. CSS 애니메이션 (Keyframes)

**Spinner.vue**:

```vue
<style scoped>
.lds-facebook div {
  animation: lds-facebook 1.2s cubic-bezier(0, 0.5, 0.5, 1) infinite;
}

@keyframes lds-facebook {
  0% {
    top: 6px;
    height: 51px;
  }
  50%, 100% {
    top: 19px;
    height: 26px;
  }
}
</style>
```

---

## 배포 및 인프라

### Docker 설정

#### Multi-stage Dockerfile

**위치**: `Dockerfile`

```dockerfile
# 1단계: 빌드 스테이지
FROM node:16-alpine AS builder
WORKDIR /app

# 의존성 설치
COPY package*.json ./
RUN npm ci

# 소스 복사 및 빌드
COPY . .
RUN npm run build

# 2단계: 프로덕션 스테이지
FROM nginx:alpine

# 빌드된 파일만 복사 (빌드 의존성 제외)
COPY --from=builder /app/dist /usr/share/nginx/html

# Nginx 설정 복사
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

**이점**:
- 최종 이미지 크기 최소화
- 빌드 의존성 제거
- 보안 향상

---

### Nginx 설정

**위치**: `nginx.conf`

```nginx
server {
    listen 80;
    server_name localhost;
    root /usr/share/nginx/html;
    index index.html;

    # 🔑 SPA 라우팅 지원
    location / {
        try_files $uri $uri/ /index.html;
    }

    # Gzip 압축
    gzip on;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;

    # 캐싱 설정
    location ~* \.(?:css|js|jpg|jpeg|gif|png|ico|svg)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
```

**핵심 설정**:
1. `try_files $uri $uri/ /index.html`: 모든 요청을 index.html로 전달 (Vue Router History 모드 지원)
2. Gzip 압축: 파일 크기 축소
3. 정적 파일 캐싱: 성능 향상

---

### Docker Compose

**위치**: `docker-compose.yml`

```yaml
version: '3.8'

services:
  vue-news:
    build: .
    ports:
      - "8080:80"
    restart: unless-stopped
```

**사용법**:
```bash
# 빌드 및 실행
docker-compose up -d

# 중지
docker-compose down
```

---

### 배포 가이드

**위치**: `DEPLOYMENT.md`

프로젝트에는 홈서버 배포를 위한 상세한 가이드가 포함되어 있습니다:

1. GitHub Actions (Self-hosted Runner)
2. Docker 자동 배포
3. Cloudflare Tunnel을 통한 외부 접근

---

## 학습 포인트

### 초급 개발자를 위한 핵심 개념

#### 1. Vue 기본 개념
- ✅ 컴포넌트 기반 개발
- ✅ 반응성 시스템
- ✅ 생명주기 훅 (created)
- ✅ Computed Properties
- ✅ Directives (v-if, v-for, v-bind, v-html)
- ✅ Props와 Slots

#### 2. Vue Router
- ✅ History 모드
- ✅ 동적 라우팅
- ✅ 선언적 네비게이션
- ✅ 라우트 파라미터

#### 3. Vuex 상태 관리
- ✅ State, Getters, Mutations, Actions
- ✅ mapGetters 헬퍼
- ✅ 단방향 데이터 흐름

#### 4. API 통신
- ✅ Axios 활용
- ✅ Promise 체이닝
- ✅ 비동기 데이터 처리

#### 5. 디자인 패턴
- ✅ 컴포넌트 재사용 (ListItem)
- ✅ Slots 패턴 (UserProfile)
- ✅ 컨테이너/프레젠테이션 패턴

---

### 개선 가능한 영역 (학습 과제)

#### 1. 로딩 상태 관리
```javascript
// 현재: Spinner 컴포넌트 미사용
// 개선: loading state 추가
state: {
  isLoading: false
}
```

#### 2. 에러 처리 강화
```javascript
// 현재: console.log만
.catch(error => console.log(error))

// 개선: 사용자 친화적 에러 메시지
.catch(error => {
  commit('SET_ERROR', error.message)
  // 토스트 메시지 표시
})
```

#### 3. Async/Await 도입
```javascript
// 현재: Promise 체이닝
fetchNewsList()
  .then(({ data }) => commit('SET_NEWS', data))

// 개선: Async/Await
async FETCH_NEWS({ commit }) {
  const { data } = await fetchNewsList()
  commit('SET_NEWS', data)
}
```

#### 4. TypeScript 도입
```typescript
interface NewsItem {
  id: number;
  title: string;
  points: number;
  user: string;
  time_ago: string;
  comments_count: number;
}
```

#### 5. 코드 스플리팅
```javascript
// 현재: 정적 import
import NewsView from './views/NewsView.vue'

// 개선: 동적 import
const NewsView = () => import('./views/NewsView.vue')
```

#### 6. 컴포넌트 테스트
```javascript
// Vue Test Utils 활용
import { shallowMount } from '@vue/test-utils'
import ListItem from '@/components/ListItem.vue'

describe('ListItem.vue', () => {
  it('renders list items', () => {
    // 테스트 코드
  })
})
```

---

### 추가 학습 자료

#### Vue 2 공식 문서
- https://v2.vuejs.org/
- 한글: https://v2.ko.vuejs.org/

#### Vue Router 공식 문서
- https://v3.router.vuejs.org/
- 한글: https://v3.router.vuejs.org/kr/

#### Vuex 공식 문서
- https://v3.vuex.vuejs.org/
- 한글: https://v3.vuex.vuejs.org/kr/

#### Hacker News API
- https://api.hnpwa.com/v0/

---

## 정리

이 프로젝트는 **Vue 2의 핵심 기능들을 실무 수준으로 활용한 우수한 학습 프로젝트**입니다.

### 강점
1. ✅ 컴포넌트 재사용성 (ListItem, UserProfile)
2. ✅ 명확한 상태 관리 (Vuex)
3. ✅ 깔끔한 라우팅 구조 (Vue Router)
4. ✅ 모듈화된 코드 구조
5. ✅ Docker 기반 배포 자동화

### 학습 가치
- **초급**: Vue 기본 개념 학습
- **중급**: 디자인 패턴 및 상태 관리
- **고급**: 배포 및 최적화 기법

### 다음 단계
1. 로딩/에러 상태 개선
2. TypeScript 도입
3. 컴포넌트 테스트 작성
4. 성능 최적화 (코드 스플리팅)
5. Vue 3 마이그레이션 고려

---

**작성 완료일**: 2025-12-20
**분석 대상**: vue-news 프로젝트
**Vue 버전**: 2.6.14

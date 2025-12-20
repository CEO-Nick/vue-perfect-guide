<template>
  <div>
    <user-profile :info="fetchedUserInfo">
      <div slot="username">{{ fetchedUserInfo.id }}</div>
      <span slot="time">{{ 'Joined: ' + fetchedUserInfo.created }}, </span>
      <span slot="karma">{{ fetchedUserInfo.karma }}</span>
    </user-profile>
  </div>
</template>

<script>
import UserProfile from "@/components/UserProfile.vue";
import {mapGetters} from "vuex";

export default {
  components: {UserProfile},
  computed: {
    ...mapGetters([
        'fetchedUserInfo',
    ])
  },
  created() {
    let userName = this.$route.params.id;
    this.$store.dispatch('FETCH_USER', userName);
  },
}
</script>
<template>
  <div>
    <user-profile></user-profile>
  </div>
</template>

<script>
import {mapGetters} from "vuex";
import UserProfile from "@/components/UserProfile.vue";

export default {
  components: {UserProfile},
  computed: {
    ...mapGetters({
      userInfo: 'fetchedUserInfo',
    })
  },
  created() {
    let userName = this.$route.params.id;
    this.$store.dispatch('FETCH_USER', userName);
  },
}
</script>
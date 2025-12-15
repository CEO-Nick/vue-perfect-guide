<template>
  <div>
    <ListItem :domain="domain"></ListItem>
  </div>
</template>
<script>
import ListItem from "@/components/ListItem.vue";

export default {
  components: {
    ListItem,
  },
  data() {
    return {
      domain: "FETCH_ASK"
    }
  }
};
</script>

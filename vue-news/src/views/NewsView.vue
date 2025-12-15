<template>
  <div>
    <list-item :domain="domain"></list-item>
  </div>
</template>

<script>
import ListItem from '../components/ListItem.vue'

export default {
  components: {
    ListItem,
  },
  data() {
    return {
      domain: 'FETCH_NEWS',
    }
  }
}

</script>

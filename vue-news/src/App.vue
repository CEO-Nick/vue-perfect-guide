<template>
  <div id="app">
    <tool-bar></tool-bar>
    <transition name="routing-fade">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
import ToolBar from './components/ToolBar.vue';
export default {
  components: { ToolBar },
};
</script>

<style>
body {
  padding: 0;
  margin: 0;
}
/* Router Transition */
.routing-fade-enter-active, .routing-fade-leave-active {
  transition: opacity .3s ease;
}
.routing-fade-enter, .routing-fade-leave-to
  /* .routing-fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>

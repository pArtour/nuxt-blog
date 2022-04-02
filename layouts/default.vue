<template>
  <div>
    <TheHeader @sidenavToggle="toggleSidenav" />
    <TheSidenav :show="sideNavShown" @close="sideNavShown = false" />
    <nuxt />
  </div>
</template>

<script>
import TheHeader from '@/components/navigation/TheHeader.vue';
import TheSidenav from '@/components/navigation/TheSidenav.vue';

export default {
  components: {
    TheHeader,
    TheSidenav,
  },
  data() {
    return {
      sideNavShown: false,
    };
  },
  methods: {
    toggleSidenav() {
      this.sideNavShown = !this.sideNavShown;
    },
  },
};
</script>
<style>
html {
  font-family: 'Open Sans', sans-serif;
}
body {
  margin: 0;
}
</style>
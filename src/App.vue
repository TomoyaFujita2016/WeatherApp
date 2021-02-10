<template>
  <v-app :style="{ background: $vuetify.theme.themes.light.background }">
    <router-view/> 
  </v-app>
</template>

<script>

export default {
  name: 'App',

  components: {
  },

  data: () => ({
    //
  }),
};
</script>

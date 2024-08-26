<template>
  
  <v-app class="rounded rounded-md">
    <!-- ***********************  barre de navigation ***********************-->
    <AppHeader />

      <!-- ***********************  main  ***********************-->
    <v-main class="fill-height">
      <v-container>
        <NuxtPage />

      </v-container>
    </v-main>
    <!-- *********************** footer *************************-->
   <AppFooter />
  </v-app>
</template>
<script setup>
import { useCurrentUser, useIsCurrentUserLoaded } from 'vuefire'
  const isUserLoaded = useIsCurrentUserLoaded()
  const user = useCurrentUser()
  console.log('je passe par app.vue');
</script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
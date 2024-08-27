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
import { useUtilisateurStore } from "@/stores/utilisateur";
import { useMairieStore } from "@/stores/mairie";

  const isUserLoaded = useIsCurrentUserLoaded()

  const utilisateurStore = useUtilisateurStore();
  const mairieStore = useMairieStore();

  watch(isUserLoaded, async() => {
    console.log('isUserLoaded->',isUserLoaded);
    if (isUserLoaded.value) {
     
      await utilisateurStore.fetchUser(); 
    
      
      await mairieStore.fetch(["representant_uid", utilisateurStore.utilisateur.uid]);
    
    }
  })




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
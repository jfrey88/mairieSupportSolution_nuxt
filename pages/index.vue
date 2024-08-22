<template>
  <div v-if="user">
    <Mairie :user="user"/>
  </div>
  <div v-else>
    <div class="d-flex justify-center mb-6">
      <img alt="Vue logo" src="../assets/img/logo.png" style="height: 20vh" />*
    </div>
    <div class="d-flex justify-center mb-6">
      <h1>
        "MAIRIE SUPPORT SOLUTION" <br />
        le bon outil pour votre secrétaire de mairie
      </h1>
    </div>

    <div class="d-flex justify-center mb-6">
      <p class="mb-4">
        Grâce à notre modèle alternatif et solidaire, bénéficiez gratuitement de
        tous nos outils <br />et de l’accompagnement de notre équipe pour gérer
        plus facilement les taches répétitives de votre secrétariat de mairie
      </p>
    </div>
    <div class="d-flex justify-center mb-6">
      <v-carousel cycle hide-delimiters show-arrows="hover" style="max-width: 1024px;">
        <v-carousel-item
          
          src="../assets/img/pub/pub1.jpg"
          transition="fade-transition"
          reverse-transition="fade-transition"
          cover
        ></v-carousel-item>
        <v-carousel-item
          
          src="../assets/img/pub/pub2.jpg"
          transition="fade-transition"
          reverse-transition="fade-transition"
          cover
        ></v-carousel-item>
      </v-carousel>
    </div>
  </div>
</template>

<script setup>
import { useCurrentUser, useIsCurrentUserLoaded } from 'vuefire'
  const isUserLoaded = useIsCurrentUserLoaded()
  const user = ref(null)
  watch(isUserLoaded, () => {
    if (isUserLoaded.value) {
      user.value = useCurrentUser()
    }
  })

</script>

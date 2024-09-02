<template>
  <v-app-bar :elevation="2" color="orange-lighten-3">
    <nuxt-link to="/" class="ml-4">
      <v-img
        width="50"
        height="50"
        aspect-ratio="1"
        max-width="50"
        src="~/assets/img/logoRond.png"
      ></v-img>
    </nuxt-link>

    <v-app-bar-title>MAIRIE SUPPORT SOLUTION</v-app-bar-title>

    <v-spacer></v-spacer>
    <div v-if="isUserLoaded && exists">
      <!-- *********************  BOUTON SE DECONNECTER **************************-->

      <v-btn
        @click="logout"
        prepend-icon="mdi-account"
        text=" Se déconnecter"
      ></v-btn>


    </div>
    <div v-else>
      <!-- ********************* BOITE DE DIALOGUE ET BOUTON SE CONNECTER **************************-->
      <v-dialog max-width="800">
        <template v-slot:activator="{ props: activatorProps }">
          <v-btn
            v-bind="activatorProps"
            prepend-icon="mdi-account"
            text=" Se connecter"
          ></v-btn>
        </template>
        <template v-slot:default="{ isActive }">
          <v-card title="Se connecter">
            <v-card-text>
              <FormSeConnecter :userData="user" />
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>

              <v-btn 
                text="Annuler" 
                @click="isActive.value = false">
              </v-btn>
            </v-card-actions>
          </v-card>
        </template>
      </v-dialog>
      <DialogMairie v-model="dialogStatus" :isCreate="true" />
            <!-- ********************* BOUTON INSCRITE SA MAIRIE  **************************-->
      <v-btn prepend-icon="mdi-home" @click="dialogStatus = !dialogStatus"> inscrire ma mairie </v-btn>
    </div>
  </v-app-bar>
</template>
<script setup>
import { useCurrentUser, useIsCurrentUserLoaded } from "vuefire";
import { getAuth } from "firebase/auth";
import { ref } from "vue";
import { useUtilisateurStore } from "@/stores/utilisateur";


const isUserLoaded = useIsCurrentUserLoaded();


const user = useCurrentUser();


const dialogStatus = ref(false);
const utilisateurStore = useUtilisateurStore();


const {exists, utilisateur} = storeToRefs(utilisateurStore)

//    telephone: "",
//    nom: "",
//    prenom: "",

const auth = getAuth();





const logout = async () => {
  await utilisateurStore.logOut(auth);
  navigateTo("/");
};


</script>

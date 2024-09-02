<template>
  <div>
    <v-container fluid>
      <v-row>
        <!-- **************** COLONNE DE GAUCHE INFO MAIRIE **************************-->
        <v-col cols="12" md="12">
          <h1 class="text-uppercase">MAIRIE DE {{ mairie.ville }}</h1>
        </v-col>
        <v-col cols="12" md="4" class="border-md">
          <h2 class="text-uppercase">informations</h2>
          <p>
            texte département <br />
            {{ mairieStore.mairie.textDepartement }}
          </p>
          <p>
            code postal <br />
            {{ mairieStore.mairie.codePostal }}
          </p>
          <p class="mt-2">
            adresse <br />
            {{ mairieStore.mairie.adresse }}
          </p>
          <p class="mt-2">
            téléphone <br />
            {{ mairieStore.mairie.telephone }}
          </p>
          <p class="mt-2">
            email <br />
            {{ mairieStore.mairie.email }}
          </p>
          <p class="mt-2" v-if="mairie.texteOuverture" v-html="formatText"></p>

          <!-- ---------------- BOITE DE DIALOGUE MODIF MAIRIE  --------------------------->
          <DialogMairie v-model="dialogStatusMairie" />
          <v-btn
            class="mt-4"
            color="orange-darken-4"
            prepend-icon="mdi-pencil"
            text="Modifier les informations"
            @click="dialogStatusMairie = !dialogStatusMairie"
          ></v-btn>
        </v-col>

        <!-- **************** COLONNE DE DROITE INFO CONSEILLERS **************************-->
        <v-col cols="12" md="8" class="border-md">
          <v-row justify="space-between">
            <v-col cols="12" md="6">
              <h2 class="text-uppercase">conseillers municipaux</h2>
            </v-col>
            <v-col cols="12" md="6">
              <!-- ---------------- BOITE DE DIALOGUE AJOUTER CONSEILLER  --------------------------->
              <DialogConseillers v-model="dialogStatusConseiller"
                :mairieData="mairie" />
              <v-btn
                class="mt-4"
                color="orange-darken-4"
                prepend-icon="mdi-plus"
                text="Ajouter un conseiller"
                @click="dialogStatusConseiller = !dialogStatusConseiller"
              ></v-btn>
            </v-col>
            <v-col cols="12" md="12">
              <!--  --------------------------- TABLE POUR AFFICHER LES CONSEILLERS --------------------------------->

              <MairieConseillers :conseillers="mairieStore.conseillers" />
            </v-col>
          </v-row>
        </v-col>
      </v-row>

      <!-- **************** COLONNE DU BAS INFO REUNION CONSEIL MUNICIPAL **************************-->
      <v-row class="border-md">
        <v-col cols="12" md="9">
          <h2 class="text-uppercase mt-6">Réunions conseil municipal</h2>
        </v-col>
        <v-col cols="12" md="3">
          <!-- ---------------- BOITE DE DIALOGUE AJOUTER REUNION  --------------------------->

          <DialogReunion
            v-model="dialogStatusReunion"
            :mairieData="mairieStore.mairie"
          />
          <v-btn
            class="mt-4"
            color="orange-darken-4"
            prepend-icon="mdi-pencil"
            text="Ajouter une réunion"
            @click="dialogStatusReunion = !dialogStatusReunion"
          ></v-btn>
          <!-- ----------------FIN BOITE DE DIALOGUE AJOUTER REUNION  --------------------------->
        </v-col>

        <v-col cols="12" md="12">
          <!--  --------------------------- TABLE POUR AFFICHER LES REUNION DU CONSEIL MUNICIPAL --------------------------------->
          <MairieReunions :mairie="mairieStore.mairie" :user="user">
          </MairieReunions>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script setup>
/* eslint-disable no-unused-vars */
/********************** On fait les impots ********************************** */
import { useMairieStore } from "@/stores/mairie";
import { useUtilisateurStore } from "@/stores/utilisateur";

const mairieStore = useMairieStore();

const dialogStatusMairie = ref(false);
const dialogStatusConseiller = ref(false);
const dialogStatusReunion = ref(false);

//initialisation des variables
// const auth = getAuth();
const mairie = ref({});

const props = defineProps({
  user: Object,
});

useUtilisateurStore.fetchUtilisateur;

// fonction pour afficher correctement le retour chariot
const formatText = computed(() => {
  return ["ouverture du secrétariat ", mairie.value.texteOuverture]
    .join("<br />")
    .replace(/\\n/g, "<br />");
});

const fetchMairie = async () => {
  mairie.value = await mairieStore.fetch();
};

await fetchMairie();
</script>

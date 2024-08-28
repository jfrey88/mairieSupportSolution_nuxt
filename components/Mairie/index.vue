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
            <DialogModificationMairie/>
          </v-col>
  
          <!-- **************** COLONNE DE DROITE INFO CONSEILLERS **************************-->
          <v-col cols="12" md="8" class="border-md">
            <v-row justify="space-between">
              <v-col cols="12" md="6">
                <h2 class="text-uppercase">conseillers municipaux</h2>
              </v-col>
              <v-col cols="12" md="6">
                <!-- ---------------- BOITE DE DIALOGUE AJOUTER CONSEILLER  --------------------------->
                <DialogConseillers 
                  :userData="user"
                  :mairieData="mairie" />
              </v-col>
              <v-col cols="12" md="12">
                <!--  --------------------------- TABLE POUR AFFICHER LES CONSEILLERS --------------------------------->
  
                <MairieConseillers 
                  :conseillers="conseillers" 
                  :user="user"
                  />
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
            :userData="user"
           
             />
            <!-- ----------------FIN BOITE DE DIALOGUE AJOUTER REUNION  --------------------------->
          </v-col>
  
          <v-col cols="12" md="12">
            <!--  --------------------------- TABLE POUR AFFICHER LES REUNION DU CONSEIL MUNICIPAL --------------------------------->
            <MairieReunions :mairie="mairieStore.mairie" :user="user"></MairieReunions>
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
  import { useConseillerMunicipalStore } from "@/stores/conseillerMunicipal";
  import { useReunionConseilMunicipalStore } from "@/stores/reunionConseilMunicipal";
  import { useOrdresDuJourStore } from "@/stores/ordresDuJour";
  
  import { ref, computed, onMounted } from "vue";

  /************************ Initialisation des stors ********************************* */
  const mairieStore = useMairieStore();

  const conseillerMunicipalStore = useConseillerMunicipalStore();
  const reunionConseilMunicipal = useReunionConseilMunicipalStore();
  const ordresDuJour = useOrdresDuJourStore();
  
  //initialisation des variables
  // const auth = getAuth();
  const mairie = ref({});
  const userInfo = ref({});
  const conseillers = ref([]);
  const reunions = ref([]);
  // const odj = ref([]);
  
  const props = defineProps({
    user: Object,
  });


  const utilisateurStore = useUtilisateurStore();
  useUtilisateurStore.fetchUtilisateur;
  let user = utilisateurStore.utilisateur;



  // fonction pour afficher correctement le retour chariot
  const formatText = computed(() => {
    return ["ouverture du secrétariat ", mairie.value.texteOuverture]
      .join("<br />")
      .replace(/\\n/g, "<br />");
  });

  // function pour supprimer une reunion
  const deleteReunion = async (reunion) => {
    // on supprime les ordres du jour de la réunion
    ordresDuJour.delete(reunion.id);
    // on supprime la réunion
   reunionConseilMunicipal.delete(reunion.id);
   reunions.value = await reunionConseilMunicipal.fetch(["representant_uid", user.uid]);
    //reunions.value = reunionConseilMunicipal.withId;
  };
  

  
/******************* ON CHERCHE LES INFOS DE LA PERSONNE ****************************** */
const fetchUtilisateur = async (user) => {
  
  userInfo.value = await utilisateurStore.fetchOne(user.uid);

}

await fetchUtilisateur(user);

/******************* ON CHERCHE LES INFOS DE LA MAIRIE ****************************** */
  const fetchMairie = async (user) => {
    mairie.value = await mairieStore.fetch(["representant_uid", user.uid]);
  };

  await fetchMairie(user);


  /******************* ON CHERCHE LES CONSEILLERS DE LA MAIRIE ****************************** */
  const fetchConseillers = async(user) => {
    conseillers.value = await conseillerMunicipalStore.fetch(["representant_uid", user.uid]);
  }
  await fetchConseillers(user);
  
/******************** ON CHERCHE LES REUNIONS DU CONSEIL MUNICIPAL DE LA MAIRIE *********************/
  const fetchReunion = async(user) =>{
    reunions.value = await reunionConseilMunicipal.fetch(["representant_uid", user.uid]);
  }
  await fetchReunion(user)
   

  
  
  </script>
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
              {{ mairie.textDepartement }}
            </p>
            <p>
              code postal <br />
              {{ mairie.codePostal }}
            </p>
            <p class="mt-2">
              adresse <br />
              {{ mairie.adresse }}
            </p>
            <p class="mt-2">
              téléphone <br />
              {{ mairie.telephone }}
            </p>
            <p class="mt-2">
              email <br />
              {{ mairie.email }}
            </p>
            <p class="mt-2" v-if="mairie.texteOuverture" v-html="formatText"></p>
  
            <!-- ---------------- BOITE DE DIALOGUE MODIF MAIRIE  --------------------------->
            <DialogModificationMairie
              :userData="user"
              :mairieData="mairie"
              :userInfoData="utilisateurStore.utilisateur"
            />
          </v-col>
  
          <!-- **************** COLONNE DE DROITE INFO CONSEILLERS **************************-->
          <v-col cols="12" md="8" class="border-md">
            <v-row justify="space-between">
              <v-col cols="12" md="6">
                <h2 class="text-uppercase">conseillers municipaux</h2>
              </v-col>
              <v-col cols="12" md="6">
                <!-- ---------------- BOITE DE DIALOGUE AJOUTER CONSEILLER  --------------------------->
                <DialogConseillers :userData="user" />
              </v-col>
              <v-col cols="12" md="12">
                <!--  --------------------------- TABLE POUR AFFICHER LES CONSEILLERS --------------------------------->
  
                <MairieConseillers :conseillers="conseillers" />
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
            <DialogReunion :mairieData="user" />
            <!-- ----------------FIN BOITE DE DIALOGUE AJOUTER REUNION  --------------------------->
          </v-col>
  
          <v-col cols="12" md="12">
            <!--  --------------------------- TABLE POUR AFFICHER LES REUNION DU CONSEIL MUNICIPAL --------------------------------->
            <v-table class="border-md">
              <thead>
                <tr>
                  <th
                    class="text-center border-sm bg-lime-lighten-5 text-uppercase font-weight-bold"
                  >
                    Date
                  </th>
                  <th
                    class="text-center border-sm bg-lime-lighten-5 text-uppercase font-weight-bold"
                  >
                    Ordre du jour
                  </th>
                  <th
                    class="text-center border-sm bg-lime-lighten-5 text-uppercase font-weight-bold"
                  >
                    convocation
                  </th>
                  <th
                    class="text-center border-sm bg-lime-lighten-5 text-uppercase font-weight-bold"
                  >
                    feuille présence
                  </th>
                  <th
                    class="text-center border-sm bg-lime-lighten-5 text-uppercase font-weight-bold"
                  >
                    Procès verbal
                  </th>
                  <th
                    class="text-center border-sm bg-lime-lighten-5 text-uppercase font-weight-bold"
                  >
                    Extrait registre
                  </th>
                  <th
                    class="text-center border-sm bg-lime-lighten-5 text-uppercase font-weight-bold"
                  >
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="reunion in reunions" :key="reunion.date">
                  <!--  boucle sur les conseillers-->
                  <td class="text-center border-sm">{{ reunion.date }}</td>
                  <td class="text-left border-sm">
                     <p v-html="reunion.ordres"></p>
                
                  </td>
                  <td style="vertical-align: middle" class="border-sm">
                    <v-btn class="my-4">envoyer </v-btn><br />
                    <v-btn 
                      class="my-4"
                      
                      >imprimer </v-btn>
                  </td>
                  <td style="vertical-align: middle" class="border-sm">
                    <div v-if="reunion.isConvocationOk">
                      <v-btn class="my-4">imprimer</v-btn><br />
                      <v-btn class="my-4"
                        >ajouter une <br />absence/procuration</v-btn
                      ><br />
                      <v-btn class="my-4"
                        >modifier une <br />absence/procuration</v-btn
                      ><br />
                    </div>
                  </td>
                  <td style="vertical-align: middle" class="border-sm">
                    <div v-if="reunion.isFeuillePresenceOk">
                      <v-btn class="my-4">Délibérations</v-btn><br />
                      <v-btn class="my-4"
                        >Générer imprimer <br />procès verbal </v-btn
                      ><br />
                      <v-btn class="my-4">transmis prefecture</v-btn><br />
                    </div>
                  </td>
                  <td style="vertical-align: middle" class="border-sm">
                    <div v-if="reunion.isProcesVerbalOk">
                      <v-btn class="my-4">Imprimer</v-btn><br />
                    </div>
                  </td>
                  <td style="vertical-align: middle" class="border-sm">
                    <!-- ---------------- BOITE DE DIALOGUE MODIFIER REUNION  --------------------------->
                    <DialogModificationReunions
                      :mairieData="user"
                      :reunionData="reunion"
                    />
                    <v-btn
                      v-if="!reunion.isTransmisPrefecture"
                      density="compact"
                      @click="deleteReunion(reunion)"
                      icon="mdi-delete"
                      class="ml-2"
                    ></v-btn>
                  </td>
                </tr>
              </tbody>
            </v-table>
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
  import { getDoc } from "firebase/firestore";
  
  import { ref, computed, onMounted } from "vue";

  /************************ Initialisation des stors ********************************* */
  const mairieStore = useMairieStore();
  const utilisateurStore = useUtilisateurStore();
  const conseillerMunicipalStore = useConseillerMunicipalStore();
  const reunionConseilMunicipal = useReunionConseilMunicipalStore();
  const ordresDuJour = useOrdresDuJourStore();
  
  //initialisation des variables
  // const auth = getAuth();
  const mairie = ref({});
  const userInfo = ref({});
  const conseillers = ref([]);
  const reunions = ref([]);
  const ordres = ref([]);
  // const odj = ref([]);
  
  const props = defineProps({
    user: Object,
  });
  // fonction pour afficher correctement le retour chariot
  const formatText = computed(() => {
    return ["ouverture du secrétariat ", mairie.value.texteOuverture]
      .join("<br />")
      .replace(/\\n/g, "<br />");
  });
  
  // function pour supprimer une reunion
  const deleteReunion = async (reunion) => {
    reunionConseilMunicipal.delete(reunion);
    reunions.value = reunionConseilMunicipal.withId;
  };
  
  // function pour supprimer un conseiller municipal
  const deleteConseiller = async (conseiller) => {
    conseillerMunicipal.delete(conseiller);
    conseillers.value = conseillerMunicipal.withId;
  };
  
/******************* ON CHERCHE LES INFOS DE LA PERSONNE ****************************** */
const fetchUtilisateur = async (user) => {
  
  userInfo.value = await utilisateurStore.fetchOne(user.value.uid);
  console.log("userInfo.value",userInfo.value)
  console.log("utilisateurStore.utilisateur",utilisateurStore.utilisateur)
}

await fetchUtilisateur(props.user);

/******************* ON CHERCHE LES INFOS DE LA MAIRIE ****************************** */
  const fetchMairie = async (user) => {
    mairie.value = await mairieStore.fetch(["representant_uid", user.value.uid]);
  };

  await fetchMairie(props.user);


  /******************* ON CHERCHE LES CONSEILLERS DE LA MAIRIE ****************************** */
  const fetchConseillers = async(user) => {
    conseillers.value = await conseillerMunicipalStore.fetch(["representant_uid", user.value.uid]);
  }
  await fetchConseillers(props.user);
  
/******************** ON CHERCHE LES REUNIONS DU CONSEIL MUNICIPAL DE LA MAIRIE *********************/
  const fetchReunion = async(user) =>{
    reunions.value = await reunionConseilMunicipal.fetch(["representant_uid", user.value.uid]);
  }
  await fetchReunion(props.user)
  
  reunions.value.forEach(async (reunion) => {
      reunion.ordres = "";
      // on récupère pour chaque réunion les ordres du jours

      const ordrerecept = await ordresDuJour.fetch(["id_reunion", reunion.id]);
      
      ordrerecept.forEach((ordre) => {

       
        ordres.value.push(ordre.ordre);
        reunion.ordres = reunion.ordres.concat(
          ordre.numero + 1,
          ". ",
          ordre.ordre,
          "<br />"
        );
      });
     // reunions.value.push(reunion);
    });

  
  
  </script>
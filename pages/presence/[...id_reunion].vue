<template>
  <v-container fluid>
    <h1 class="text-center">FEUILLE DE PRESENCE</h1>
    <div class="text-center my-5">
    <v-btn
       class="ml-2"
        color="orange-darken-4"
        prepend-icon="mdi-email"
    >Envoyer des convocations</v-btn>
    <v-btn
       class="ml-2"
        color="orange-darken-4"
        prepend-icon="mdi-printer"
    >Imprimer des convocations</v-btn>
    <v-btn
       class="ml-2"
        color="orange-darken-4"
        prepend-icon="mdi-arrow-left"
         to="/"
    >Retour</v-btn>
  </div>
    <v-row class="px-2 py-2">
      <v-col
        cols="12"
        md="6"
        v-for="conseiller in conseillerMunicipalStore.conseillers"
        class="border-md mt-2"
      >
        <v-row class="px-2 py-2">
          <!-- **************** COLONNE DE GAUCHE INFO MAIRIE **************************-->

          <v-col cols="12" md="3" class="border-sm mt-2 text-center">
            <p>{{ mairieStore.mairie.textDepartement }}</p>
            <p class="text-uppercase">
              MAIRIE DE {{ mairieStore.mairie.ville }}
            </p>
            <p>{{ mairieStore.mairie.adresse }}</p>
            <p class="text-uppercase mb-2">
              {{ mairieStore.mairie.codePostal }} {{ mairieStore.mairie.ville }}
            </p>
            <p>Tèl : {{ mairieStore.mairie.telephone }}</p>
            <p>{{ mairieStore.mairie.email }}</p>
            <p class="text-decoration-underline mt-2">
              Ouverture du secrétariat
            </p>
            <p v-html="formatText"></p>
          </v-col>
          <!-- **************** COLONNE DE DROITE INFO CONSEILLER **************************-->
          <v-col>
            <h2 class="text-center mb-4">CONVOCATION DU CONSEIL MUNICIPAL</h2>
            <p class="text-center">
              {{ conseiller.prenom }} {{ conseiller.nom }}
            </p>
            <p class="text-center">{{ conseiller.adresse }}</p>
            <p class="text-center text-uppercase">
              {{ conseiller.codePostal }} {{ conseiller.ville }}
            </p>
            <p class="text-center">{{ conseiller.email }}</p>
          </v-col>
        <!-- **************** LIGNE MILIEU AVEC TEXTE CONVOC **************************-->
          <v-col cols="12" md="12" class="text-center mt-4">
            <p>
              J'ai l'honneur de vous inviter à la réunion du Conseil Municipal
              qui aura lieu le
            </p>
            <p>{{ reunionEnCours.date }} à {{ reunionEnCours.heure }}</p>
            <p>Veuillez agréer l'assurance de mes meilleures sentiments</p>
            <p>A {{ mairieStore.mairie.ville }}, le {{ dateduJourTxt() }}</p>
          </v-col>
          <v-col cols="12" md="12" class="text-left mt-4 ml-8">
            <p class="text-decoration-underline">ORDRE JOUR</p>
            <div v-for="ordre in reunionEnCours.ordres">
              <p>{{ ordre.numero }}.{{ ordre.ordre }}</p>
            </div>
          <!--  <p v-for="ordre in reunionEnCours.ordres">
              {{ ordre.numero }}.{{ ordre.ordre }}
            </p>-->
          </v-col>
          <!-- **************** BAS DE LA FEUILLE AVEC POUVOIRS **************************-->
          <v-col cols="12" md="12" class="text-left mt-4 ml-8">
            <p class="text-center">
              .................................................................................................................................
            </p>
            <div v-if="conseiller.nom != 'AFFICHAGE'">
              <h2 class="text-center">POUVOIR</h2>
            <p>
              Je soussigné(e), {{ conseiller.prenom }}
              {{ conseiller.nom }} donne pouvoir à ........................
            </p>
            <p class="ml-5">De prendre part à toutes les délibérations</p>
            <p class="ml-5">D'émettre tous votes et sugner tous documents</p>
            <p>
              Le présent pouvoir conservant ses effets pour tout autre jour
              suivant (1) auquel cette réunion serait reportée pour cause
              quelconque
            </p>
            <p class="text-right">Fait à {{mairieStore.mairie.ville }} le ....../....../......</p>
            <p class="text-right">Porter à la main "Bon pour pouvoir" et signer</p>
            <p>Cocher la (les) mentions(s) utiles(s)</p>
            <p>(1)NB. Validité :  trois reports au maximum</p>
            </div>

          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { useReunionConseilMunicipalStore } from "@/stores/reunionConseilMunicipal";
import { useMairieStore } from "@/stores/mairie";
import { useConseillerMunicipalStore } from "@/stores/conseillerMunicipal";
import { useOrdresDuJourStore } from "@/stores/ordresDuJour";



const mairieStore = useMairieStore();
const conseillerMunicipalStore = useConseillerMunicipalStore();

const route = useRoute();
const id_reunion = route.params["id_reunion"][0];


const formatText = computed(() => {
  return ["ouverture du secrétariat ", mairieStore.mairie.texteOuverture]
    .join("<br />")
    .replace(/\\n/g, "<br />");
});

const reunionEnCours = ref({});

//******************* On récupère les données de la réunion en cours *******************************/
const reunionConseilMunicipal = useReunionConseilMunicipalStore();
reunionEnCours.value = await reunionConseilMunicipal.fetchOne(id_reunion);


/******************** On récupère les données de la mairie concernée par cette réunion ******************* */
const id_mairie = ref("");
id_mairie.value = reunionEnCours.value.representant_uid;


const fetchMairie = async (id_mairie) => {
  await mairieStore.fetch(["representant_uid", id_mairie]);
};

await fetchMairie(id_mairie.value);


/******************* On récupère les conseillers municipaux de cette mairie *********************************/
const fetchConseillers = async (id_mairie) => {
  await conseillerMunicipalStore.fetch(["representant_uid", id_mairie]);
};
await fetchConseillers(id_mairie.value);
conseillerMunicipalStore.conseillers.push({"nom" : "AFFICHAGE" });


const dateduJourTxt = () => {
  var today = new Date();
  var dd = String(today.getDate()).padStart(2, "0");
  var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
  var yyyy = today.getFullYear();

  return dd + "/" + mm + "/" + yyyy;
};


/******************* On récupère l'ordre du jour de cette réunion *********************************/
const updateConvoc = async() => {
  await reunionConseilMunicipal.updateisConvocation(id_reunion);
}
updateConvoc();



</script>

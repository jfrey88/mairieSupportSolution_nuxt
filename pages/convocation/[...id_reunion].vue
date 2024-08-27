<template>
  <v-container fluid>
    <h1 class="text-center">LISTE DES CONVOCATIONS</h1>
    <div v-for="conseiller in conseillerMunicipalStore.conseillers" class="border-md mt-2 ">
    <v-row class="px-2 py-2">
      <!-- **************** COLONNE DE GAUCHE INFO MAIRIE **************************-->
      <v-col cols="12" md="3" class="border-sm mt-2 text-center">
        <p>{{ mairieStore.mairie.textDepartement }}</p>
        <p class="text-uppercase">MAIRIE DE {{ mairieStore.mairie.ville }}</p>
        <p>{{ mairieStore.mairie.adresse }}</p>
        <p class="text-uppercase mb-2">
          {{ mairieStore.mairie.codePostal }} {{ mairieStore.mairie.ville }}
        </p>
        <p>Tèl : {{ mairieStore.mairie.telephone }}</p>
        <p>{{ mairieStore.mairie.email }}</p>
        <p class="text-decoration-underline mt-2">Ouverture du secrétariat</p>
        <p v-html="formatText"></p>
      </v-col>
<!-- **************** COLONNE DE GAUCHE INFO CONSEILLER **************************-->
      <v-col>
        <h2 class="text-center mb-4">CONVOCATION DU CONSEIL MUNICIPAL</h2>
        <p class="text-center">{{ conseiller.prenom }} {{ conseiller.nom }}</p>
        <p class="text-center">{{ conseiller.adresse }} </p>
        <p class="text-center text-uppercase">{{ conseiller.codePostal }} {{ conseiller.ville }} </p>
        <p class="text-center">{{ conseiller.email }} </p>
      </v-col>

      <v-col cols="12" md="12" class="text-center mt-4">
        <p>J'ai l'honneur de vous inviter à la réunion du Conseil Municipal qui aura lieu le</p>
        <p>{{reunionEnCours.date }} à {{ reunionEnCours.heure }}</p>
        <p>Veuillez agréer l'assurance de mes meilleures sentiments</p>
        <p>A {{ mairieStore.mairie.ville }}, le {{ dateduJourTxt() }}</p>

      </v-col>
      <v-col cols="12" md="12" class="text-left mt-4 ml-8">
        <p class="text-decoration-underline">ORDRE JOUR</p>

      </v-col>
    </v-row>
    </div>
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
console.log(id_reunion);


const formatText = computed(() => {
    return ["ouverture du secrétariat ", mairieStore.mairie.texteOuverture]
      .join("<br />")
      .replace(/\\n/g, "<br />");
  });


const reunionEnCours = ref({});

//******************* On récupère les données de la réunion en cours *******************************/
const reunionConseilMunicipal = useReunionConseilMunicipalStore();
reunionEnCours.value = await reunionConseilMunicipal.fetchOne(id_reunion);
console.log("reunionEnCours", reunionEnCours);

/******************** On récupère les données de la mairie concernée par cette réunion ******************* */
const id_mairie = ref("");
id_mairie.value = reunionEnCours.value.representant_uid;
console.log(id_mairie.value);

const fetchMairie = async (id_mairie) => {
  await mairieStore.fetch(["representant_uid", id_mairie]);
};

await fetchMairie(id_mairie.value);
console.log("mairieStore.mairie", mairieStore.mairie);

/******************* On récupère les conseillers municipaux de cette mairie *********************************/
 const fetchConseillers = async(id_mairie) => {
    await conseillerMunicipalStore.fetch(["representant_uid", id_mairie]);
  }
  await fetchConseillers(id_mairie.value)
console.log("conseillerMunicipalStore.conseillers",conseillerMunicipalStore.conseillers)

const dateduJourTxt = () => {
    var today = new Date();
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
var yyyy = today.getFullYear();

return  dd + '/' + mm + '/' + yyyy;
}



</script>

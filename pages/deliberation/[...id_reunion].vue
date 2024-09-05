<template>
   
    <h1 class="text-center text-uppercase">ENREGISTREMENT DES Délibérations</h1>
    <div class="text-center my-5">
    <v-btn
       class="ml-2"
        color="orange-darken-4"
        prepend-icon="mdi-email"
    >Imprimer la feuille de présence</v-btn>
    <v-btn
       class="ml-2"
        color="orange-darken-4"
        prepend-icon="mdi-arrow-left"
         to="/"
    >Retour</v-btn>
  </div>
    <v-row class="px-2 py-2 mt-2"></v-row> 
    <h2 class="text-center text-uppercase my-3">séance du {{ reunionEnCours.date }}</h2>
    <FormCreationDeliberation 
        :reunionEnCours="reunionEnCours" 
        :conseillersMunicipaux="conseillersMunicipaux"
        />
    
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
await reunionConseilMunicipal.updateisFeuillePresence(id_reunion);
reunionEnCours.value = await reunionConseilMunicipal.fetchOne(id_reunion);


/******************** On récupère les données de la mairie concernée par cette réunion ******************* */
const id_mairie = ref("");
const conseillersMunicipaux = ref([]);

id_mairie.value = reunionEnCours.value.representant_uid;





const dateduJourTxt = () => {
  var today = new Date();
  var dd = String(today.getDate()).padStart(2, "0");
  var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
  var yyyy = today.getFullYear();

  return dd + "/" + mm + "/" + yyyy;
};


const fetchConseillers = async (id_mairie) => {
  await conseillerMunicipalStore.fetch(["representant_uid", id_mairie]);
};
await fetchConseillers(id_mairie.value);
conseillersMunicipaux.value = conseillerMunicipalStore.conseillers;

const dateLiterale = (myDate) => {
  const nomJour=["dimanche","lundi","mardi","mercredi","jeudi","vendredi","samedi"];
  const nomMois=["janvier","février","mars","avril","mai","juin","juillet","août","septembre","ocobre","novembre","décembre"];
  const dateTransf=new Date(myDate.substr(6),myDate.substr(3,2)-1,myDate.substr(0,2));
  let dateEnTexte=nomJour[dateTransf.getDay()]+" ";
  dateEnTexte += parseInt(myDate.substr(0,2));
  const moisEnTexte = dateTransf.getMonth();
  dateEnTexte += " "+nomMois[moisEnTexte] + " "+myDate.substr(6);
  
  return(dateEnTexte);
}

</script>
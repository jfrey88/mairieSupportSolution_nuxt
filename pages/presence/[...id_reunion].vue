<template>
  <v-container fluid>
    <h1 class="text-center text-uppercase">FEUILLE DE PRéSENCE</h1>
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
    <v-row class="px-2 py-2 mt-2">
      
        
          <!-- **************** COLONNE DE GAUCHE INFO MAIRIE **************************-->

          <v-col cols="12" md="8" class="mt-2 text-center">
            <h2 class="text-decoration-underline">Séance du {{ dateLiterale(reunionEnCours.date) }}</h2>
          </v-col>
          <v-col cols="12" md="4" class="mt-2 text-center border-md ">
            <h2 >Feuillet n° {{ (reunionEnCours.numFeuillet) }}</h2>
          </v-col>
          <v-col cols="12" md="12" class="mt-2 text-left  ">
            <h2 class="text-decoration-underline">Convocation du {{ (reunionEnCours.dateConvoc) }}</h2>
            <h2 class="text-decoration-underline">Ordre du jour :</h2>
            <p v-for="ordre in reunionEnCours.ordres" :key="ordre.id" class="ms-3"> {{ ordre.numero }}. {{ ordre.ordre }}</p>

          </v-col>


          <v-col cols="12" md="12" class="mt-2 text-center">
            <v-table class="border-md" >
              <thead>
                <tr>
                  <th  class="mt-2 text-center border-md" >Prénom nom, fonction</th>
                  <th  class="mt-2 text-center border-md">Signature</th>
                </tr>
              </thead>
                <tbody class="mt-2 mx-auto text-center">
                  <tr v-for="conseiller in conseillerMunicipalStore.conseillers">
                    <th  class="mt-2 text-center border-md">{{ conseiller.prenom}} {{ conseiller.nom }} , {{conseiller.role}}</th>
                    <th v-if="donneProcuration(conseiller.id)!=false" class="border-md">
                        Donne procuration à {{ donneProcuration(conseiller.id).prenom }} {{ donneProcuration(conseiller.id).nom}}
                    </th>
                    <th v-else class="border-md"> </th>
                  </tr>
                </tbody>
      
              
            </v-table>
            <br>
            <p class="text-center">Séance du {{ reunionEnCours.date }}</p>  
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
await reunionConseilMunicipal.updateisFeuillePresence(id_reunion);
reunionEnCours.value = await reunionConseilMunicipal.fetchOne(id_reunion);


/******************** On récupère les données de la mairie concernée par cette réunion ******************* */
const id_mairie = ref("");
id_mairie.value = reunionEnCours.value.representant_uid;


const donneProcuration=(conseiller_id)=>{
  let recherche=false;

  reunionEnCours.value.procurations.forEach((proc)=>{
    if ((proc.absent == conseiller_id) && (proc.recevant)){
      recherche=conseillerMunicipalStore.conseillers.find(conseiller => conseiller.id == proc.recevant);
    }
  })
  return recherche
  //TODO RECHERCHE DE PROC
  //reunionEnCours.proc
}


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

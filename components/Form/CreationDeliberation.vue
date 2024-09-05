<template>
  <!-- ------------------------------- BOITE DE DIALOGUE POUR LA CREATION/MODIFICATION D'UN CONSEILLER ------------------------->
 
    
      <v-row >
        <v-col cols="12" md="4" class="border-md">
          <p class="text-center font-weight-bold">Présents</p>
        </v-col>
        <v-col cols="12" md="4" class="border-md">
          <p class="text-center font-weight-bold">Absents</p>
        </v-col>
        <v-col cols="12" md="4" class="border-md">
          <p class="text-center font-weight-bold">Procurations</p>
        </v-col>

        <v-col  cols="12" md="4" class="border-md">
          <div v-for="conseiller in props.conseillersMunicipaux">
            <p v-if="isPresent(conseiller.id)" class="text-center">{{conseiller.prenom}} {{ conseiller.nom }}, {{ conseiller.role }}</p>
          </div>
          
        </v-col>
        <v-col  cols="12" md="4" class="border-md">
          <div v-for="conseiller in props.conseillersMunicipaux">
            <p v-if="!isPresent(conseiller.id)" class="text-center">{{conseiller.prenom}} {{ conseiller.nom }}, {{ conseiller.role }}</p>
          </div>
          
        </v-col>
        <v-col  cols="12" md="4" class="border-md">
          <div v-for="conseiller in props.conseillersMunicipaux">
            <p v-if="isProc(conseiller.id)" class="text-center">{{conseiller.prenom}} {{ conseiller.nom }}, {{ conseiller.role }}</p>
          </div>
          
        </v-col>
      </v-row>
        <h2 class="text-center text-uppercase my-4">délibérations</h2>
        <v-row>
          <v-col  cols="12" md="2" class="border-md text-center font-weight-bold">
            Ordre
          </v-col>
          <v-col  cols="12" md="4" class="border-md text-center font-weight-bold">
            texte délibération
          </v-col>
          <v-col  cols="12" md="3" class="border-md text-center font-weight-bold">
            texte fin délibération
          </v-col>
          <v-col  cols="12" md="2" class="border-md text-center font-weight-bold">
            Vote <br> Pour / Nul /Contre
          </v-col>
          <v-col  cols="12" md="1" class="border-md text-center font-weight-bold">
            Approuvé
          </v-col>


        </v-row>
        <v-row v-for="ordre in reunionEnCours.ordres"  cols="12" md="4" class="border-md">
          <v-col  cols="12" md="2" class="border-md">

            {{ ordre.ordre }}
          </v-col>
          <v-col  cols="12" md="4" class="border-md">
            <v-textarea
              label="Texte délibération"
              v-model="ordre.text_deliberation"
              variant="filled"
              auto-grow
            ></v-textarea>

          </v-col>
          <v-col  cols="12" md="3" class="border-md">
            <v-textarea
              label="Texte fin délibération"
              v-model="ordre.text_fin_deliberation"
              variant="filled"
              auto-grow
            ></v-textarea>
          </v-col>
          <v-col  cols="12" md="2" class="border-md  text-center">
            {{ ordre.nb_vote_pour }} / {{ ordre.nb_vote_nul }} / {{ ordre.nb_vote_contre }}
          </v-col>
          <v-col  cols="12" md="1" class="border-md  text-center">
          </v-col>


        </v-row>


      

       <!-- ---------------- Si c'est une création de conseiller ----------------    -->
  
        <v-col cols="12" md="12">
          <v-btn
            class="mt-2"
            type="submit"
            block
            color="orange-darken-4"
            prepend-icon="mdi-content-save-edit"
            >Enregistrer les délibérations
          </v-btn>
        </v-col>
     



 
</template>
<script setup>
//************************** IMPORTS******************************************* */

import { ref, defineProps, onMounted } from "vue";


//************************** INITILISATION******************************************* */

const props = defineProps({
  reunionEnCours: {
    default: {},
    
  },conseillersMunicipaux:{
    default:[],
  }

});

console.log("props.reunionEnCours",props.reunionEnCours)
console.log("props.conseillersMunicipaux",props.conseillersMunicipaux)

const isProc = (idConseiller) =>{

  const result = props.reunionEnCours.procurations.find((proc) => proc.absent == idConseiller);
if (result) 
{
  if (result.recevant) return true
  return false
}
  return false
  
}
const isPresent = (idConseiller) =>{
  const result = props.reunionEnCours.procurations.find((proc) => proc.absent == idConseiller);
  if (result) return false
  return true



}
// ********************* règles pour les différens champs ************************ 
const rules = {
  required: (v) => !!v || "Obligatoire.",
  min: (v) => v.length >= 8 || "Min 8 caractères",

  emailValid: (v) =>
    (v.length > 0 && /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v)) ||
    "Cet email n'est pas valide",
  codePostalValid: (v) =>
    /^\d{5}$/.test(v) || "le code postal est composé de 5 chiffre",
};



//************************** SUBMIT DU FORMULAIRE ******************************************* */
const submitDeliberations = async () => {

  console.log("********************SUBMIT*****************************")
 
};

//------------------- une fois la page chargée

</script>

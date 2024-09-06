<template>
  <!-- ------------------------------- BOITE DE DIALOGUE POUR LA CREATION/MODIFICATION D'UN CONSEILLER ------------------------->

  <v-row>
    <v-col cols="12" md="4" class="border-md">
      <p class="text-center font-weight-bold">Présents</p>
    </v-col>
    <v-col cols="12" md="4" class="border-md">
      <p class="text-center font-weight-bold">Absents</p>
    </v-col>
    <v-col cols="12" md="4" class="border-md">
      <p class="text-center font-weight-bold">Procurations</p>
    </v-col>

    <v-col cols="12" md="4" class="border-md">
      <div v-for="conseiller in props.conseillersMunicipaux">
        <p v-if="isPresent(conseiller.id)" class="text-center">
          {{ conseiller.prenom }} {{ conseiller.nom }}, {{ conseiller.role }}
        </p>
      </div>
    </v-col>
    <v-col cols="12" md="4" class="border-md">
      <div v-for="conseiller in props.conseillersMunicipaux">
        <p v-if="!isPresent(conseiller.id)" class="text-center">
          {{ conseiller.prenom }} {{ conseiller.nom }}, {{ conseiller.role }}
        </p>
      </div>
    </v-col>
    <v-col cols="12" md="4" class="border-md">
      <div v-for="conseiller in props.conseillersMunicipaux">
        <p v-if="isProc(conseiller.id)" class="text-center">
          {{ conseiller.prenom }} {{ conseiller.nom }}, {{ conseiller.role }}
        </p>
      </div>
    </v-col>
  </v-row>

  <h2 class="text-center text-uppercase my-4">délibérations</h2>
  <v-form ref="formConseiller" @submit.prevent="submitDeliberations">
    <!-- RAJOUTER LE SECRETAIRE DE SEANCE 
    <v-select
            v-model="reunion.secretaire"
            :items="conseillersDataForSelect"
            label="Choisissez le secrétaire de séance"
            required
          ></v-select>-->
    <v-row>
      <v-col cols="12" md="2" class="border-md text-center font-weight-bold">
        Ordre
      </v-col>
      <v-col cols="12" md="4" class="border-md text-center font-weight-bold">
        texte délibération
      </v-col>
      <v-col cols="12" md="3" class="border-md text-center font-weight-bold">
        texte fin délibération
      </v-col>
      <v-col cols="12" md="2" class="border-md text-center font-weight-bold">
        Vote <br />
        Pour / Nul /Contre
      </v-col>
      <v-col cols="12" md="1" class="border-md text-center font-weight-bold">
        Approuvé
      </v-col>
    </v-row>

    <v-row
      v-for="(ordre, index) in reunionEnCours.ordres"
      cols="12"
      md="4"
      class="border-md"
    >
      <v-col cols="12" md="2" class="border-md">
        {{ ordre.ordre }}
      </v-col>
      <v-col cols="12" md="4" class="border-md">
        <v-textarea
          label="Texte délibération"
          v-model="ordre.text_deliberation"
          :rules="[rules.required]"
          variant="filled"
          auto-grow
        ></v-textarea>
      </v-col>
      <v-col cols="12" md="3" class="border-md">
        <v-textarea
          label="Texte fin délibération"
          v-model="ordre.text_fin_deliberation"
          variant="filled"
          auto-grow
        ></v-textarea>
      </v-col>
      <v-col cols="12" md="2" class="border-md text-center">
        <v-switch
          label="Il y a eu vote"
          color="primary"
          v-model="ordre.isVote"
        ></v-switch>

        <v-select
          v-if="ordre.isVote"
          label="Vote pour"
          v-model="ordre.nb_vote_pour"
          :items="
            itemVotant.slice(
              0,
              nbVotant - ordre.nb_vote_nul - ordre.nb_vote_contre + 1
            )
          "
        ></v-select>

        <v-select
          v-if="ordre.isVote"
          label="Vote nul"
          v-model="ordre.nb_vote_nul"
          :items="
            itemVotant.slice(
              0,
              nbVotant - ordre.nb_vote_pour - ordre.nb_vote_contre + 1
            )
          "
        ></v-select>

        <v-select
          v-if="ordre.isVote"
          label="Vote contre"
          v-model="ordre.nb_vote_contre"
          :items="
            itemVotant.slice(
              0,
              nbVotant - ordre.nb_vote_nul - ordre.nb_vote_pour + 1
            )
          "
        ></v-select>

        <v-chip
          color="red"
          v-if="
            ordre.nb_vote_contre + ordre.nb_vote_nul + ordre.nb_vote_pour !=
            nbVotant
          "
          >{{ ordre.nb_vote_pour }}+{{ ordre.nb_vote_nul }}+{{
            ordre.nb_vote_contre
          }}<>{{ nbVotant }}</v-chip
        >
      </v-col>
      <v-col cols="12" md="1" class="border-md text-center">
        <v-chip
          v-if="ordre.nb_vote_pour > ordre.nb_vote_contre && ordre.isVote"
          color="green"
          class="px-5 py-2 text-uppercase"
        >
          APPROUVé
        </v-chip>
        <v-chip
          v-if="ordre.nb_vote_pour < ordre.nb_vote_contre && ordre.isVote"
          color="red"
          class="px-5 py-2 text-uppercase"
        >
          rejeté
        </v-chip>
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
  </v-form>
</template>
<script setup>
//************************** IMPORTS******************************************* */

import { ref, defineProps, onMounted } from "vue";
import { useReunionConseilMunicipalStore } from "@/stores/reunionConseilMunicipal";
import { useOrdresDuJourStore } from "@/stores/ordresDuJour";

//************************** INITILISATION******************************************* */
const reunionConseilMunicipalStore = useReunionConseilMunicipalStore();
const ordresDuJourStore = useOrdresDuJourStore();

//const messageErreurTextDelib=[];
const messageErreurVote = [];

const props = defineProps({
  reunionEnCours: {
    default: {},
  },
  conseillersMunicipaux: {
    default: [],
  },
});

const test = () => {
  alert("oui");
};
const reunionEnCours = props.reunionEnCours;

console.log("reunionEnCours", reunionEnCours);
console.log("conseillersMunicipaux", props.conseillersMunicipaux);

let nbVotant = props.conseillersMunicipaux.length;
let nbPresent = props.conseillersMunicipaux.length;
reunionEnCours.procurations.forEach((proc) => {
  if (proc.absent) {
    nbPresent--;
    if (!proc.recevant) {
      nbVotant--;
    }
  }
});

reunionEnCours.ordres.forEach((ordre) => {
  ordre.isVote = true;
});

const itemVotant = [];
for (let i = 0; i < nbVotant + 1; i++) {
  itemVotant.push(i);
}

const isProc = (idConseiller) => {
  const result = reunionEnCours.procurations.find(
    (proc) => proc.absent == idConseiller
  );
  if (result) {
    if (result.recevant) return true;
    return false;
  }
  return false;
};

const isPresent = (idConseiller) => {
  const result = reunionEnCours.procurations.find(
    (proc) => proc.absent == idConseiller
  );
  if (result) return false;
  return true;
};

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
  await reunionEnCours.ordres.forEach(async (ordre, index) => {
    ordre.nb_present = nbPresent;
    ordre.nb_votant = nbVotant;
    ordre.nb_membres_en_exercice = props.conseillersMunicipaux.length;

    if (!(ordre.nb_vote_contre + ordre.nb_vote_pour + ordre.nb_vote_nul != nbVotant && ordre.isVote)) {
      console.log('je suis là')
      if (ordre.numero < 10) {
        ordre.num_delib =
          reunionEnCours.date.substr(6) +
          "-" +
          reunionEnCours.date.substr(3, 2) +
          "-0" +
          ordre.numero;
      } else {
        ordre.num_delib =
          reunionEnCours.date.substr(6) +
          "-" +
          reunionEnCours.date.substr(3, 2) +
          "-" +
          ordre.numero;
      }
      console.log('je suis ici',ordre)
      await ordresDuJourStore.update(ordre);
    }else{
      console.log('je ne suis pas là ou je devrait')
      console.log(ordre.nb_vote_contre+ordre.nb_vote_pour + ordre.nb_vote_nul)
      console.log(nbVotant)
      console.log(ordre.nb_vote_contre + ordre.nb_vote_pour + ordre.nb_vote_nul != nbVotant)
      console.log(ordre.isVote)
      console.log((ordre.nb_vote_contre + ordre.nb_vote_pour + ordre.nb_vote_nul != nbVotant && ordre.isVote))
    }
  });

  //await ordresDuJourStore.update(reunionEnCours.ordres)
};

//------------------- une fois la page chargée
</script>

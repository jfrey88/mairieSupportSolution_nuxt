<template>
  <!-- ------------------------------- BOITE DE DIALOGUE POUR LA CREATION/MODIFICATION D'UN CONSEILLER ------------------------->
  <v-form ref="formReunion" @submit.prevent="submitReunion">
    <v-container>
      <v-row>
        <v-col cols="12" md="12"><h3>Nouvelle réunion</h3></v-col>

        <v-col cols="12" md="6">
          <!--      champ date    -->
          <v-text-field
            v-model="reunion.date"
            :counter="10"
            label="date de la seance"
            required
          ></v-text-field>
        </v-col>

        <v-col cols="12" md="6">
          <!--      champ heure    -->
          <v-text-field
            v-model="reunion.heure"
            :counter="5"
            label="heure de la seance"
            required
          ></v-text-field>
        </v-col>

        <v-col cols="12" md="12">
          <!--      champ texteOuverture    -->
          <v-textarea
            v-model="reunion.ordreDuJour"
            label="Ordre du jour"
            rows="10"
          ></v-textarea>
        </v-col>
      </v-row>
      <v-row> </v-row>
      <!-- ---------------- Si c'est une création de réunion ----------------    -->
      <v-row v-if="!reunionData || !reunionData.heure">
        <v-col cols="12" md="6">
          <v-btn
            class="mt-2"
            type="submit"
            block
            color="orange-darken-4"
            prepend-icon="mdi-content-save-edit"
            >Ajouter la réunion
          </v-btn>
        </v-col>
      </v-row>

      <!-- ---------------- Si c'est une modification de réunion ----------------    -->
      <v-row v-else>
        <v-col cols="12" md="6">
          <v-btn
            class="mt-2"
            type="submit"
            block
            color="orange-darken-4"
            prepend-icon="mdi-content-save-edit"
            >Modifier la réunion
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>
<script setup>
//************************** IMPORTS******************************************* */
import { useMairieStore } from "@/stores/mairie";
import { useReunionConseilMunicipalStore } from "@/stores/reunionConseilMunicipal";
import { useOrdresDuJourStore } from "@/stores/ordresDuJour";
import { ref, defineProps, onMounted } from "vue";

//************************** INITILISATION******************************************* */

const props = defineProps({
  userData: {
    default: {},
  },
  reunionData: {
    default: {},
  },
});

// ********************* règles pour les différens champs ************************

const mairie = ref({});

const mairieStore = useMairieStore();
const reunionStore = useReunionConseilMunicipalStore();
const ordresDuJourStore = useOrdresDuJourStore();
const formReunion = ref(null);

const emit = defineEmits(["update:modelValue"]);

const reunion = ref({
  date: "",
  heure: "",
  isConvocationOk: false,
  isFeuillePresenceOk: false,
  isProcesVerbalOk: false,
  isTransmisPrefecture: false,
});

// ********************* règles pour les différens champs ************************

//************************** SUBMIT DU FORMULAIRE ******************************************* */
const submitReunion = async () => {

  // on valide les réponses données
  // const { valid } = await formConseiller.value.validate();
  // if (!valid) return; // si ce n'est pas valide on quitte le submit
  const tabOrdreDuJour = reunion.value.ordreDuJour.split("\n");

  delete reunion.value.ordreDuJour;
  reunion.value.representant_uid = props.userData.value.uid;

  const result = await reunionStore.create(reunion.value);
  const idReunion = result.id;

  tabOrdreDuJour.forEach(async (ordre, index) => {
    const ordreAEcrire = {
      ordre: ordre,
      numero: index,
      id_reunion: idReunion,
      nb_membres_en_exercice: 0,
      nb_presents: 0,
      nb_votant: 0,
      nb_vote_pour: 0,
      nb_vote_contre: 0,
      nb_vote_nul: 0,
      text_deliberation: "",
      text_fin_deliberation: "",
      num_delib: "0000-00-00",
    };
    await ordresDuJourStore.create(ordreAEcrire);
  });
  // on récupère l'uid du user et on le mets dans le l'objet conseiller
  reunion.value.representant_uid = props.userData.uid;

  emit("update:modelValue");
};

//------------------- une fois la page chargée
onMounted(async () => {

  // si c'est une création je charge les valeurs de la commune
  if (!props.reunionData) {
    mairie.value = await mairieStore.fetch([
      "representant_uid",
      props.userData.uid,
    ]);

    // si ce n'est pas une création je charge les valeurs du conseiller
  }
});
//mairieStore.create(mairieTest);
</script>

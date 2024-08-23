<template>
  <!-- ------------------------------- BOITE DE DIALOGUE POUR LA CREATION/MODIFICATION D'UN CONSEILLER ------------------------->
  <v-form ref="formConseiller" @submit.prevent="submitConseiller">
    <v-container>
      <v-row>
        <v-col cols="12" md="12"><h3>Nouveau conseiller</h3></v-col>

        <v-col cols="12" md="6"> <!--      champ nom    -->
          <v-text-field
            v-model="conseiller.nom"
            :counter="5"
            label="nom du conseiller"
            required
          ></v-text-field>
        </v-col>

        <v-col cols="12" md="6"> <!--      champ prenom    -->
          <v-text-field
            v-model="conseiller.prenom"
            :counter="5"
            label="prénom du conseiller"
            required
          ></v-text-field>
        </v-col>

        <v-col cols="12" md="6"><!--      champ email    -->
          <v-text-field
            v-model="conseiller.email"
            :counter="50"
            :rules="[rules.emailValid]"
            label="Email du conseiller"
          ></v-text-field>
        </v-col>

        <v-col cols="12" md="6"> <!--      champ telephone    -->
          <v-text-field
            v-model="conseiller.telephone"
            :counter="30"
            label="Téléphone du conseiller"
          ></v-text-field>
        </v-col>

        <v-col cols="12" md="6"><!--      champ code postal    -->
          <v-text-field
            v-model="conseiller.codePostal"
            :counter="5"
            :rules="[rules.codePostalValid]"
            label="Code postal de la ville"
            hint="composé de 5 chiffres"
          ></v-text-field>
        </v-col>

        <v-col cols="12" md="6"> <!--      champ ville    -->
          <v-text-field
            v-model="conseiller.ville"
            :counter="30"
            label="Nom de la commune"
          ></v-text-field>
        </v-col>

        <v-col cols="12" md="12"><!--      champ adresse    -->
          <v-text-field
            v-model="conseiller.adresse"
            :counter="30"
            label="Adresse du conseiller"
          ></v-text-field>
        </v-col>

        <v-col cols="12" md="6"><!--      champ role    -->
          <v-select
            v-model="conseiller.role"
            :items="[
              'Conseiller',
              'Conseillère',
              'Maire',
              '1er Adjoint',
              '1er Adjointe',
              '2eme Adjoint',
              '2eme Adjointe',
              '3eme Adjoint',
              '3eme Adjointe',
              '4eme Adjoint',
              '4eme Adjointe',
              '5eme Adjoint',
              '5eme Adjointe',
            ]"
            label="Role du conseiller"
            required
          ></v-select>
        </v-col>

      </v-row>

       <!-- ---------------- Si c'est une création de conseiller ----------------    -->
      <v-row v-if="!conseillerData || !conseillerData.nom">
        <v-col cols="12" md="12">
          <v-btn
            class="mt-2"
            type="submit"
            block
            color="orange-darken-4"
            prepend-icon="mdi-content-save-edit"
            >Enregistrer le conseiller
          </v-btn>
        </v-col>
      </v-row>

       <!-- ---------------- Si c'est une modification de conseiller ----------------    -->
       <v-row v-else>
        <v-col cols="12" md="12">
          <v-btn
            class="mt-2"
            type="submit"
            block
            color="orange-darken-4"
            prepend-icon="mdi-content-save-edit"
            >Modifier le conseiller
          </v-btn>
        </v-col>
      </v-row>

    </v-container>
  </v-form>
</template>
<script setup>
//************************** IMPORTS******************************************* */
import { useMairieStore } from "@/stores/mairie";
import { useConseillerMunicipalStore } from "@/stores/conseillerMunicipal";
import { ref, defineProps, onMounted } from "vue";


//************************** INITILISATION******************************************* */

const props = defineProps({
  mairieData: {
    default: {},
  },
  conseillerData: {
    default: {},
  }
});


const mairie = ref({});

const mairieStore = useMairieStore();
const conseillerMunicipalStore = useConseillerMunicipalStore();
const formConseiller = ref(null);



const conseiller = ref({
  nom: "",
  prenom: "",
  email: "",
  telephone: "",
  codePostal: "",
  role: "",
  ville: "",
  adresse: "",
  representant_uid : "",
});


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
const submitConseiller = async () => {

  // on valide les réponses données
  const { valid } = await formConseiller.value.validate();
  if (!valid) return; // si ce n'est pas valide on quitte le submit


  
  conseiller.value.representant_uid=props.mairieData.value.uid
  

// on récupère l'auth depuis Firebase
  
  //----------------- Si c'est une création de conseiller ---------------------------
  if (!props.conseillerData || !props.conseillerData.nom) {
    delete conseiller.value.id;
    await conseillerMunicipalStore.create(conseiller.value);
   // window.location.reload();

  //---------------- Si c'est une modification de conseiller ------------------------
  } else {
  

    const id=conseiller.value.id;

    delete conseiller.value.id
    conseiller.value.representant_uid=props.mairieData.value.uid
  
    await conseillerMunicipalStore.update(conseiller.value,id);

    //------------------ rechargement de la page ou astuce pour voir les mises à jour
   // window.location.reload();
  }
  
};

//------------------- une fois la page chargée
onMounted(async () => {

  // si c'est une création je charge les valeurs de la commune
  if (!props.conseillerData) {
    mairie.value = await mairieStore.fetch([
      "representant_uid",
      props.mairieData.uid,
    ]);
    
    conseiller.value.codePostal = mairie.value.codePostal;
    conseiller.value.ville = mairie.value.ville;

  // si ce n'est pas une création je charge les valeurs du conseiller
} else {

    conseiller.value.codePostal = props.conseillerData.codePostal;
    conseiller.value.nom = props.conseillerData.nom,
      conseiller.value.prenom = props.conseillerData.prenom,
      conseiller.value.email = props.conseillerData.email,
      conseiller.value.telephone = props.conseillerData.telephone,
      conseiller.value.role = props.conseillerData.role,
      conseiller.value.ville = props.conseillerData.ville,
      conseiller.value.adresse = props.conseillerData.adresse;
      conseiller.value.id = props.conseillerData.id;
      conseiller.value.representant_uid = props.mairieData.value.uid;

      
      console.log("props.mairieData.value.uid",props.mairieData.value.uid)
      console.log("------------------- conseiller dans creation conseiller -------------------")
      console.log(conseiller.value)
      
  }
});
//mairieStore.create(mairieTest);
</script>

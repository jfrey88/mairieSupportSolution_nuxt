<template>
  <!-- ------------------------------- BOITE DE DIALOGUE POUR LA CREATION/MODIFICATION D'UN CONSEILLER ------------------------->
  <v-form ref="formConseiller" @submit.prevent="submitProcuration">
    <v-container>
      <v-row>
        <v-col cols="12" md="12"><h3>Nouvelle Absence/procuration</h3></v-col>

      
     
        <v-col cols="12" md="12">
          <v-btn
            class="mt-2"
            type="submit"
            block
            color="orange-darken-4"
            prepend-icon="mdi-content-save-edit"
            >Ajout l'Absence/Procuration
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
  userData:{
    default:{}
  },
  conseillerData: {
    default: {},
  }
});


const mairie = ref({});

const mairieStore = useMairieStore();
const conseillerMunicipalStore = useConseillerMunicipalStore();
const formConseiller = ref(null);

console.log('je passe par Form.CreationProcuration.vue');
const emit = defineEmits(["update:modelValue"])




//************************** SUBMIT DU FORMULAIRE ******************************************* */
const submitProcuration = async () => {

 


  
  

};

//------------------- une fois la page chargée
onMounted(async () => {

  useNuxtApp().$myLogger(userData, 'userData',"FormCreationProcuration")
  useNuxtApp().$myLogger(mairieData, 'mairieData',"FormCreationProcuration")
  useNuxtApp().$myLogger(reunionData, 'reunionData',"FormCreationProcuration")




      
    
      
  
});
//mairieStore.create(mairieTest);
</script>

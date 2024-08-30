<template>
  <!-- ------------------------------- BOITE DE DIALOGUE POUR LA CREATION/MODIFICATION D'UN CONSEILLER ------------------------->
  <v-form ref="formConseiller" @submit.prevent="submitProcuration">
    <v-container>
      <v-row>
        <v-col cols="12" md="12"><h3>Nouvelle Absence/procuration</h3></v-col>

        <v-select
            v-model="procuration.absent"
            :items="conseillersDataForSelect"
            label="Choisissez le conseiller absent"
            required
          ></v-select>
          <v-select
            v-model="procuration.recevant"
            :items="conseillersDataForSelect"
            label="Choisissez le conseiller qui reçoit la procuration"
            required
          ></v-select>

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
import { useProcurationStore } from "@/stores/procuration";
import { ref, defineProps, onMounted } from "vue";


const props = defineProps({

  reunionData: {
    default: {},
  }
});


const procuration = ref({
  absent : "",
  recevant : "",
  idReunion : props.reunionData.id,
})

const conseillerMunicipalStore = useConseillerMunicipalStore();
const {formatForSelect: conseillersDataForSelect} = storeToRefs(conseillerMunicipalStore);

const procurationStore=useProcurationStore();

const emit = defineEmits(["update:modelValue"])
//************************** INITILISATION******************************************* */


const submitProcuration = async () => {

  procurationStore.create(procuration.value)
  emit("update:modelValue");
}
//mairieStore.create(mairieTest);
</script>

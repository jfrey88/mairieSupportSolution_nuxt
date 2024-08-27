<template>
<v-dialog max-width="800">
  <template v-slot:activator="{ props: activatorProps }">
    <v-btn
      density="compact"
      v-bind="activatorProps"
      icon="mdi-pencil"
      class="ml-2"
    ></v-btn>
  </template>

  <template v-slot:default="{ isActive }">
    <v-card title="Modification d'un conseiller">
      <v-card-text>
        <FormCreationConseiller
          :mairieData="props.mairieData"
          :conseillerData="props.conseillerData"
           @update:modelValue = "isActive.value = false"
          
        />
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>

        <v-btn
          text="Annuler"
          @click="isActive.value = false"
        ></v-btn>
      </v-card-actions>
    </v-card>
  </template>
</v-dialog>
</template>
<script setup>
import { defineProps } from "vue";
const props = defineProps({
  
  mairieData: {
    default: {},
  },
  conseillerData:{
    default:{}
  }
});



</script>

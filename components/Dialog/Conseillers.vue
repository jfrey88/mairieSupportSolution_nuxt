<template>
  <v-dialog max-width="800">
   
    <template v-slot:default="{ isActive }">
      <v-card title="Ajout d'un conseiller">
        <v-card-text>
          <FormCreationConseiller
            :mairieData="props.mairieData"
            :userData="props.userData"
            @update:modelValue="isActive.value = false"
          />
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn text="Annuler" @click="isActive.value = false"></v-btn>
        </v-card-actions>
      </v-card>
    </template>
  </v-dialog>
</template>
<script setup>
import { defineProps } from "vue";
const props = defineProps({
  userData: {
    default: {},
  },
  mairieData: {
    default: {},
  },
});
</script>

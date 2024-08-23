<template>
  <v-dialog max-width="800">
    <template v-slot:activator="{ props: activatorProps }">
      <v-btn
        v-bind="activatorProps"
        color="orange-darken-4"
        prepend-icon="mdi-plus"
        text="Ajouter un conseiller"
      ></v-btn>
    </template>

    <template v-slot:default="{ isActive }">
      <v-card title="Ajout d'un conseiller">
        <v-card-text>
          <FormCreationConseiller 
          :mairieData="props.userData" 
          @update:modelValue = "isActive.value = false"
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
import { defineProps} from "vue";
const props = defineProps({

  userData: {
    default: {},
  },

});


</script>

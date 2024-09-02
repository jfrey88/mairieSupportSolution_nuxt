<!-- ************************ BOITE DE DIALOGUE POUR LA MODIFICATION D'UNE MAIRIE *********************-->
<template>
  <v-dialog max-width="800">
    <template v-slot:default="{ isActive }">
      <v-card :title="title">
        <v-card-text>
          <FormCreationMairie @update:modelValue="isActive.value = false" />
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
  isCreate: Boolean,
});
const title = computed(() =>
  props.isCreate ? "Créer une mairie" : "Modifier une mairie"
);
</script>

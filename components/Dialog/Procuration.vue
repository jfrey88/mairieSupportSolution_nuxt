<template>
  <v-dialog max-width="800">
    <template v-slot:activator="{ props: activatorProps }">
      <v-btn class="my-4" color="blue-lighten-4"
        >ajouter une <br />absence/procuration
      </v-btn>
    </template>

    <template v-slot:default="{ isActive }">
      <v-card title="Ajout d'une absence ou d'une procuration">
        <v-card-text> un petit texte </v-card-text>

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
  reunionData: {
    default: {},
  },
});

console.log("je passe par Dialog.Procuration.vue");
</script>

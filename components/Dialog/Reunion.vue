<template>
    <v-dialog max-width="800">
                <template v-slot:activator="{ props: activatorProps }">
                  <v-btn
                    v-bind="activatorProps"
                    color="orange-darken-4"
                    prepend-icon="mdi-plus"
                    text="Ajouter une réunion"
                    
                    class="mt-6"
                  ></v-btn>
                </template>

                <template v-slot:default="{ isActive }">
                  <v-card title="Ajout d'une réunion">
                    <v-card-text>
                      <FormCreationReunion 
                      :mairieData="props.mairieData" 
                      
                      />
                    </v-card-text>

                    <v-card-actions>
                      <v-spacer></v-spacer>

                      <v-btn
                        text="Annuler"
                        
                      ></v-btn>
                    </v-card-actions>
                  </v-card>
                </template>
              </v-dialog>
</template>
<script setup>
import { defineProps} from "vue";
const props = defineProps({
  mairieData: {
    default: {},
  },
 
});

useNuxtApp().$myLogger(props.mairieData,"props.mairieData","DialogReunion.vue")
</script>

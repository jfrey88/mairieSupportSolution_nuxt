<template>
    <v-dialog max-width="800">


                <template v-slot:default="{ isActive }">
                  <v-card title="Ajout d'une réunion">
                    <v-card-text>
                      <FormCreationReunion 
                      :mairieData="mairieData" 
                      
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

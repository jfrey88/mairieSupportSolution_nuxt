<!-- ************************ BOITE DE DIALOGUE POUR LA MODIFICATION D'UNE REUNION *********************-->
<template>
    <v-dialog max-width="800" v-model="dialogStatus">
                <template v-slot:activator="{ props: activatorProps }">
                  <v-btn
                    v-if="!reunionData.isTransmisPrefecture"
                      v-bind="activatorProps"
                    density="compact"
                    icon="mdi-pencil"
                    class="ma-2"
                     @click="dialogStatus = !dialogStatus"
                  ></v-btn>
                </template>

                <template v-slot:default="{ isActive }">
                  <v-card title="Ajout d'une réunion">
                    <v-card-text>
                      <FormCreationReunion 
                      :mairieData="props.mairieData"
                      :reunionData="props.reunionData"
                     
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
import { defineProps} from "vue";
const props = defineProps({
  
  mairieData: {
    default: {},
  },
  reunionData:{
    default:{}
  }
});

const dialogStatus=ref(false);



</script>

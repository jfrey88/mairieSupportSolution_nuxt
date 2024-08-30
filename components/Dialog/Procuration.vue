<template>
  <v-dialog max-width="800">

    <template v-slot:default="{ isActive }">
      <v-card title="Ajout d'une absence ou d'une procuration">
        <v-card-text> 
          <FormCreationProcuration
            :reunionData="props.reunionData"
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
    isCreate: Boolean,
    reunionData: {
    default: {},
  },
  });


</script>

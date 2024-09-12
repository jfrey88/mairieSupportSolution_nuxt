<template>
  <v-dialog max-width="800">

    <template v-slot:default="{ isActive }">
      <v-card title="Voulez vous vraiment supprimer cette réunion ?">
  
        <v-card-actions>
  
          <v-btn text="Non" @click="emit('update:modelValue', false)"></v-btn>
          <v-btn text="Oui" @click="deleteReunion(reunionData)"></v-btn>
          
        </v-card-actions>
      </v-card>
    </template>
  </v-dialog>
</template>
<script setup>
import { defineProps} from "vue";
import { useReunionConseilMunicipalStore } from "@/stores/reunionConseilMunicipal";
  const props = defineProps({
    isCreate: Boolean,
    reunionData: {
    default: {},
  },
  });
  const emit = defineEmits(["update:modelValue"]);
  const deleteReunion = async (reunion) => {
      console.log(props)
    const reunionConseilMunicipalStore = useReunionConseilMunicipalStore();
  // await reunionConseilMunicipalStore.delete(reunion);

  emit("update:modelValue", false);
};


</script>

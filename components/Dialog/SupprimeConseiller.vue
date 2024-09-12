<template>
  <v-dialog max-width="800">

    <template v-slot:default="{ isActive }">
      <v-card title="Voulez vous vraiment supprimer ce conseiller ?">
  
        <v-card-actions>
  
          <v-btn text="Non" @click="emit('update:modelValue', false)"></v-btn>
          <v-btn text="Oui" @click="deleteConseiller(conseillerData)"></v-btn>
          
        </v-card-actions>
      </v-card>
    </template>
  </v-dialog>
</template>
<script setup>
import { defineProps} from "vue";
import { useConseillerMunicipalStore } from "@/stores/conseillerMunicipal";
  const props = defineProps({
    isCreate: Boolean,
    conseillerData: {
    default: {},
  },
  });
  console.log("props.conseillerData",props.conseillerData.value);
  const emit = defineEmits(["update:modelValue"]);
  const deleteConseiller = async (conseiller) => {
      
    const conseillerMunicipalStore = useConseillerMunicipalStore();
  // await reunionConseilMunicipalStore.delete(reunion);
    conseillerMunicipalStore.delete(conseiller);

    emit("update:modelValue", false);
  };


</script>

<template>
  <!-- ************************ BOITE DE DIALOGUE POUR L'AFFICHAGE D'UN CONSEILLER *********************-->
  <v-dialog max-width="400">
    <template v-slot:activator="{ props: activatorProps }">
      <v-btn
        density="compact"
        v-bind="activatorProps"
        icon="mdi-eye"
        class="ma-2"
      ></v-btn>
    </template>

    <template v-slot:default="{ isActive }">
      <v-card title="Informations sur un conseiller">
        <v-card-text> </v-card-text>
       
        <p class="ml-4"><b>Nom :</b> {{ conseiller.nom }}</p>
        <p class="ml-4"><b>Prénom :</b> {{ conseiller.prenom }}</p>
        <p class="ml-4"><b>Rôle :</b> {{ conseiller.role }}</p>
        <p class="ml-4"><b>Email :</b> {{ conseiller.email }}</p>
        <p class="ml-4"><b>Téléphone :</b> {{ conseiller.telephone }}</p>
        <p class="ml-4"><b>Ville :</b> {{ conseiller.ville }}</p>
        <p class="ml-4"><b>Code postal :</b> {{ conseiller.codePostal }}</p>
        <p class="ml-4"><b>Adresse :</b> {{ conseiller.adresse }}</p>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn text="Annuler" @click="isActive.value = false"></v-btn>
        </v-card-actions>
      </v-card>
    </template>
  </v-dialog>
</template>
<script setup>
//************************** IMPORTS******************************************* */
import { useMairieStore } from "@/stores/mairie";

import { ref, defineProps, onMounted } from "vue";


//************************** INITILISATION******************************************* */

const props = defineProps({
  mairieData: {
    default: {},
  },
  conseillerData: {
    default: {},
  }
});

const mairie = ref({});

const mairieStore = useMairieStore();




const conseiller = ref({
  nom: "",
  prenom: "",
  email: "",
  telephone: "",
  codePostal: "",
  role: "",
  ville: "",
  adresse: "",
});



//------------------- une fois la page chargée
onMounted(async () => {

  // si c'est une création je charge les valeurs de la commune
  if (!props.conseillerData) {
    mairie.value = await mairieStore.fetch([
      "representant_uid",
      props.mairieData.uid,
    ]);
    
    conseiller.value.codePostal = mairie.value.codePostal;
    conseiller.value.ville = mairie.value.ville;

  // si ce n'est pas une création je charge les valeurs du conseiller
} else {
    conseiller.value.codePostal = props.conseillerData.codePostal;
    (conseiller.value.nom = props.conseillerData.nom),
      (conseiller.value.prenom = props.conseillerData.prenom),
      (conseiller.value.email = props.conseillerData.email),
      (conseiller.value.telephone = props.conseillerData.telephone),
      (conseiller.value.role = props.conseillerData.role),
      (conseiller.value.ville = props.conseillerData.ville),
      (conseiller.value.adresse = props.conseillerData.adresse);
      (conseiller.value.id = props.conseillerData.id);
  }
});
</script>
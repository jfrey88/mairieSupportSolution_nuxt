<template>
                <v-table class="border-md" height="300px">
                  <thead>
                    <tr>
                      <th
                        class="text-left bg-lime-lighten-5 text-uppercase font-weight-bold border-sm"
                      >
                        Nom
                      </th>
                      <th
                        class="text-left bg-lime-lighten-5 text-uppercase font-weight-bold border-sm"
                      >
                        Prénom
                      </th>
                      <th
                        class="text-left bg-lime-lighten-5 text-uppercase font-weight-bold border-sm"
                      >
                        Rôle
                      </th>
                      <th
                        class="text-left bg-lime-lighten-5 text-uppercase font-weight-bold border-sm"
                      >
                        Téléphone
                      </th>
                      <th
                        class="text-left bg-lime-lighten-5 text-uppercase font-weight-bold border-sm"
                      >
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr
                      v-for="conseiller in conseillerMunicipalStore.conseillers"
                      :key="conseiller.nom"
                    >
                      <!--  boucle sur les conseillers-->
                      <td class="text-left border-sm">{{ conseiller.nom }}</td>
                      <td class="text-left border-sm">{{ conseiller.prenom }}</td>
                      <td class="text-left border-sm">{{ conseiller.role }}</td>
                      <td class="text-left border-sm">
                        {{ conseiller.telephone }}
                      </td>
                      <td class="text-left border-sm">
                        <!-- ---------------- BOITE DE DIALOGUE VOIR CONSEILLER  --------------------------->
                        <DialogVoirConseiller
                          :mairieData="user"
                          :conseillerData="conseiller"
                        />
                        <!-- ---------------- FIN BOITE DE DIALOGUE VOIR CONSEILLER  --------------------------->
  
                        <!-- ---------------- BOITE DE DIALOGUE MODIFIER CONSEILLER  --------------------------->
                        <DialogModificationConseillers
                          :mairieData="user"
                          :conseillerData="conseiller"
                        />
  
                        <!-- ---------------- FIN BOITE DE DIALOGUE MODIFIER CONSEILLER  --------------------------->
  
                        <!-- ---------------- BOUTON SUPPRIMER CONSEILLER  --------------------------->
                        <v-btn
                          density="compact"
                          icon="mdi-delete"
                          @click="deleteConseiller(conseiller)"
                          class="ma-2"
                        ></v-btn>
                      </td>
                    </tr>
                  </tbody>
                </v-table>
    <DialogSupprimeConseiller 
      v-model="dialogStatusSupprimeConseiller" 
      :conseillerData="dialogConseiller"
      @update:model-value="dialogStatusSupprimeConseiller = false" /> 
</template>
<script setup>
  import { useConseillerMunicipalStore } from "@/stores/conseillerMunicipal";

defineProps(["conseillers", "user"]);

const dialogStatusSupprimeConseiller = ref(false);
const dialogConseiller = ref({});

const conseillerMunicipalStore = useConseillerMunicipalStore();
  // function pour supprimer un conseiller municipal



/** ******************** fonction pour supprimer une reunion **********/
const deleteConseiller = async (conseiller) => {
  console.log("conseiller dans delete conseiller",conseiller)
  dialogConseiller.value = conseiller;
  console.log("dialogConseiller.value dans delete conseiller",dialogConseiller.value)
  dialogStatusSupprimeConseiller.value = !dialogStatusSupprimeConseiller.value;


;
  //await reunionConseilMunicipalStore.delete(reunion);
};
</script>
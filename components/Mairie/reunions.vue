<template>
  <v-table class="border-md">
              <thead>
                <tr>
                  <th
                    class="text-center border-sm bg-lime-lighten-5 text-uppercase font-weight-bold"
                  >
                    Date
                  </th>
                  <th
                    class="text-center border-sm bg-lime-lighten-5 text-uppercase font-weight-bold"
                  >
                    Ordre du jour
                  </th>
                  <th
                    class="text-center border-sm bg-lime-lighten-5 text-uppercase font-weight-bold"
                  >
                    convocation
                  </th>
                  <th
                    class="text-center border-sm bg-lime-lighten-5 text-uppercase font-weight-bold"
                  >
                    feuille présence
                  </th>
                  <th
                    class="text-center border-sm bg-lime-lighten-5 text-uppercase font-weight-bold"
                  >
                    Procès verbal
                  </th>
                  <th
                    class="text-center border-sm bg-lime-lighten-5 text-uppercase font-weight-bold"
                  >
                    Extrait registre
                  </th>
                  <th
                    class="text-center border-sm bg-lime-lighten-5 text-uppercase font-weight-bold"
                  >
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="reunion in reunions" :key="reunion.date">
                  <!--  boucle sur les conseillers v-html="reunion.ordres"-->
                  <td class="text-center border-sm">{{ reunion.date }}</td>
                  <td class="text-left border-sm">
                    <v-list>
                      <v-list-item v-for="ordre in ordres[reunion.id]" :key="ordre.id">
                        {{ ordre }}
                      </v-list-item>
                    </v-list>
                
                  </td>
                  <td style="vertical-align: middle" class="border-sm">
                    <v-btn class="my-4"
                      color="blue-lighten-4"
                      :to="`/convocation/${reunion.id}`"
                     >
                        
                        créer
                    </v-btn>
                  </td>
                  <td style="vertical-align: middle" class="border-sm text-center">
                    <div v-if="reunion.isConvocationOk">
                      <v-btn class="my-4" color="blue-lighten-4">imprimer</v-btn><br />
                      <v-btn class="my-4" color="blue-lighten-4"
                        >ajouter une <br />absence/procuration</v-btn
                      ><br />
                      <v-btn class="my-4" color="blue-lighten-4"
                        >modifier une <br />absence/procuration</v-btn
                      ><br />
                    </div>
                  </td>
                  <td style="vertical-align: middle" class="border-sm">
                    <div v-if="reunion.isFeuillePresenceOk">
                      <v-btn class="my-4">Délibérations</v-btn><br />
                      <v-btn class="my-4"
                        >Générer imprimer <br />procès verbal </v-btn
                      ><br />
                      <v-btn class="my-4">transmis prefecture</v-btn><br />
                    </div>
                  </td>
                  <td style="vertical-align: middle" class="border-sm">
                    <div v-if="reunion.isProcesVerbalOk">
                      <v-btn class="my-4">Imprimer</v-btn><br />
                    </div>
                  </td>
                  <td style="vertical-align: middle" class="border-sm">
                    <!-- ---------------- BOITE DE DIALOGUE MODIFIER REUNION  --------------------------->
                    <DialogModificationReunions
                      :userData="user"
                      :reunionData="reunion"
                    />
                    <v-btn
                      v-if="!reunion.isTransmisPrefecture"
                      density="compact"
                      @click="deleteReunion(reunion)"
                      icon="mdi-delete"
                      class="ml-2"
                    ></v-btn>
                  </td>
                </tr>
              </tbody>
            </v-table>
</template>
<script setup>
import { useReunionConseilMunicipalStore } from "@/stores/reunionConseilMunicipal";
import { useOrdresDuJourStore } from "@/stores/ordresDuJour";
const reunionConseilMunicipal = useReunionConseilMunicipalStore();
const ordresDuJour = useOrdresDuJourStore();

const props = defineProps({
  mairie: Object,
  user: Object,
});

const reunions = ref([]);
const ordres = ref({});
const fetchReunions = async () => {
  const reunionsData = await reunionConseilMunicipal.fetch(["representant_uid", props.mairie.representant_uid]);
  reunions.value = reunionsData;
  reunionsData.forEach((reunion) => {
    fetchOrdres(reunion);
  });
  return reunionsData;
};

onMounted(() => {
  fetchReunions();
});

 const fetchOrdres = async(reunion) =>{
    const ordresData =  await ordresDuJour.fetch(["id_reunion", reunion.id]);
    // reunion.ordres = ordres;
    ordres.value[reunion.id] = ordresData;
    return ordres;
  }
</script>
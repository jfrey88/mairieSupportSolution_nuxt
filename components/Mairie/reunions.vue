<template>
  <div>
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
            procuration / absence
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
        <tr v-for="reunion in reunionConseilMunicipalStore.$state.reunions" :key="reunion.date">
          <!--  boucle sur les conseillers v-html="reunion.ordres"-->

          <!------------------ Date ------------------------------->
          <td class="text-center border-sm">{{ dateText(reunion.date) }}</td>

          <!------------------ Ordre du jour ------------------------------->
          <td class="text-left border-sm">
            <v-list>
              <v-list-item>
                {{ test(reunion,reunion.ordres) }}
              </v-list-item>
              <v-list-item v-for="ordre in reunion.ordres" :key="ordre.id">
                {{ ordre.numero }}. {{ ordre.ordre }}.{{ test(reunion,ordre) }}
              </v-list-item>
            </v-list>
          </td>

          <!------------------ Convocation ------------------------------->
          <td style="vertical-align: middle" class="border-sm">
            <v-btn
              class="my-4"
              color="blue-lighten-4"
              :to="`/convocation/${reunion.id}`"
            >
              créer
            </v-btn>
          </td>

          <!------------------ Procuration ------------------------------->
          <td style="vertical-align: middle" class="border-sm text-center">
            <div
              v-for="procuration in procurations[reunion.id]"
              :key="procuration.id"
              
            >
              <div  v-if="procuration.prenomNomRecevant" class="border-sm text-center my-2 mx-2 rounded-sm elevation-2 bg-green-lighten-5 " >
                <p> {{ procuration.prenomNomAbsent }} <br />donne procuration à <br />{{ procuration.prenomNomRecevant }}</p>
                <v-btn
                  v-if="!reunion.isTransmisPrefecture"
                  density="compact"
                  @click="deleteProcuration(procuration)"
                  icon="mdi-delete"
                  class="ma-2"
                ></v-btn>
              </div>
              <div v-else class="border-sm text-center my-2 mx-2 rounded-sm elevation-2 bg-pink-lighten-5">
                <p > {{ procuration.prenomNomAbsent }} <br /> sera absent(e) </p>
                <v-btn
                  v-if="!reunion.isTransmisPrefecture"
                  density="compact"
                  @click="deleteProcuration(procuration)"
                  icon="mdi-delete"
                  class="ma-2"
                ></v-btn>
              </div>
              
              
              
            </div>
            <div v-if="reunion.isConvocationOk">
              <v-btn
                class="my-4"
                color="blue-lighten-4"
                @click="createProcuration(reunion)"
                >ajouter une <br />absence/procuration
              </v-btn>
            </div>
          </td>

          <!------------------ Feuille de presence ------------------------------->
          <td style="vertical-align: middle" class="border-sm text-center">
            <div v-if="reunion.isConvocationOk">
              <v-btn class="my-4" color="blue-lighten-4">imprimer</v-btn><br />
            </div>
          </td>

          <!------------------ Procès verbal ------------------------------->
          <td style="vertical-align: middle" class="border-sm">
            <div v-if="reunion.isFeuillePresenceOk">
              <v-btn class="my-4">Délibérations</v-btn><br />
              <v-btn class="my-4">Générer imprimer <br />procès verbal </v-btn
              ><br />
              <v-btn class="my-4">transmis prefecture</v-btn><br />
            </div>
          </td>

          <!------------------ Extrait registre ------------------------------->
          <td style="vertical-align: middle" class="border-sm">
            <div v-if="reunion.isProcesVerbalOk">
              <v-btn class="my-4">Imprimer</v-btn><br />
            </div>
          </td>

          <!------------------ Actions ------------------------------->
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
              class="ma-2"
            ></v-btn>
          </td>
        </tr>
      </tbody>
    </v-table>
    <DialogProcuration v-model="dialogStatus" :reunionData="dialogReunion" />
  </div>
</template>

<script setup>
//*************************Import des strores ********************************/
import { useReunionConseilMunicipalStore } from "@/stores/reunionConseilMunicipal";
import { useOrdresDuJourStore } from "@/stores/ordresDuJour";
import { useProcurationStore } from "@/stores/procuration";

//*************************Initialisation des strores ********************************/
const reunionConseilMunicipalStore = useReunionConseilMunicipalStore();
const ordresDuJourStore = useOrdresDuJourStore();
const procurationStore = useProcurationStore();

//************************ Initialisation des status pour boite de dialogues *************/
const dialogStatus = ref(false);
const dialogReunion = ref({});

//*********************** Initialisation des props **********************************/
const props = defineProps({
  mairie: Object,
  user: Object,
  reunions: Array
});

//********************** Initialisation des variables ***********************************/
//const reunions = ref([]);
const ordres = ref({});
const procurations = ref({});

//********************** fonction pour récupérer les réunions de cette mairie ***********/
const fetchReunions = async () => {
  const reunionsData = await reunionConseilMunicipalStore.fetch([
    "representant_uid",
    props.mairie.representant_uid,
  ]);
  props.reunions.value = await reunionsData;
  console.log("reunionConseilMunicipalStore.$state",reunionConseilMunicipalStore.$state.reunions)

  // reunionsData.forEach((reunion) => {
  //   fetchOrdres(reunion);
  //   fetchProcuration(reunion);
  // });
  return reunionsData;
};

/************************ fonction pour créer une nouvelle procuration absence ******/
const createProcuration = (reunion) => {
  dialogStatus.value = true;
  dialogReunion.value = reunion;
};

onMounted(() => {
  fetchReunions();
});

/** ******************** fonction pour récupérer les ordres de cette réunion **********/
const fetchOrdres = async (reunion) => {
  const ordresData = await ordresDuJourStore.fetch(["id_reunion", reunion.id]);
  // reunion.ordres = ordres;
  ordres.value[reunion.id] = ordresData;
  return ordres;
};

/** ******************** fonction pour récupérer les procurations de cette réunion **********/
const fetchProcuration = async (reunion) => {
  const procurationData = await procurationStore.fetch([
    "idReunion",
    reunion.id,
  ]);
  // reunion.ordres = ordres;
  procurations.value[reunion.id] = procurationData;
  return procurations;
};

/** ******************** fonction pour supprimer une reunion **********/
const deleteReunion = async (reunion) => {
  await reunionConseilMunicipalStore.delete(reunion);
};
/** ******************** fonction pour supprimer une procuration **********/
const deleteProcuration = async (procuration) => {
  await procurationStore.delete(procuration.id);
};

const dateText = (unix_timestamp) => {
  const myDate = new Date(unix_timestamp * 1000);
  const jour = myDate.getDate() > 9 ? myDate.getDate() : "0" + myDate.getDate();

  const mois =
    Number(myDate.getMonth()) > 8
      ? String(Number(myDate.getMonth()) + 1)
      : "0" + String(Number(myDate.getMonth()) + 1);

  const annee = myDate.getFullYear() - 1970 + 1;

  return jour + "/" + mois + "/" + annee;

};


const test = (reunion,ordre) =>{
  console.log('******************** boucle vfor ordre *******************')
  console.log(reunion);
  console.log(ordre.result);
}
</script>

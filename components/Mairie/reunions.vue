<template>
  <div>
    {{ dialogStatusSupprimeReunion }}
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
                    Délibérations
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

              <!-- ---------------- DATE --------------------------->
          <td class="text-center border-sm">{{ reunion.date }}</td>

           <!-- ---------------- ORDRE DU JOUR --------------------------->
          <td class="text-left border-sm">
            <v-list density="compact">

              <v-list-item v-for="ordre in reunion.ordres" :key="ordre.id">
                {{ ordre.numero }}. {{ ordre.ordre }}
              </v-list-item>
            </v-list>
          </td>

          <!-- ---------------- CONVOCATION --------------------------->
          <td style="vertical-align: middle" class="border-sm">
                    <v-btn class="my-4"
                      color="blue-lighten-4"
                      :to="`/convocation/${reunion.id}`"
                     >
                        
                        créer
                    </v-btn>
                    {{ explore(reunion) }}
                  </td>

                  <!-- ---------------- PROCURATION --------------------------->
          <td style="vertical-align: middle" class="border-sm text-center">
            <div
              v-for="procuration in reunion.procurations"
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


                  <!-- ---------------- FEUILLE DE PRESENCE --------------------------->
                  <td style="vertical-align: middle" class="border-sm text-center">
                    <div v-if="reunion.isConvocationOk">
                      <v-btn 
                        class="my-4" 
                        color="blue-lighten-4"
                        :to="`/presence/${reunion.id}`"
                        >imprimer
                    </v-btn>
                     
                    </div>
                  </td>
<!-- ---------------- DELIBERATIONS --------------------------->
<td style="vertical-align: middle" class="border-sm">
            <div v-if="reunion.isFeuillePresenceOk">
              <v-btn 
                class="my-4"
                color="blue-lighten-4"
                :to="`/deliberation/${reunion.id}`">
                Délibérations
              </v-btn>
              
             
            </div>
          </td>
           <!-- ---------------- PROCES VERBAL --------------------------->
          <td style="vertical-align: middle" class="border-sm">
            <div v-if="reunion.isFeuillePresenceOk">
             
              <v-btn class="my-4 text-center" 
                color="blue-lighten-4"
                :to="`/procesVerbal/${reunion.id}`">Générer imprimer <br />procès verbal 
              </v-btn
              ><br />
              <v-btn class="my-4" color="blue-lighten-4">transmis prefecture</v-btn><br />
            </div>
          </td>

                  <!-- ---------------- EXTRAIT REGISTRE --------------------------->
                  <td style="vertical-align: middle" class="border-sm">
                    <div v-if="reunion.isProcesVerbalOk">
                      <v-btn 
                        class="my-4"
                        color="blue-lighten-4"
                        :to="`/extraits/${reunion.id}`"
                        >Imprimer
                      </v-btn><br />
                    </div>
                  </td>
           <!-- ---------------- ACTIONS --------------------------->
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
    <DialogProcuration v-model="dialogStatus" :reunionData="dialogReunion" />
    <DialogSupprimeReunion 
      v-model="dialogStatusSupprimeReunion" 
      :reunionData="dialogReunion"
      @update:model-value="dialogStatusSupprimeReunion = false" /> 
  
  </div>
</template>

<script setup>
//*************************Import des strores ********************************/
import { useReunionConseilMunicipalStore } from "@/stores/reunionConseilMunicipal";
// import { useOrdresDuJourStore } from "@/stores/ordresDuJour";
import { useProcurationStore } from "@/stores/procuration";

//*************************Initialisation des strores ********************************/
const reunionConseilMunicipalStore = useReunionConseilMunicipalStore();
// const ordresDuJourStore = useOrdresDuJourStore();
const procurationStore = useProcurationStore();


//************************ Initialisation des status pour boite de dialogues *************/
const dialogStatus = ref(false);
const dialogStatusSupprimeReunion = ref(false);
const dialogReunion = ref({});

//*********************** Initialisation des props **********************************/
const props = defineProps({
  mairie: Object,
  user: Object,
  reunions: Array,
});
//********************** Initialisation des variables ***********************************/
//const reunions = ref([]);
// const ordres = ref({});
// const procurations = ref({});
const explore=(reunion)=>{
  console.log("reunion dans explore reunion",reunion)
}


/************************ fonction pour créer une nouvelle procuration absence ******/
const createProcuration = (reunion) => {
  
  dialogStatus.value = true;
  dialogReunion.value = reunion;
};



/** ******************** fonction pour supprimer une reunion **********/
const deleteReunion = async (reunion) => {
  console.log("reunion",reunion);
   dialogStatusSupprimeReunion.value = !dialogStatusSupprimeReunion.value;


  dialogReunion.value = reunion;
  //await reunionConseilMunicipalStore.delete(reunion);
};
/** ******************** fonction pour supprimer une procuration **********/
const deleteProcuration = async (procuration) => {
  await procurationStore.delete(procuration.id);
 

  reunionConseilMunicipalStore.fetch(['representant_uid',props.mairie.representant_uid]);
};




</script>

<template>
  <v-container fluid>
    <h1 class="text-center">Procès-verbal des délibération du Conseil Municipal de {{ mairieStore.mairie.ville }}</h1>
    <h2 class="text-center mb-3">Séance du {{ reunionEnCours.date }}</h2>
    <br>
   <p>{{ texteDebutAnnee }}</p>
   <br>
   <p><b>Date de la convocation : {{ reunionEnCours.dateConvoc}}</b></p>
   <br>
   <p><b><u>Etaient présents : </u></b>{{ listePresents }}</p>
   <br>
   <p><b><u>Etaient absents : </u></b>{{ listeAbsents }}</p>
   <br>
   <p><b><u>Procurations : </u></b>{{ listProc }}</p>
   <br>
   <p>{{ secretaire }} a été nommé(e) secrétaire de séance</p>
   <p>Nombre de membre : {{ nbMembres }}</p>
   <p>En exercice : {{ nbenExercice }}</p>
   <p>Présents : {{ nbPresents }}</p>
   <p>Votants : {{ nbVotants }}</p>
   <p>Date de transmssion en Préfecture :</p>
   <br>
   <p><b><u>ORDRE DU JOUR : </u></b></p>
    <ul>
      <li v-for="ordre in reunionEnCours.ordres">
        {{  ordre.numero }}. {{ ordre.ordre }}
      </li>
    </ul>
    <br>
    <div v-for="ordre in reunionEnCours.ordres">
      <p class="ml-2"><b>{{ordre.numero}} Délibération {{ ordre.num_delib }}</b></p>
      <p><b> Objet </b>: {{ ordre.ordre }}</p>
      <p>{{ ordre.text_deliberation }}</p>
      <p>{{ ordre.text_fin_deliberation }}</p>
      <br>
    </div>

  </v-container>
</template>

<script setup>
import { useReunionConseilMunicipalStore } from "@/stores/reunionConseilMunicipal";
import { useMairieStore } from "@/stores/mairie";
import { useConseillerMunicipalStore } from "@/stores/conseillerMunicipal";
//import { useOrdresDuJourStore } from "@/stores/ordresDuJour";



const mairieStore = useMairieStore();
console.log("mairieStore.mairie",mairieStore.mairie.ville)
const conseillerMunicipalStore = useConseillerMunicipalStore();

const route = useRoute();
const id_reunion = route.params["id_reunion"][0];


const formatText = computed(() => {
  return ["ouverture du secrétariat ", mairieStore.mairie.texteOuverture]
    .join("<br />")
    .replace(/\\n/g, "<br />");
});

const reunionEnCours = ref({});

//******************* On récupère les données de la réunion en cours *******************************/
const reunionConseilMunicipal = useReunionConseilMunicipalStore();

reunionEnCours.value = await reunionConseilMunicipal.fetchOne(id_reunion);
console.log("reunionEnCours.value ds procesverbal",reunionEnCours.value)

/******************** On récupère les données de la mairie concernée par cette réunion ******************* */
const id_mairie = ref("");
const conseillersMunicipaux = ref([]);

id_mairie.value = reunionEnCours.value.representant_uid;


  const tabUnite=['','un','deux','trois','quatre','cinq','six','sept','huit','neuf','dix','onze','douze','treize','quatore','quinze','seize'];
  const tabDizaine=['','dix','vingt','trente','quarante','cinquante','soixante','soixante-dix','quatre-vingt','quatre-vingt-dix']

  const nomMois=["janvier","février","mars","avril","mai","juin","juillet","août","septembre","octobre","novembre","décembre"];

  let annee=reunionEnCours.value.date.substr(8);
  let jour=reunionEnCours.value.date.substr(0,2);
  let mois=reunionEnCours.value.date.substr(3,2);

  let heure=reunionEnCours.value.heure.substr(0,2);
  let minute=reunionEnCours.value.heure.substr(3);
  
  const chiffreLettre=(chiffre)=>{

    let txtAnnee="";
    let dizaine=Math.round(chiffre/10);
    let unite=chiffre % 10
    if (chiffre<17)
    {
      unite=tabUnite[chiffre];
      txtAnnee=unite;
    }else{
      unite=tabUnite[unite];
      if (unite==1)
        {
          txtAnnee=tabDizaine[dizaine]+' et '+tabUnite[unite];
        }else{
          txtAnnee=tabDizaine[dizaine]+' '+unite;
        }
      }
    return txtAnnee;

  }
 
  
  let texteDebutAnnee="L'an deux mille "+chiffreLettre(annee)+", le "+chiffreLettre(jour)+' '+nomMois[mois-1] + ' 20'+annee + ' à ';
  if (heure>1)
  {
    texteDebutAnnee +=heure+' heures ';
  }else{
    texteDebutAnnee +=heure+' heure ';
  }
  if (minute>1)
  {
    texteDebutAnnee +=minute+ ' minutes, ';
  }else{
    texteDebutAnnee +=minute+ ' minute, ';
  }
  
  const president=conseillerMunicipalStore.conseillers.find(({id})=> id == reunionEnCours.value.president);
  texteDebutAnnee += 'le Conseil Municipal de cette commune, régulièrement convoqué, s\'est réuni au nombre prescrit par la loi, dans le lieu habituel de ses séances, '+reunionEnCours.value.salleDeReunion+' de '+mairieStore.mairie.ville+' sous la présidence de '+president.prenom+' '+president.nom+', '+president.role; 


  let listePresents="";
  let listeAbsents="";

  const nbMembres = conseillerMunicipalStore.conseillers.length;
const nbenExercice = nbMembres;
  let nbPresents=nbenExercice;
  let nbVotants=nbenExercice;
  const isAbsent=(conseiller)=>{
    let reponse=false
    reunionEnCours.value.procurations.forEach((proc)=>{
   
      if (conseiller.id == proc.absent)
      {
        reponse=true;
        
      }
    })
    return reponse
  }
 

  // ------------------- on rempli la liste des présents et des absents --------------------------
  conseillerMunicipalStore.conseillers.forEach((conseiller)=>{
    if (isAbsent(conseiller))
    {
      nbPresents--;
      listeAbsents += listeAbsents.length == 0 ? "" : ", "
      listeAbsents +=  conseiller.prenom+' '+conseiller.nom
    }else{
      listePresents += listePresents.length == 0 ? "" : ", "
      listePresents +=  conseiller.prenom+' '+conseiller.nom
    }
      
    
  })
  
// ------------------- on rempli la liste des procurations --------------------------
  nbVotants=nbPresents;
let listProc="";
reunionEnCours.value.procurations.forEach((proc)=>{
    if (proc.recevant)
    {
      const conseillerAbsent=conseillerMunicipalStore.conseillers.find(({id})=> id == proc.absent);
      const conseillerrecevant=conseillerMunicipalStore.conseillers.find(({id})=> id == proc.recevant);
      nbVotants++;
      listProc += listProc.length == 0 ? "" : ", "
      listProc += conseillerAbsent.prenom+" "+conseillerAbsent.nom+" donne procuration à "+conseillerrecevant.prenom+" "+conseillerrecevant.nom;
    }
  })

  // ------------------- on rempli la secretaire --------------------------
let secretaire= conseillerMunicipalStore.conseillers.find(({id})=> id == reunionEnCours.value.secretaire);


secretaire = secretaire.prenom+' '+secretaire.nom;


  // ------------------- on rempli les nombres --------------------------




</script>

<template>
<!-- ------------------------------- BOITE DE DIALOGUE POUR LA CREATION/MODIFICATION D'UNE MAIRIE ----------------------- -->
   <v-form ref="formMairie" @submit.prevent="submitMairie">
    <v-container>
      <v-row>
        <v-col cols="12" md="12"
          ><p>Veuillez entrer ici les informations sur la mairie</p></v-col
        >

        <v-col cols="12" md="6"> <!--      champ code postal    -->
          <v-text-field
            v-model="nouvelleMairie.codePostal"
            :counter="5"
            :rules="[rules.codePostalValid]"
            label="Code postal de la mairie"
            hint="composé de 5 chiffres"
            required
          ></v-text-field>
        </v-col>

        <v-col cols="12" md="6"> <!--      champ nom    -->
          <v-text-field
            v-model="nouvelleMairie.ville"
            :counter="30"
            label="Nom de la commune"
            required
          ></v-text-field>
        </v-col>

        <v-col cols="12" md="12"><!--      champ adresse    -->
          <v-text-field
            v-model="nouvelleMairie.adresse"
            :counter="30"
            label="Adresse de la mairie"
            required
          ></v-text-field>
        </v-col>

        <v-col cols="12" md="6"><!--      champ telephone    -->
          <v-text-field
            v-model="nouvelleMairie.telephone"
            :counter="30"
            label="Telephone de la mairie"
            required
          ></v-text-field>
        </v-col>

        <v-col cols="12" md="6"> <!--      champ textDepartement    -->
          <v-text-field
            v-model="nouvelleMairie.textDepartement"
            :counter="50"
            
            label="ex : Département des Vosges"
            required
          ></v-text-field>
        </v-col>

        <v-col cols="12" md="6"> <!--      champ email    -->
          <v-text-field
            v-model="nouvelleMairie.email"
            :counter="50"
            :rules="[rules.emailValid]"
            label="Email de la mairie"
            required
          ></v-text-field>
        </v-col>


        <v-col cols="12" md="12"> <!--      champ texteOuverture    -->
          <v-textarea
            v-model="nouvelleMairie.texteOuverture"
            :counter="200"
            label="Texte des horaires d'ouverture du secrétariat"
            s
          ></v-textarea>
        </v-col>

        <v-col cols="12" md="12"
          ><p>Veuillez entrer ici vos informations</p></v-col
        >
        <v-col cols="12" md="6"> <!--      champ nom user   -->
          <v-text-field
            v-model="userInfos.nom"
            :counter="30"
            label="Votre nom"
            required
          ></v-text-field>
        </v-col>

        <v-col cols="12" md="6"><!--      champ prenom user    -->
          <v-text-field
            v-model="userInfos.prenom"
            :counter="30"
            label="Votre prénom"
            required
          ></v-text-field>
        </v-col>

        <v-col cols="12" md="6"> <!--      champ telephone user    -->
          <v-text-field
            v-model="userInfos.telephone"
            :counter="30"
            label="Votre numéro de téléphone"
            required
          ></v-text-field>
        </v-col>

        <v-col v-if="!utilisateurStore.uid" cols="12" md="6"><!--      champ email user    -->
          <v-text-field
            v-model="user.email"
            :counter="50"
            :rules="[rules.emailValid]"
            label="Votre email"
            hide-details
            required
          ></v-text-field>
        </v-col>
        <v-col v-else cols="12" md="6"><!--      champ email user    -->
          <v-text-field
            v-model="user.email"
            :counter="50"
            :rules="[rules.emailValid]"
            label="Pour modifier votre email veuillez nous contacter"
            readonly
            
            required
          ></v-text-field>
        </v-col>
      </v-row>

      <!-- ---------------- Si c'est une création de mairie ----------------    -->
      <v-row v-if="!utilisateurStore.uid">
        <v-col cols="12" md="6"><!--      champ password    -->
          <v-text-field
            v-model="user.password"
            :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
            :rules="[rules.required, rules.min]"
            :type="show1 ? 'text' : 'password'"
            hint="At least 8 characters"
            label="Mot de passe"
            counter
            @click:append="show1 = !show1"
          ></v-text-field>
        </v-col>

        <v-col cols="12" md="6"> <!--      champ consirmPassword    -->
          <v-text-field
            v-model="confPassword"
            :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
            :rules="[rules.required, rules.min, rules.confirmation]"
            :type="show1 ? 'text' : 'password'"
            hint="At least 8 characters"
            label="Confirmation mot de passe"
            counter
            @click:append="show1 = !show1"
          ></v-text-field>
        </v-col>

        <v-col cols="12" md="6"> <!--      checkbox CGU    -->
          <v-checkbox
            v-model="isCGUOk"
            :rules="[rules.checkBoxValid]"
            label="J'accepte les conditions générales d'utilisation."
          ></v-checkbox>
        </v-col>

        <v-col cols="12" md="6"><!--      checkbox confirmation representant    -->
          <v-checkbox
            v-model="isRepresentant"
            :rules="[rules.checkBoxValid]"
            label="Je confirme agir en tant que représentant du secrétariat de la mairie"
          ></v-checkbox>
        </v-col>

       

      </v-row>
      <v-row>

        <v-col cols="12" md="12"> <!--      bouton enregistrer/modifier la mairie   -->
          <v-btn
            class="mt-2"
            type="submit"
            block
            color="orange-darken-4"
            prepend-icon="mdi-content-save-edit"
           
          >
            {{
              utilisateurStore.uid
                ? "Enregistrer les modifications"
                : "inscrire ma mairie"
            }}</v-btn
          >
        </v-col>
        <v-col cols="12" md="6"><!--      lien pour le retour    -->
          <Router-link to="/">retour</Router-link>
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>
<script setup>

//************************** IMPORTS******************************************* */
import { useUtilisateurStore } from "@/stores/utilisateur";
import { ref,  onMounted, defineEmits } from "vue";
import { getAuth } from "firebase/auth";
import { useMairieStore } from "@/stores/mairie";

//************************** INITILISATION******************************************* */


const user = ref({
  email: "",
  password: "",
});

const userInfos = ref({
  nom: "",
  prenom: "",
  telephone: "",
});

const nouvelleMairie = ref({
  codePostal: "",
  ville: "",
  adresse: "",
  telephone: "",
  email: "",
  texteOuverture: "",
  textDepartement: "",
});

const confPassword = ref("");
const mairieStore = useMairieStore();
const utilisateurStore = useUtilisateurStore();
const { uid} = storeToRefs(utilisateurStore)

const show1 = ref(false);
const isCGUOk = ref(true);
const isRepresentant = ref(true);
const emit = defineEmits(["update:modelValue"])


// ********************* règles pour les différens champs ************************ 
const rules = {
  required: (v) => !!v || "Obligatoire.",
  min: (v) => v.length >= 8 || "Min 8 caractères",
  emailMatch: () => `The email and password you entered don't match`,
  confirmation: (v) =>
    v === user.value.password || "Les mots de passes doivent être identique",
  checkBoxValid: (v) => v || "Obligatoire",
  emailValid: (v) =>
    (v.length > 0 && /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v)) ||
    "Cet email n'est pas valide",
  codePostalValid: (v) =>
    /^\d{5}$/.test(v) || "le code postal est composé de 5 chiffre",
};

const formMairie = ref(null);

//************************** SUBMIT DU FORMULAIRE ******************************************* */
const submitMairie = async () => {

  // on valide les réponses données
  const { valid } = await formMairie.value.validate();
  if (!valid) return; // si ce n'est pas valide on quitte le submit

  const auth = getAuth();

  if (utilisateurStore.utilisateur.uid) {
    // Si c'est un utilisateur déjà connecté
    // on effectue la mise à jour de l'utilisateur
    await utilisateurStore.update(
      utilisateurStore.utilisateur.uid,
      user.value,
      userInfos.value,
      auth
    );
    
    nouvelleMairie.value.representant_uid = utilisateurStore.utilisateur.uid;
    // on effectue la mise à jour de la mairie
    await mairieStore.update(nouvelleMairie.value,utilisateurStore.utilisateur.uid);

    
    
  } else {
    // Si c'est une création de mairie
    const result = await utilisateurStore.create(user.value, userInfos.value);
    nouvelleMairie.value.representant_uid = result;
    await mairieStore.create(nouvelleMairie.value);
  }
  //window.location.reload();
  emit("update:modelValue");
  // cree un utilisateur avec utilisateurStore.create
  // recuperer l'id utilisateur ( variable user)
  // creer un objet utilisateur dans la collection utilisateur avec l'id de l'utilisateur (variable userInfos)
  // creer un objet mairie dans la collection mairies avec l'id de l'utilisateur stocké dans un champ de l'objet mairie (variable nouvelleMairie)
};

onMounted(async () => {
  
  user.value.email = utilisateurStore.email;

  if (mairieStore.mairie.representant_uid  ) {
    nouvelleMairie.value = { ...mairieStore.mairie }; // copie par référence
  } 

  
  if (utilisateurStore.uid)
  {
    userInfos.value = { ...utilisateurStore.$state };
  }
    
 
  
});

//mairieStore.create(mairieTest);
</script>

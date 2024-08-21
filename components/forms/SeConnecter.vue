<template>
 <!-- ------------------------------- BOITE DE DIALOGUE POUR LA CONNEXION D'UN USER ------------------------->
   <v-form ref="formConnect" @submit.prevent="submitConnect">
    <v-container>
      <v-row>
        <v-col cols="12" md="12">
          <p>Connectez vous</p>
        </v-col>
        
        {{ user }}
        <v-col cols="12" md="6">
          <v-text-field
            v-model="user.email"
            :counter="50"
            :rules="[rules.emailValid]"
            :error-messages="errorMessages"
            label="Votre email"
            required
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field
            v-model="user.password"
            :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
            :rules="[rules.required, rules.min]"
            :type="show1 ? 'text' : 'password'"
            hint="At least 8 characters"
            label="Mot de passe"
            counter
           
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="12">
          <v-btn
            class="mt-2"
            type="submit"
            block
            color="orange-darken-4"
            prepend-icon="mdi-content-save-edit"
          >
            Se connecter</v-btn
          >
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>
<script setup>
import { ref, defineProps, onMounted } from "vue";
import { useUtilisateurStore } from '@/stores/utilisateur';

//************************** INITILISATION******************************************* */
const utilisateurStore = useUtilisateurStore()
const props = defineProps({
  userData: {
    email: "",
    password : ""    
  }
});
const user = ref({
  email: "a@a.com",
  password: "",
});


const show1 = ref(false);
const errorMessages = ref([]);
const rules = {
  required: (v) => !!v || "Obligatoire.",
  min: (v) => v.length >= 8 || "Min 8 caractères",
  emailMatch: () => `The email and password you entered don't match`,
  emailValid: (v) =>
    (v.length > 0 && /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v)) ||
    "Cet email n'est pas valide",
};

const formConnect = ref(null);

//************************** SUBMIT DU FORMULAIRE ******************************************* */
const submitConnect = async () => {

  // on valide les réponses données
 

  const { valid } = await formConnect.value.validate();
  if (!valid) return; // si ce n'est pas valide on quitte le submit
  const result = await utilisateurStore.logIn(user.value.email, user.value.password)

  if (result.error){
    const hasError = result.error
  if (hasError) {
    
    errorMessages.value.push("Email ou mot de passe incorrect")
    return
  }
  }


};


onMounted(async () => {

  // user.value.email = props.userData.email;
  // user.value.password = props.userData.password;
  
});

</script>

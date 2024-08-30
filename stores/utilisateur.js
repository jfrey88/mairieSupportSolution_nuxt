import { defineStore } from "pinia";
// import { useCollection }  from 'vuefire';
// import { collection, addDoc  } from 'firebase/firestore';
import {
  createUserWithEmailAndPassword,
  updateEmail,
  signOut,
  getAuth,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { useCurrentUser, useIsCurrentUserLoaded } from "vuefire";
import { setDoc, doc, getDoc, updateDoc, deleteDoc } from "firebase/firestore";

export const useUtilisateurStore = defineStore("utilisateur", {
  state: () => ({
    utilisateur: {},
    uid: null,
    telephone: "",
    nom: "",
    prenom: "",
    email: "",
  }),
  getters: {
    exists: (state) => {
      return !!state.uid;
    },
  },
  actions: {
    // MVC | Model View Controller
    // MVC | S applique généralement à l'ensemble des systemes
    // MVC |
    // CRUD | Create, Read, Update, Delete
    //Create
    async create(userData, userInfos) {
      // receive one object as parameter and will perform,
      // the action of persisting the object in the database / cache / array
      // containing all the records
      /*
            const { user } = await createUserWithEmailAndPassword(auth, userData.email, userData.password)
            const uid = user.uid;
       
            await setDoc(doc(db,"accounts",user.uid),{
                nom : userInfos.nom,
                prenom : userInfos.prenom,
                telephone : userInfos.telephone,
            })
            return uid;
           
            // return usercredentials.uid
            // .then(async (userCredential) => {
            //     const user = userCredential.user;
            //     await setDoc(doc(db,"utilisateurs",user.uid),{
            //         birthdate : userInfo.value.birthdate
            //     })
            // })

*/
    },
    //Read
    fetchUser() {
      const user = useCurrentUser();
      if (user.value) {
        this.$patch({
          uid: user.value.uid,
          telephone: "sdgdfsg",
          nom: "MATHE",
          prenom: "Géraud",
          email: "",
        });
      }
    },
    async fetchOne(uid) {
      const db = useFirestore();
      const docRef = doc(db, "accounts", uid);

      const docSnap = await getDoc(docRef);
      if (!docSnap.exists()) {
        console.log("No such document!");
        return;
      }
      const account = docSnap.data();

        this.$patch({
        telephone: account.telephone,
        nom: account.nom,
        prenom: account.prenom,
        });

      return docSnap.data();
    },

    //Update

    async update(uid, userData, userInfoData, auth) {
      // onfait la sauvegarde dans la partie authentification
      //updateEmail(auth.currentUser,userData.email)
      // console.log(result);

      const db = useFirestore();
      // on fait la sauvegarde du reste de l'utilisateur
      const docRef = doc(db, "accounts", uid);

      updateDoc(docRef, userInfoData);
      // rajouetr ici la mise a jour du state
      this.nom = userInfoData.nom;
      this.prenom = userInfoData.prenom;
      this.telephone = userInfoData.telephone;

      //on fait la sauvegarde de la partie mairie
    },
    //Delete
    async delete(uid) {
      const docRef = doc(db, "accounts", uid);

      await deleteDoc(docRef);
      // receive one object as parameter and will perform,
      // the action of delete the object in the database / cache / array
      // containing all the records
    },
    async logOut(auth) {
      await signOut(auth);
      this.$patch({
        utilisateur: {},
        uid: null,
      });
    },
    async logIn(email, password) {
      const auth = getAuth();
      try {
        const request = await signInWithEmailAndPassword(auth, email, password);
        const account = await this.fetchOne(request.user.uid);
      
        this.$patch({
          utilisateur: ref(request.user),
          uid: request.user.uid,
        telephone: account.telephone,
        nom: account.nom,
        prenom: account.prenom,
        });
        return request.user;
      } catch (e) {
        const errorMatch = /auth\/user-not-found/.test(e.code);
        if (errorMatch) {
          return { error: "user not found" };
        }
      }
    },

    //Delete
  },
});

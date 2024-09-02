import { defineStore } from "pinia";
import {
  addDoc,
  collection,
  getDocs,
  query,
  where,
  updateDoc,
} from "firebase/firestore";
import { useUtilisateurStore } from "./utilisateur";
import { useConseillerMunicipalStore } from "./conseillerMunicipal";
import { useReunionConseilMunicipalStore } from "./reunionConseilMunicipal";

// utilisateur
//  -> mairie
//      -> conseillers
//      -> reunions
//          -> ordres du jour
//          -> Procurations

export const useMairieStore = defineStore("mairie", {
  state: () => {
    return {
      mairie: {},
      conseillers: [],
      reunions: [],
    };
  },
  getters: {},
  actions: {
    // MVC | Model View Controller
    // MVC | S applique généralement à l'ensemble des systemes
    // MVC |
    // CRUD | Create, Read, Update, Delete
    async create(mairie) {
      const db = useFirestore();
      await addDoc(collection(db, "mairies"), mairie);
    },
    //Read
    async fetch(params) {
      // chargement des stores
      const userStore = useUtilisateurStore();
      const conseillerMunicipalStore = useConseillerMunicipalStore();
      const reunionStore = useReunionConseilMunicipalStore();

      // chargement des données de la mairie
      const uid = userStore.uid;
      const db = useFirestore();
      const mairiesCollections = collection(db, "mairies");
      const data = await getDocs(
        query(mairiesCollections, where("representant_uid", "==", uid))
      );
      const mairieData = data.docs[0];
      this.mairie = mairieData.data();

      // on charge ensuite les conseillers
      this.conseillers = await conseillerMunicipalStore.fetch([
        "representant_uid",
        uid,
      ]);

      // on charge ensuite les réunions
      this.reunions = await reunionStore.fetch([
        "representant_uid",
        uid,
      ]);


      return mairieData.data();
    },

    //Update
    async update(mairieData, uid) {
      const db = useFirestore();
      const q = query(
        collection(db, "mairies"),
        where("representant_uid", "==", uid)
      );
      const data = await getDocs(q);
      const docRef = data.docs[0].ref;
      await updateDoc(docRef, mairieData);
      this.mairie = mairieData;
    },
  },
});

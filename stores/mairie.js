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
    };
  },
  getters: {},
  actions: {
    // MVC | Model View Controller
    // MVC | S applique généralement à l'ensemble des systemes
    // MVC |
    // CRUD | Create, Read, Update, Delete
    async create(mairie) {
      await addDoc(collection(db, "mairies"), mairie);
    },
    //Read
    async fetch(params) {
      const userStore = useUtilisateurStore();
      const conseillerMunicipalStore = useConseillerMunicipalStore();
      const uid = userStore.uid;
      // will perform the action of fetching all the records
      const db = useFirestore();
      const mairiesCollections = collection(db, "mairies");
      const data = await getDocs(
        query(mairiesCollections, where("representant_uid", "==", uid))
      );
      const mairieData = data.docs[0];
      this.mairie = mairieData.data();
      this.conseillers = await conseillerMunicipalStore.fetch([
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

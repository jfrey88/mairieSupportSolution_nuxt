import { defineStore } from "pinia";
import { addDoc, collection, query, getDocs,getDoc,  where, deleteDoc, doc,updateDoc,orderBy } from "firebase/firestore";
import { useOrdresDuJourStore } from "@/stores/ordresDuJour";
import { useProcurationStore } from "@/stores/procuration";

// import {  db } from '../plugins/firebase';
const useReunionConseilMunicipalStore = defineStore('reunionConseilMunicipal',{
    state:() => {
        return {
            reunions:[]
        }
    },
    getters : {
        withId:(state)=>{
            if(state.reunions?.docs)
            {
                return state.reunions.docs.map((doc) => {
   
                   let reunion=doc.data();
                   
                   reunion.id=doc.id;
                   return reunion;
                   
                 })
           } else{
        return []
           }
        },
        fetchAll:(state)=>{
            return state.reunions;
        }
    },
    actions : {
        // MVC | Model View Controller
        // MVC | S applique généralement à l'ensemble des systemes
        // MVC |
        // CRUD | Create, Read, Update, Delete
        //Create
        async create(reunion){
            const db=useFirestore();

            

            const result = await addDoc(collection(db,"reunions"),reunion);
            this.fetch(["representant_uid", reunion.representant_uid]);
            return result;

        },
        //Read
        async fetch(params){ 

            const db=useFirestore();
            const reunionsCollections=collection(db, 'reunions')
            const data=await getDocs(query(reunionsCollections, where(params[0],"==",params[1]),orderBy("date","desc")));
        
            const ordresDuJourStore = useOrdresDuJourStore();
            const procurationStore = useProcurationStore();



            const reunionsPromises = data.docs.map(async(doc) => {
                // const ordres = await ordresDuJourStore.fetch(["id_reunion", doc.id]);
                // const procurations = await procurationStore.fetch(["idReunion", doc.id]);
                const ordresDuJour = await ordresDuJourStore.fetch(["id_reunion", doc.id]);
                await procurationStore.fetch(["idReunion", doc.id]);
            //    return {...doc.data(), id: doc.id, ordres :  ordresDuJourStore.ordres ,procurations : procurationStore.procurations}
                return {
                    date : this.dateText(doc.data().date),
                    dateConvoc : this.dateText(doc.data().dateConvoc),
                    heure : doc.data().heure,
                    isConvocationOk : doc.data().isConvocationOk,
                    isFeuillePresenceOk : doc.data().isFeuillePresenceOk,
                    isProcesVerbalOk : doc.data().isProcesVerbalOk,
                    isTransmisPrefecture : doc.data().isTransmisPrefecture,
                    representant_uid : doc.data().representant_uid,
                    numFeuillet : doc.data().numFeuillet,
                    president : doc.data().president,
                    salleDeReunion : doc.data().salleDeReunion,
                    secretaire : doc.data().secretaire,
                    id: doc.id, 
                    ordres :  ordresDuJour ,
                    procurations : procurationStore.procurations}
        });

           const reunionsData = await Promise.all(reunionsPromises);
     
            this.reunions = reunionsData;
  



   
            return reunionsData;

            
        },
        dateText (unix_timestamp)  {
            console.log("unix_timestamp",unix_timestamp)
            const myDate = new Date(unix_timestamp * 1000 );
            console.log("myDate",myDate)
            const jour = myDate.getUTCDate() > 9 ? myDate.getUTCDate() : "0" + myDate.getUTCDate();
            console.log("jour",jour)
            
            const mois =
              Number(myDate.getMonth()) > 8
                ? String(Number(myDate.getMonth()) + 1)
                : "0" + String(Number(myDate.getMonth()) + 1);
          
            const annee = myDate.getFullYear() - 1970 + 1;
          
            return jour + "/" + mois + "/" + annee;
          
          },
        async fetchOne(id_reunion){ 
            const reunionEnCours=this.reunions.find((reunion) => reunion.id == id_reunion);
           return reunionEnCours;
        },
        //Update
        async update(reunion){
            const db=useFirestore();
            
            const docRef = doc(db,"reunions",reunion.id);
            await updateDoc(docRef,reunion);
            // receive one object as parameter and will perform,
            // the action of updating the object in the database / cache / array
            // containing all the records
        },
        async updateisConvocation(id_reunion,dateConvoc,numFeuillet){
                const db=useFirestore();
               
                const docRef = doc(db,"reunions",id_reunion);

                const docSnap = await getDoc(docRef);
                const reunion=docSnap.data();

                reunion.isConvocationOk=true;
                reunion.dateConvoc = dateConvoc;
                reunion.numFeuillet = numFeuillet;
                
                await updateDoc(docRef,reunion);
                this.fetch(["representant_uid", reunion.representant_uid]);
                // receive one object as parameter and will perform,
                // the action of updating the object in the database / cache / array
                // containing all the records
    
        },
        async updateisFeuillePresence(id_reunion){
            const db=useFirestore();
           
            const docRef = doc(db,"reunions",id_reunion);

            const docSnap = await getDoc(docRef);
            const reunion=docSnap.data();

            reunion.isFeuillePresenceOk=true;
            
            await updateDoc(docRef,reunion);
            this.fetch(["representant_uid", reunion.representant_uid]);
            // receive one object as parameter and will perform,
            // the action of updating the object in the database / cache / array
            // containing all the records

    },
        //Delete
        async delete(reunion){
            const db=useFirestore();
            const uid=reunion.representant_uid;
            const docRef = doc(db,"reunions",reunion.id);
           
            await deleteDoc(docRef);
            this.fetch(["representant_uid",uid]);
        
            // receive one object as parameter and will perform,
            // the action of delete the object in the database / cache / array
            // containing all the records
        },
    

        //Delete
    }
})

export {useReunionConseilMunicipalStore};
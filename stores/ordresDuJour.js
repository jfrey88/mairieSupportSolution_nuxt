import { defineStore } from "pinia";
import { addDoc, collection, query, getDocs,  where, orderBy,deleteDoc, collectionGroup, doc,updateDoc } from "firebase/firestore";
import { useReunionConseilMunicipalStore } from "@/stores/reunionConseilMunicipal.js";
// import {  db } from '../plugins/firebase';
const useOrdresDuJourStore = defineStore('ordresDuJour',{
    state:() => {
        ordres:[]
    },
    getters : {

    },
    actions : {
        // MVC | Model View Controller
        // MVC | S applique généralement à l'ensemble des systemes
        // MVC |
        // CRUD | Create, Read, Update, Delete
        //Create
        async create(ordreDuJour){
            const db=useFirestore();
         
            const result = await addDoc(collection(db,"ordres"),ordreDuJour);
            
            // receive one object as parameter and will perform,
            // the action of persisting the object in the database / cache / array
            // containing all the records
            return result;
        },
        //Read
        async fetch(params){ 

            const db=useFirestore();
            const ordresDuJourCollections=collection(db, 'ordres')
          
            const data=await getDocs(query(ordresDuJourCollections, where(params[0],"==",params[1]),orderBy("numero")));
          

            const ordresData=data.docs.map((doc) => ({...doc.data(),id : doc.id}));
          
          //  const tabConseiller=[];
           // const conseillerData=data.docs;
             this.ordres = ordresData;
            return ordresData;
           
         
        },

        //Update
        async update(ordre){
            const db=useFirestore();
            // const q=query(collection(db,"conseillers"), where ("representant_uid", "==",uid));
            console.log('je suis dans update pour l ordre ',ordre)
             const docRef = doc(db,"ordres",ordre.id);
             console.log('docRef')
             const result=await updateDoc(docRef,ordre);
             console.log(result)
            // receive one object as parameter and will perform,
            // the action of updating the object in the database / cache / array
            // containing all the records
        },
        //Delete
        async delete(id_reunion){
            const db=useFirestore();
            const q=query(collectionGroup(db,'ordres'), where ('id_reunion','==',id_reunion));
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach(async(docu) => {
                
                const docRef = doc(db,"ordres",docu.id);
           
            
                await deleteDoc(docRef);
            });
           
      
            // receive one object as parameter and will perform,
            // the action of delete the object in the database / cache / array
            // containing all the records
        }
    

        //Delete
    }
})

export {useOrdresDuJourStore};
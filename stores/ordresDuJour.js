import { defineStore } from "pinia";
import { addDoc, collection, query, getDocs,  where, orderBy } from "firebase/firestore";
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
        update(){
           
            // receive one object as parameter and will perform,
            // the action of updating the object in the database / cache / array
            // containing all the records
        },
        //Delete
        delete(){
         
            // receive one object as parameter and will perform,
            // the action of delete the object in the database / cache / array
            // containing all the records
        }
    

        //Delete
    }
})

export {useOrdresDuJourStore};
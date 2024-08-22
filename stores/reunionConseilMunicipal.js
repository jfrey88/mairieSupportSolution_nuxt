import { defineStore } from "pinia";
import { addDoc, collection, query, getDocs,  where, deleteDoc, doc } from "firebase/firestore";
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
   
            const result = await addDoc(collection(db,"reunions"),reunion);

            // receive one object as parameter and will perform,
            // the action of persisting the object in the database / cache / array
            // containing all the records
            return result;
        },
        //Read
        async fetch(params){ 
            const queryDocs = await query(collection(db,"reunions"), where (params[0],"==",params[1]));
            let querySnapShot = await getDocs(queryDocs);
           

            const allReunions=[];
            querySnapShot.forEach(async (doc)=>{
                const reunion=doc.data();
                reunion.id=doc.id;
                // const ordres = await getDocs(collection(db,"reunions",doc.id,"ordres"));
                // reunion.ordreAll =[];
                // ordres.forEach(ordre=>reunion.ordreAll.push(ordre.data()));
               
                allReunions.push(reunion);
                
            })
            

            this.$patch({
                reunions:allReunions
            })
          //  const queryOrdres = query(collection(db,"reunions",querySnapShot.id);
            
            return allReunions
            
        },

        //Update
        update(){
           
            // receive one object as parameter and will perform,
            // the action of updating the object in the database / cache / array
            // containing all the records
        },
        //Delete
        async delete(reunion){
            const uid=reunion.representant_uid;
            const docRef = doc(db,"reunions",reunion.id);
           
            await deleteDoc(docRef);
            this.fetch(["representant_uid",uid]);
        
            // receive one object as parameter and will perform,
            // the action of delete the object in the database / cache / array
            // containing all the records
        }
    

        //Delete
    }
})

export {useReunionConseilMunicipalStore};
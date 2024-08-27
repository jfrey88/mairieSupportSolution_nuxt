import { defineStore } from "pinia";
import { addDoc, collection, query, getDocs,  where, deleteDoc, doc } from "firebase/firestore";
import { useOrdresDuJourStore } from "@/stores/ordresDuJour";

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
            this.reunions.push(reunion)
            // receive one object as parameter and will perform,
            // the action of persisting the object in the database / cache / array
            // containing all the records
            return result;
        },
        //Read
        async fetch(params){ 

            const db=useFirestore();
            const reunionsCollections=collection(db, 'reunions')
            const data=await getDocs(query(reunionsCollections, where(params[0],"==",params[1])));
        

            const reunionsData=data.docs.map((doc) => ({...doc.data(), id: doc.id}));

            const ordresDuJour = useOrdresDuJourStore();
            reunionsData.forEach(async (reunion) => {
                reunion.ordres="";

                const ordrerecept = await ordresDuJour.fetch(["id_reunion", reunion.id]);
                reunion.ordres = ordrerecept;
             /*   ordrerecept.forEach((ordre) => {

                   
                    
                    reunion.ordres = reunion.ordres.concat(
                      ordre.numero + 1,
                      ". ",
                      ordre.ordre,
                      "<br />"
                    );
                  });*/
            })
       
          //  const tabConseiller=[];
           // const conseillerData=data.docs;
             this.reunions = reunionsData;
           
            return reunionsData;



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
        async delete(id){
            const db=useFirestore();
            const docRef = doc(db,"reunions",id);
           
            await deleteDoc(docRef);
            
        
            // receive one object as parameter and will perform,
            // the action of delete the object in the database / cache / array
            // containing all the records
        }
    

        //Delete
    }
})

export {useReunionConseilMunicipalStore};
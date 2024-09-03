import { defineStore } from "pinia";
import { addDoc, collection, query, getDocs,getDoc,  where, deleteDoc, doc,updateDoc,orderBy } from "firebase/firestore";
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
 
            return result;
        },
        //Read
        async fetch(params){ 

            const db=useFirestore();
            const reunionsCollections=collection(db, 'reunions')
            const data=await getDocs(query(reunionsCollections, where(params[0],"==",params[1]),orderBy("date","desc")));
        
            const ordresDuJour = useOrdresDuJourStore();
   
            const reunionsData= data.docs.map(async(doc) => {
                const ordres = await ordresDuJour.fetch(["id_reunion", doc.id]);
                console.log("ordres dans reunion fetch ",ordres);
                return {...doc.data(), id: doc.id, ordres :  ordres }
            });


       
             this.reunions = reunionsData;
            
   
            return reunionsData;

            
        },
        async fetchOne(id_reunion){ 
            const db=useFirestore();
            const docRef = doc(db,"reunions",id_reunion);
           
            const docSnap = await getDoc(docRef);
            const reunion=docSnap.data();
            reunion.id=docSnap.id;
            const ordresDuJour = useOrdresDuJourStore();
            const ordrerecept = await ordresDuJour.fetch(["id_reunion", reunion.id]);
       
            reunion.ordres = ordrerecept;
           return reunion;
        },
        //Update
        update(){
           
            // receive one object as parameter and will perform,
            // the action of updating the object in the database / cache / array
            // containing all the records
        },
        async updateisConvocation(id_reunion){
                const db=useFirestore();
               
                const docRef = doc(db,"reunions",id_reunion);

                const docSnap = await getDoc(docRef);
                const reunion=docSnap.data();

                reunion.isConvocationOk=true;
                
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
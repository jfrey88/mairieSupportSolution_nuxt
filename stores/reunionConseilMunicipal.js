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
            const data=await getDocs(query(reunionsCollections, where(params[0],"==",params[1]),orderBy("date","desc")));
        

            const reunionsData=data.docs.map((doc) => ({...doc.data(), id: doc.id}));

            const ordresDuJour = useOrdresDuJourStore();
            reunionsData.forEach(async (reunionData) => {
                const reunion = ref(reunionData);
                reunion.ordres="";
                
                const ordrerecept = await ordresDuJour.fetch(["id_reunion", reunionData.id]);
                reunion.ordres = ordrerecept;

            })
       
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
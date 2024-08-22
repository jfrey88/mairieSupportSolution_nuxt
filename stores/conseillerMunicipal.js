import { defineStore } from "pinia";
import { addDoc, collection, query, getDocs, doc, deleteDoc, where, updateDoc  } from "firebase/firestore";
// import {  db } from '../plugins/firebase';

const useConseillerMunicipalStore = defineStore('conseillerMunicipal',{
    state:() => {
        return {
            conseillers: []
          };
      
    },
    getters : {
        withId:(state)=>{
          if(state.conseillers?.docs)
            {
                return state.conseillers.docs.map((doc) => {

                    let conseiller=doc.data();
                    
                    conseiller.id=doc.id;
                    return conseiller;
                    
                  })
            } else{
                return []
            }
         
        }

    },
    actions : {
        // MVC | Model View Controller
        // MVC | S applique généralement à l'ensemble des systemes
        // MVC |
        // CRUD | Create, Read, Update, Delete
        //Create
        async create(conseiller){
            
            await addDoc(collection(db,"conseillers"),conseiller);
            // receive one object as parameter and will perform,
            // the action of persisting the object in the database / cache / array
            // containing all the records
        },
        //Read
        async fetch(params){ 
         
           
           const queryDocs = query(collection(db,"conseillers"), where (params[0],"==",params[1]));
           let querySnapShot = await getDocs(queryDocs);
          this.conseillers=querySnapShot;
           return querySnapShot;
            // will perform the action of fetching all the records
            // from the database / cache / array containing all the records
        },

        //Update
        
        async update(conseiller,id){
     
            const docRef = doc(db,"conseillers",id);
            
            await updateDoc(docRef,conseiller);
            
            // receive one object as parameter and will perform,
            // the action of updating the object in the database / cache / array
            // containing all the records

        },
        //Delete
        async delete(conseiller){
            //besoin de recuperer representant_uid pour pouvoir faire un fetch apres la suppression
            const uid=conseiller.representant_uid;
            const docRef = doc(db,"conseillers",conseiller.id);
           
            await deleteDoc(docRef);
            this.fetch(["representant_uid",uid]);
            
            // receive one object as parameter and will perform,
            // the action of delete the object in the database / cache / array
            // containing all the records
        }
    

        //Delete
    }
})

export {useConseillerMunicipalStore};
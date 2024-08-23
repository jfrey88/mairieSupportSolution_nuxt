import { defineStore } from "pinia";
import { addDoc, collection, query, getDocs, doc, deleteDoc, where, updateDoc  } from "firebase/firestore";
import { da } from "vuetify/locale";
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
            const db=useFirestore();

            await addDoc(collection(db,"conseillers"),conseiller);
            // receive one object as parameter and will perform,
            // the action of persisting the object in the database / cache / array
            // containing all the records
            this.conseillers.push(conseiller);
        },
        //Read
        async fetch(params){ 
         
            const db=useFirestore();
            const conseillersCollections=collection(db, 'conseillers')
            const data=await getDocs(query(conseillersCollections, where(params[0],"==",params[1])));


            const conseillersData=data.docs.map((doc) => ({...doc.data(),id : doc.id}));

          //  const tabConseiller=[];
           // const conseillerData=data.docs;
             this.conseillers = conseillersData;
           
            return conseillersData;
            // will perform the action of fetching all the records
            // from the database / cache / array containing all the records
        },

        //Update
        
        async update(conseiller,id){
            const db=useFirestore();
           // const q=query(collection(db,"conseillers"), where ("representant_uid", "==",uid));
           
            const docRef = doc(db,"conseillers",id);
            const uid=conseiller.representant_uid;
            
            await updateDoc(docRef,conseiller);
            this.fetch(["representant_uid", uid]);
            // receive one object as parameter and will perform,
            // the action of updating the object in the database / cache / array
            // containing all the records

        },
        //Delete
        async delete(conseiller){
            const db=useFirestore();
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
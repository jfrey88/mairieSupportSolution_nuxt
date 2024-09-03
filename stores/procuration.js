import { defineStore } from "pinia";
import { addDoc, collection, query, getDocs, doc, deleteDoc, where, updateDoc  } from "firebase/firestore";
import { useConseillerMunicipalStore } from "@/stores/conseillerMunicipal.js";

const useProcurationStore = defineStore('procuration',{
    state:() => {
        return {
            procurations: []
          };
      
    },
    getters : {

    },
    actions : {
        // MVC | Model View Controller
        // MVC | S applique généralement à l'ensemble des systemes
        // MVC |
        // CRUD | Create, Read, Update, Delete
        //Create
        async create(procuration){
            const db=useFirestore();

            await addDoc(collection(db,"procurations"),procuration);
        },
        //Read
        async fetch(params){ 
            const conseillerMunicipalStore = useConseillerMunicipalStore();
           
            const conseillers = conseillerMunicipalStore.$state.conseillers;
            
            const conseillerById = (conseiller,id) => {
                if (conseiller.id === id){
                    return conseiller.prenom+' '+conseiller.nom;
                }else{
                    return '';
                }
                
            }




            const db=useFirestore();
            const procurationCollections=collection(db, 'procurations')
            const data=await getDocs(query(procurationCollections, where(params[0],"==",params[1])));


            const procurationsData=data.docs.map((doc) => {
                const data = doc.data();
                
                const absent=conseillers.find((conseiller)=>{
                    return conseiller.id==data.absent
                })
                const recevant=conseillers.find((conseiller)=>{
                    return conseiller.id==data.recevant
                })
               
                return {
                    ...doc.data(),
                    id : doc.id,
                    prenomNomAbsent : absent.prenom+' '+absent.nom,
                    prenomNomRecevant : recevant ?  recevant.prenom+' '+recevant.nom : '',
                    


                }
                
                
                nomPrenomAbsent : conseillers.find
            });


          
            return procurationsData;
        },

        //Update
        
        
    

        //Delete   
        async delete(id){
            const db=useFirestore();
            const docRef = doc(db,"procurations",id);
           
            await deleteDoc(docRef);
            
        
            // receive one object as parameter and will perform,
            // the action of delete the object in the database / cache / array
            // containing all the records
        } 
    }
})

export {useProcurationStore};
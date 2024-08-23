import { defineStore } from "pinia";
import { addDoc, collection, getDocs, query, where ,updateDoc } from "firebase/firestore";
// import {  db } from '../plugins/firebase';


const useMairieStore = defineStore('mairie',{
    state:() => {
        return {
            mairie: {}
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
        // receive one object as parameter and will perform,
            // the action of persisting the object in the database / cache / array
            // containing all the records
            //useCollection(collection(db,'posts'));
        async create(mairie){
       
            await addDoc(collection(db,"mairies"),mairie);
            
           
        },
        //Read
        async fetch(params){ 
      
            // will perform the action of fetching all the records
        
            const db=useFirestore();
            const mairiesCollections=collection(db, 'mairies')
            const data=await getDocs(query(mairiesCollections, where(params[0],"==",params[1])));

           const mairieData=data.docs[0];
            this.mairie = mairieData.data();
       
           return mairieData.data()
        },

        //Update
        async update(mairieData,uid){
            const db=useFirestore();
            const q=query(collection(db,"mairies"), where ("representant_uid", "==",uid));
            const data=await getDocs(q);
            
            const docRef = data.docs[0].ref;
            
            
             await updateDoc(docRef,mairieData);

            this.mairie = mairieData.data;
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

export {useMairieStore};
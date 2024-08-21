import { defineStore } from "pinia";
// import { useCollection }  from 'vuefire';
// import { collection, addDoc  } from 'firebase/firestore';
import { createUserWithEmailAndPassword, updateEmail, signOut, getAuth, signInWithEmailAndPassword } from "firebase/auth";

 import { setDoc, doc, getDoc,updateDoc,deleteDoc } from "firebase/firestore";


const useUtilisateurStore = defineStore('utilisateur',{
    state:() => {
       
    },
    getters : {

    },
    actions : {
        // MVC | Model View Controller
        // MVC | S applique généralement à l'ensemble des systemes
        // MVC |
        // CRUD | Create, Read, Update, Delete
        //Create
        async create(userData,userInfos){
            
      
            // receive one object as parameter and will perform,
            // the action of persisting the object in the database / cache / array
            // containing all the records
           
            const { user } = await createUserWithEmailAndPassword(auth, userData.email, userData.password)
            const uid = user.uid;
       
            await setDoc(doc(db,"accounts",user.uid),{
                nom : userInfos.nom,
                prenom : userInfos.prenom,
                telephone : userInfos.telephone,
            })
            return uid;
           
            // return usercredentials.uid
            // .then(async (userCredential) => {
            //     const user = userCredential.user;
            //     await setDoc(doc(db,"utilisateurs",user.uid),{
            //         birthdate : userInfo.value.birthdate
            //     })
            // })


            
        },
        //Read
        fetch(){ 
         
            // will perform the action of fetching all the records
            // from the database / cache / array containing all the records
            
        },
        async fetchOne(uid){
            const docRef = doc(db,"accounts",uid);
            const docSnap = await getDoc(docRef);
        
           return docSnap.data();
        },

        //Update
        
        async update(uid,userData,userInfoData,auth){

            // onfait la sauvegarde dans la partie authentification
            updateEmail(auth.currentUser,userData.email)
           

            // on fait la sauvegarde du reste de l'utilisateur
            const docRef = doc(db,"accounts",uid);
            
            updateDoc(docRef,userInfoData);
           

            //on fait la sauvegarde de la partie mairie
        },
        //Delete
        async delete(uid){
         
            const docRef = doc(db,"accounts",uid);
            
            await deleteDoc(docRef);
            // receive one object as parameter and will perform,
            // the action of delete the object in the database / cache / array
            // containing all the records
        },
        async logOut(auth){
           await signOut(auth);
        },
        async logIn(email,password){
            const auth = getAuth();
            try {
            console.log('email',email, 'password',password);
            const request = await signInWithEmailAndPassword(auth, email, password)
           
            return request.user;
            } catch (e) {
                const  errorMatch = /auth\/user-not-found/.test(e.code);
                if(errorMatch){
                   
                    return {error : 'user not found'}
                }
              }
        
         }
    

        //Delete
    }
})

export {useUtilisateurStore};
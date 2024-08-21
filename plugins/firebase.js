import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

export default defineNuxtPlugin((nuxtApp) => {
    console.log(process.env);
    const firebaseApp = initializeApp({

       /* apiKey: process.env.API_KEY,
        authDomain: process.env.AUTHDOMAIN,
        projectId: process.env.PROJECTID,
        storageBucket: process.env.STORAGEBUCKET,
        messagingSenderId: process.env.MESSANGINGSENDERID,
        appId: process.env.APPID */

       apiKey: "AIzaSyBc9gTSjd30lfPT2725yZ0cQNAiQBiMW1Q",
        authDomain: "mairie-support-solution.firebaseapp.com",
        projectId: "mairie-support-solution",
        storageBucket: "mairie-support-solution.appspot.com",
        messagingSenderId: "396442806929",
        appId: "1:396442806929:web:8891ae7108f8f44e7f6d30"
        

       
    });
    
     const db=getFirestore(firebaseApp);
     const auth=getAuth();
     nuxtApp.vueApp.use(db);
  })



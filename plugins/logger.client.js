export default defineNuxtPlugin(() => {
  return {
    provide: {
      myLogger: (item, key, lieux) => {
        //  useNuxtApp().$myLogger(utilisateurStore.utilisateur, 'utilisateurStore.utilisateur',"index.vue")

        console.log('*************** ',lieux,' ******************************************');
        console.log(`*                 ${key}          *`);
        console.log(item);
        console.log('*********************************************************');
      }
    }
  }
})

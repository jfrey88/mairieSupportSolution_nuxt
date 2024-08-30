export default defineNuxtPlugin(() => {
  return {
    provide: {
      myLogger: (item, key, lieux) => {
//useNuxtApp().$myLogger(props.mairieData,"props.mairieData","DialogReunion.vue")
        console.log('*************** ',lieux,' ******************************************');
        console.log(`*                 ${key}          *`);
        console.log(item);
        console.log('*********************************************************');
      }
    }
  }
})

export default defineNuxtPlugin(() => {
  return {
    provide: {
      myLogger: (item, key, lieux) => {

        console.log('*************** ',lieux,' ******************************************');
        console.log(`*                 ${key}          *`);
        console.log(item);
        console.log('*********************************************************');
      }
    }
  }
})

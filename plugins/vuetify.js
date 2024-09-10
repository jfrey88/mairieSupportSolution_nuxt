import '@mdi/font/css/materialdesignicons.css'
import { VDateInput } from 'vuetify/labs/VDateInput'

import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import { fr } from 'vuetify/locale'

export default defineNuxtPlugin((app) => {
  const vuetify = createVuetify({
    // ... your configuration
    locale: {
      locale: 'fr',
      messages: { fr},
    },
    date: {
      locale: {
        fr: 'fr-FR',
      },
    },
    components: {
      VDateInput,
    },
  })
  app.vueApp.use(vuetify)
})
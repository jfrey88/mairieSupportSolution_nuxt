<!-- ************************ BOITE DE DIALOGUE POUR LA MODIFICATION D'UNE MAIRIE *********************-->
  
<template>
<v-dialog max-width="800">
    <template v-slot:activator="{ props: activatorProps }">
      <v-btn
        class="mt-4"
        v-bind="activatorProps"
        color="orange-darken-4"
        prepend-icon="mdi-pencil"
        text="Modifier les informations"
      ></v-btn>
    </template>

    <template v-slot:default="{ isActive }">
      <v-card title="Modification des informations de la mairie">
        <v-card-text>
          <FormCreationMairie
          
            @update:modelValue = "isActive.value = false"
          />
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn text="Annuler" @click="isActive.value = false"></v-btn>
        </v-card-actions>
      </v-card>
    </template>
  </v-dialog>
</template>

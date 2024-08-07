<script>
import { RouterLink, RouterView } from 'vue-router';
import { mapState } from 'pinia';
import { mapActions } from 'pinia';
import { usePhotosStore } from '@/stores/photosStore.js'

import Loading from '@/components/loading.vue'
export default {
  name: "App",
  components: {
    Loading,
  },
  computed: {
        ...mapState(usePhotosStore, ['data','dataReel','autores', 'loading'])
  },
  created() {
      
  },
  methods: {
       
  }
}
</script>

<template>
    <div class="autorx">
      <h1>Somos un colectivo de fotógrafxs crecidos durante la expansión digital.
      Rescatamos el ritual de la lentitud y el asombro del
      procedimiento analógico
      a través de las 24 y 36 instantáneas de un carrete.</h1>

      <div class="autorxs">
        <div class="autor">
          <h2>{{ autores[0].autor }}</h2>
          <p>{{ autores[0].descripcion }}</p>
        </div>
        <div class="autor">
          <h2>{{ autores[1].autor }}</h2>
          <p>{{ autores[1].descripcion }}</p>
        </div>
        <div class="autor">
          <h2>{{ autores[2].autor }}</h2>
          <p>{{ autores[2].descripcion }}</p>
        </div>
        
        <div class="autor">
          <h2>{{ autores[3].autor }}</h2>
          <p>{{ autores[3].descripcion }}</p>
        </div>
        
      </div>
      
    </div>
</template>
  
<style>

</style>
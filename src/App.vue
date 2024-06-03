<script>
import { RouterLink, RouterView } from 'vue-router'
import { mapState } from 'pinia';
import { mapActions } from 'pinia';
import { usePhotosStore } from '@/stores/photosStore.js'

import Loading from './components/loading.vue'
export default {
  name: "App",
  components: {
    Loading,
  },
  computed: {
        ...mapState(usePhotosStore, ['data','dataReel','dataReelRandom', 'loading', 'cartItems', 'numberCartItems'])
  },
  created() {
        this.fetchData();
        this.getLocal();
    },
  methods: {
        ...mapActions(usePhotosStore, ['fetchData', 'getLocal']),
    }
}
</script>

<template>
  <header>
    <nav>
      <RouterLink to="/">Reel</RouterLink>
      <RouterLink to="/cart">Cart
        <div class="bag">
          <span class="" v-if="numberCartItems > 0" >{{ numberCartItems }}</span>
        </div>
      </RouterLink>
      
      <RouterLink to="/autorxs">Autorxs</RouterLink>
    </nav>
  </header>

  <Loading v-if="loading"/>
  
  <RouterView/> 

</template>

<style>

</style>

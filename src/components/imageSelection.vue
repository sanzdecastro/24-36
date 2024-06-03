<script>
import { mapState } from 'pinia';
import { mapActions } from 'pinia';
import { usePhotosStore } from '@/stores/photosStore.js'
export default {
    computed: {
        ...mapState(usePhotosStore, ['data','dataReel','dataReelRandom','selectedPhoto'])
  },
  data() {
    return {
      photoUrl: 'https://lh3.googleusercontent.com/d',
    }
  },
  
}
</script>

<template>
     <h1>{{this.$route.params.title}} ds {{this.selectedPhoto.size1}}</h1>
    <div class="prices">
          <span>{{ this.selectedPhoto.size1 }}€</span>
          <span v-if="this.selectedPhoto.size2">- {{ this.selectedPhoto.size2 }}€</span>
        </div>
    <img :src="this.photoUrl + '/' + this.selectedPhoto.image"  alt="" >
</template>

<style>
</style>
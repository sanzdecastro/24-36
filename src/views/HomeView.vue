<script>
import { mapState } from 'pinia';
import { mapActions } from 'pinia';
import { usePhotosStore } from '@/stores/photosStore.js'
export default {
  // props: {
  //   dataReelRandom: Array,
  // },
  computed: {
        ...mapState(usePhotosStore, ['data','dataReel','dataReelRandom','selectedPhoto'])
  },
  data() {
    return {
        photoUrl: 'https://lh3.googleusercontent.com/d',
    }
  },
  methods: {
    ...mapActions(usePhotosStore, ['updateSelectedPhoto'])
  }
  
 
}
</script>

<template>
  <main>
    <div>
      <div v-for="photo in dataReelRandom" :key="photo">
        <img :src="this.photoUrl + '/' + photo.image" alt="" >
        <strong>{{ photo.title }}</strong>
        <div class="prices">
          <span v-if="photo.size20x30">{{ photo.size20x30 }}€</span>
          <span v-if="photo.size40x60">- {{ photo.size40x60 }}€</span>
        </div>
        <router-link @click="updateSelectedPhoto(photo)" :to="`${photo.title}`">See details</router-link>
      </div>
    </div>
  </main>
</template>

<style>
.single {
  padding-bottom: 200px;
}
</style>
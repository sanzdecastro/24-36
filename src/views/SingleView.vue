<script>
import { mapState } from 'pinia';
import { mapActions } from 'pinia';
import { usePhotosStore } from '@/stores/photosStore.js'

// import imageSelection from '@/components/imageSelection.vue'
export default {
  // components: {
  //   imageSelection,
  // },
  computed: {
        ...mapState(usePhotosStore, ['loading','data','dataReel','dataReelRandom','selectedPhoto', 'sizeOptions'])
  },
  data() {
    return {
      photoUrl: 'https://drive.google.com/thumbnail?id=',
      optionsSelected: [],
    }
  },
  methods: {
    ...mapActions(usePhotosStore, ['updateSelectedPhoto', 'addToCart']),
    
    async apply(){
      console.log("hola")
      console.log(this.dataReel);
      console.log(this.$route.params);
      this.updateSelectedPhoto(this.$route.params);
     
    },

    addOption(option, key){
      console.log(option, key);
      let modelSize = {
        price: option,
        size: key
      }
      this.optionsSelected.push(modelSize);
      console.log(this.optionsSelected)
    }
  },
  watch: {
    loading(value) {
      if (!value) {
        // La variable cambió a false
        this.apply();
      }
    }
  },
}
</script>

<template>
  <div class="single">
    <!-- <imageSelection/> -->
    <h1>{{this.$route.params.title}}</h1>
    {{ this.selectedPhoto.autor }}
    <div class="prices">
          <span>{{ this.selectedPhoto.size20x30 }}€</span>
          <span v-if="this.selectedPhoto.size40x60">- {{ this.selectedPhoto.size40x60 }}€</span>
        </div>
    <img :src="this.photoUrl  + this.selectedPhoto.image + '&sz=w600-h600'"  :alt="this.$route.params.title" >
    <p>{{ this.selectedPhoto.description }}</p>
    <div class="options">
      <div class="option" @click="addOption(option, key)" v-for="(option, key) in this.sizeOptions[0]">
        <div class="" v-if="typeof option ===  'number'">
          {{ key }}  {{ option }}
        </div>
      </div>
        <!-- <div class="option" v-for="option in sizeOptions">
          <span @click="addOption(option)" class="" v-if="typeof option === 'number'">
            {{ option }} €
          </span>
        </div> -->
    </div>
    <button :class="optionsSelected.length > 0 ? '' : 'disabled'" @click="addToCart(this.selectedPhoto.image, selectedPhoto.title, selectedPhoto.autor, optionsSelected)">Add to cart</button>
  </div>
</template>

<style>
button.disabled {
  @apply
  pointer-events-none;
}
</style>

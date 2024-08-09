<script>
import { mapState } from 'pinia';
import { mapActions } from 'pinia';
import { usePhotosStore } from '@/stores/photosStore.js'
import { gsap } from "gsap";

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
      selectedOptionKeys: []
    }
  },
  mounted() {
    this.animateImage();
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
      

      let index = this.selectedOptionKeys.indexOf(key);

      if (index !== -1) {
        // La clave ya existe en el array, así que la eliminamos.
        this.selectedOptionKeys.splice(index, 1);
        this.optionsSelected.splice(index, 1);
      } else {
        // La clave no existe en el array, así que la agregamos.
        this.selectedOptionKeys.push(key);
        this.optionsSelected.push(modelSize);
      }

      console.log(this.optionsSelected)
      
    },

    animateImage() {
      let image = document.querySelector(".image-container")

      gsap.set(image, {
        autoAlpha: 0,
        yPercent: 100,
      });

      gsap.to(image, {
        duration: .6,
        autoAlpha: 1,
        yPercent: 0,
      })
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
    <div class="image-container">
      <img :src="this.photoUrl  + this.selectedPhoto.image + '&sz=w600-h600'"  :alt="this.$route.params.title" >
    </div>
    
    <div class="card-info">
      <div class="info-header">
        <h1>{{this.$route.params.title}}</h1>
        <div class="autor"><span>by</span> {{ this.selectedPhoto.autor }}</div>
      </div>
      
      <div class="info">
          <div class="prices">
            <span>{{ this.selectedPhoto.size20x30 }}€</span>
            <span v-if="this.selectedPhoto.size40x60">- {{ this.selectedPhoto.size40x60 }}€</span>
          </div>
          <p>{{ this.selectedPhoto.description }}</p>
      </div>
      
      <h3>Medida</h3>
      <div class="options">
        <div  @click="addOption(option, key)" v-for="(option, key) in this.sizeOptions[0]" :key="key">
          <div class="" v-if="typeof option ===  'number'">
            <div class="option" :class="{ selected: selectedOptionKeys.includes(key) }">{{ key }}</div>
          </div>
        </div>
          <!-- <div class="option" v-for="option in sizeOptions">
            <span @click="addOption(option)" class="" v-if="typeof option === 'number'">
              {{ option }} €
            </span>
          </div> -->
      </div>
      <div>
        <button class="submit" :class="optionsSelected.length > 0 ? '' : 'disabled'" @click="addToCart(this.selectedPhoto.image, selectedPhoto.title, selectedPhoto.autor, optionsSelected)">Add to cart</button>
      </div>
      
    </div>
    
  </div>
</template>

<style>
button.disabled {
  @apply
  pointer-events-none;
}
</style>

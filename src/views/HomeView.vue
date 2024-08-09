<script>
import { mapState } from 'pinia';
import { mapActions } from 'pinia';
import { usePhotosStore } from '@/stores/photosStore.js'

import { Swiper, SwiperSlide } from 'swiper/vue';
import { Mousewheel } from 'swiper/modules';
import 'swiper/css';

import { gsap } from "gsap";

export default {
  // props: {
  //   dataReelRandom: Array,
  // },
  components: {
      Swiper,
      SwiperSlide,
  },
  setup() {
      const onSwiper = (swiper) => {
        console.log(swiper);
      };
      const onSlideChange = () => {
        console.log('slide change');
      };
      return {
        modules: [Mousewheel],
      };
    },
  computed: {
        ...mapState(usePhotosStore, ['loading','data','dataReel','dataReelRandom','selectedPhoto'])
  },
  data() {
    return {
        photoUrl: 'https://drive.google.com/thumbnail?id=',
    }
  },
  methods: {
    ...mapActions(usePhotosStore, ['updateSelectedPhoto']),

    animateReel() {
      let image = document.querySelectorAll(".reel .swiper-slide")

      gsap.set(image, {
        autoAlpha: 0,
        yPercent: 10,
      });

      gsap.to(image, {
        duration: .6,
        autoAlpha: 1,
        yPercent: 0,
        delay: .3,
      })
    },

    animateLogo() {
      let image = document.querySelectorAll(".logo")

      gsap.set(image, {
        yPercent: -100,
      });

      gsap.to(image, {
        duration: .6,
        yPercent: 0,
        delay: .6,
      })
    },

    animateMenu() {
      let image = document.querySelectorAll("header")

      gsap.set(image, {
        yPercent: 100,
      });

      gsap.to(image, {
        duration: .6,
        yPercent: 0,
        delay: 1,
      })
    }
  },
  watch: {
    loading(value) {
      if (!value) {
        // La variable cambió a false
        
        this.$nextTick(() => {
          this.animateReel();
          this.animateLogo();
          this.animateMenu();
        });
      }
    }
  },
  
 
}
</script>

<template>
  <main>
    <div class="reel">
      <swiper
          :class="'card'"
          :direction="'vertical'"
          :modules="modules"
          :mousewheel="true"
        >
        <swiper-slide v-for="photo in dataReelRandom" :key="photo">
          <router-link @click="updateSelectedPhoto(photo)" :to="`${photo.title}`">
            <div class="image-container">
              <img :src="this.photoUrl + photo.image + '&sz=w600-h600'" :alt="photo.title">
            </div>
          
          <h2>{{ photo.title }}</h2>
          <div class="prices">
            <span v-if="photo.size20x30">{{ photo.size20x30 }}€</span>
            <span v-if="photo.size40x60">- {{ photo.size40x60 }}€</span>
          </div>
          </router-link>
        
          <!-- <img :src="this.photoUrl + '/' + photo.image" alt="" > -->
        </swiper-slide>

      </swiper>
    </div>
  </main>
</template>

<style>

</style>
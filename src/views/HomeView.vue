<script>
import { mapState } from 'pinia';
import { mapActions } from 'pinia';
import { usePhotosStore } from '@/stores/photosStore.js'

import { Swiper, SwiperSlide } from 'swiper/vue';
import { Mousewheel } from 'swiper/modules';
import 'swiper/css';

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
        ...mapState(usePhotosStore, ['data','dataReel','dataReelRandom','selectedPhoto'])
  },
  data() {
    return {
        photoUrl: 'https://drive.google.com/thumbnail?id=',
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
      <swiper
          :class="'card'"
          :direction="'vertical'"
          :modules="modules"
          :mousewheel="true"
        >
        <swiper-slide v-for="photo in dataReelRandom" :key="photo">
          <router-link @click="updateSelectedPhoto(photo)" :to="`${photo.title}`">
          <img :src="this.photoUrl + photo.image + '&sz=w600-h600'" :alt="photo.title">
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
.single {
  padding-bottom: 200px;
}
</style>
<script>
import { RouterLink, RouterView } from 'vue-router'
import { mapState } from 'pinia';
import { mapActions } from 'pinia';
import { usePhotosStore } from '@/stores/photosStore.js'
import { gsap } from "gsap";
import Lenis from 'lenis'

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
    this.Lenis()
    this.fetchData();
    this.getLocal();
  },
  methods: {
        ...mapActions(usePhotosStore, ['fetchData', 'getLocal']),

        beforeEnter(el) {
          gsap.set(el, {
            opacity: 0,
          });
        },
        enter(el, done) {
          gsap.to(el, {
            opacity: 1,
            duration: .5,
            onComplete: done
          });
        },
        leave(el, done) {
          gsap.to(el, {
            opacity: 0,
            duration: .5,
            onComplete: done
          });
        },

        Lenis() {
          const lenis = new Lenis()

          lenis.on('scroll', (e) => {
            console.log(e)
          })

          function raf(time) {
            lenis.raf(time)
            requestAnimationFrame(raf)
          }

          requestAnimationFrame(raf)
        }
    }
}
</script>

<template>
  <RouterLink to="/">
    <h1 class="logo">24-36</h1>
  </RouterLink>
  
  
  <header>
    <nav>
      <RouterLink to="/">Reel</RouterLink>
      <RouterLink class="bag_container" to="/cart">
        <span>Cart</span>
        <div v-if="numberCartItems >= 1" class="bag">
          <span class="" v-if="numberCartItems > 0" >{{ numberCartItems }}</span>
        </div>
      </RouterLink>
      
      <RouterLink to="/autorxs">Autorxs</RouterLink>
    </nav>
  </header>

  <Loading v-if="loading"/>
  <!-- <Loading /> -->
  <router-view v-slot="{ Component, route }">
      <transition :name="route.name" mode="out-in" @before-enter="beforeEnter" @enter="enter" @leave="leave">
        <component :is="Component" :key="route.path"></component>
      </transition>
  </router-view>

</template>

<style>

</style>

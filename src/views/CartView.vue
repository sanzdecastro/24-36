
<script>
import { mapState } from 'pinia';
import { mapActions } from 'pinia';
import { usePhotosStore } from '@/stores/photosStore.js';

import PayPalDonateButton from '@/components/PayPalDonateButton.vue';
export default {
  components: {
    PayPalDonateButton,
  },
  data(){
    return {
      numberCartItems: 0,
      totalPrice: 0,
      itemsSanti: [],
    }
  },
  computed: {
        ...mapState(usePhotosStore, ['loading', 'numberCartItems', 'cartItems', 'totalPrice'])
  },
  data() {
    return {
      photoUrl: 'https://lh3.googleusercontent.com/d',
    }
  },
  methods: {
    ...mapActions(usePhotosStore, ['removeFromCart', 'calculateTotalPrice']),

   orderCartItems(cartItems){
      // cartItems.forEach(element => {
      //   if (element.autor === "Santi Sánchez") {
      //     // this.itemsSanti.push(element);
      //     this.itemsSanti.push(element);
      //   }
      // });
      // console.log(this.itemsSanti);
   }
    
    
  },
  created() {
    
        this.calculateTotalPrice();
        
      
  },
  mounted() {
    // this.orderCartItems(this.cartItems);
    // console.log(this.itemsSanti);
  }
}
</script>

<template>
  <div class="cart">
    <h1>This is an cart page</h1>
    
      <div class="items" v-if="cartItems.length > 0" v-for="item in cartItems">
        <div class="item">
          <img :src="this.photoUrl + '/' + item.photo"  alt="">
          <h2>{{ item.title }}</h2>
          <span>{{  item.autor }}</span>
          <div class="" v-for=" selected in item.optionsSelected">
            {{ selected.size }} {{ selected.price }}
          </div>
          
          <div @click="removeFromCart(item.title, this.totalPrice)" class="remove">Eliminar</div>
        </div>
        
      </div>
      <div class="" v-else>
        Aún no has añadido nada al carrito
      </div>
      <p>Total Price: {{ this.totalPrice }}</p>
      <!-- <PayPalButton /> -->
      <PayPalDonateButton/>
  </div>
</template>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>

<script>
import { mapState } from 'pinia';
import { mapActions } from 'pinia';
import { usePhotosStore } from '@/stores/photosStore.js';

import PayPalDonateButton from '@/components/PayPalDonateButton.vue';
import PayPalDonateButtonSanti from '@/components/PayPalDonateButtonSanti.vue';
export default {
  components: {
    PayPalDonateButton,
    PayPalDonateButtonSanti,
  },
  data(){
    return {
      photoUrl: 'https://drive.google.com/thumbnail?id=',
      itemsSanti: [],
      itemsDuna: [],
      itemsPaula: [],
      itemsLorenzo: [],
      totalSanti: 0,
      totalLorenzo: 0,
      totalDuna: 0,
      totalPaula: 0,
    }
  },
  computed: {
        ...mapState(usePhotosStore, ['loading', 'numberCartItems', 'cartItems', 'totalPrice']),

        
  },
  methods: {
    ...mapActions(usePhotosStore, ['removeFromCart', 'calculateTotalPrice']),

    filteredCartItems() {
      let itemsSanti = this.cartItems.filter(item => item.autor === "Santi Sánchez");
      let itemsLorenzo = this.cartItems.filter(item => item.autor === "Lorenzo de Nicola");
      let itemsDuna = this.cartItems.filter(item => item.autor === "Duna Vallés");
      let itemsPaula = this.cartItems.filter(item => item.autor === "Paula Grácia");
      this.itemsSanti = itemsSanti;
      this.itemsLorenzo = itemsLorenzo;
      this.itemsPaula = itemsPaula;
      this.itemsDuna = itemsDuna;
      return itemsSanti;
    },

    calculateTotalByAuthor() {
      this.itemsDuna.forEach(item => {
        this.totalDuna += item.optionsSelected[0].price;
      })
      this.itemsLorenzo.forEach(item => {
        this.totalLorenzo += item.optionsSelected[0].price;
      })
      this.itemsPaula.forEach(item => {
        this.totalPaula += item.optionsSelected[0].price;
      })
      this.itemsSanti.forEach(item => {
        this.totalSanti += item.optionsSelected[0].price;
      })
      
    }
  },
  created() {
    this.calculateTotalPrice();
    
  },
  mounted() {
    this.filteredCartItems();
    this.calculateTotalByAuthor();
  }
}
</script>

<template>
  <div class="cart">
    <h1>This is an cart page</h1>

    <div class="autor-block duna" v-if="itemsDuna.length > 0">
      <div class="items" v-if="itemsDuna.length > 0" v-for="item in itemsDuna">
        <div class="item">
            <img :src="this.photoUrl  + item.photo + '&sz=w600-h600'"  alt="">
            <h2>{{ item.title }}</h2>
            <span>{{  item.autor }}</span>
            <div class="" v-for=" selected in item.optionsSelected">
              {{ selected.size }} {{ selected.price }}
            </div>
            
            <div @click="removeFromCart(item.title, this.totalPrice)" class="remove">Eliminar</div>
        </div>
       
      </div>
      <p>Total Price: {{ this.totalDuna }}</p>
        <!-- <PayPalButton /> -->
        <PayPalDonateButton/>
    </div>

    <div class="autor-block lorenzo" v-if="itemsLorenzo.length > 0">
      <div class="items" v-if="itemsLorenzo.length > 0" v-for="item in itemsLorenzo">
        <div class="item">
            <img :src="this.photoUrl  + item.photo + '&sz=w600-h600'"  alt="">
            <h2>{{ item.title }}</h2>
            <span>{{  item.autor }}</span>
            <div class="" v-for=" selected in item.optionsSelected">
              {{ selected.size }} {{ selected.price }}
            </div>
            
            <div @click="removeFromCart(item.title, this.totalPrice)" class="remove">Eliminar</div>
        </div>
       
      </div>
      <p>Total Price: {{ this.totalLorenzo }}</p>
        <!-- <PayPalButton /> -->
        <PayPalDonateButton/>
    </div>

    <div class="autor-block paula" v-if="itemsPaula.length > 0">
      <div class="items" v-if="itemsPaula.length > 0" v-for="item in itemsPaula">
        <div class="item">
            <img :src="this.photoUrl  + item.photo + '&sz=w600-h600'"  alt="">
            <h2>{{ item.title }}</h2>
            <span>{{  item.autor }}</span>
            <div class="" v-for=" selected in item.optionsSelected">
              {{ selected.size }} {{ selected.price }}
            </div>
            
            <div @click="removeFromCart(item.title, this.totalPrice)" class="remove">Eliminar</div>
        </div>
       
      </div>
      <p>Total Price: {{ this.totalPaula }}</p>
        <!-- <PayPalButton /> -->
        <PayPalDonateButton/>
    </div>

    <div class="autor-block santi" v-if="itemsSanti.length > 0">
      <div class="items" v-if="itemsSanti.length > 0" v-for="item in itemsSanti">
        <div class="item">
            <img :src="this.photoUrl  + item.photo + '&sz=w600-h600'"  alt="">
            <h2>{{ item.title }}</h2>
            <span>{{  item.autor }}</span>
            <div class="" v-for=" selected in item.optionsSelected">
              {{ selected.size }} {{ selected.price }}
            </div>
            
            <div @click="removeFromCart(item.title, this.totalPrice)" class="remove">Eliminar</div>
        </div>
        
      </div>
      <p>Total Price: {{ this.totalSanti }}</p>
        <!-- <PayPalButton /> -->
        <PayPalDonateButtonSanti/>
        <a :href="'https://wa.me/+34695501618?text=Estoy%20interesada%20en%20' + this.itemsSanti" target="_blank" style="display:inline-block;background-color:#25d366;padding:10px 24px;color:#fff;font-size:16px;line-height:1.5;border-radius:2px;text-decoration:none;">Contactar</a>
    </div>

    

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
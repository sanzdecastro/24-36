
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
      msgSanti: '',
      msgDuna: '',
      msgPaula: '',
      msgLorenzo: '',
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
      this.msgSanti = this.itemsSanti.map(phrase => {
          console.log(phrase);
          console.log(phrase.title + phrase.optionsSelected[0].price + phrase.optionsSelected[0].size + this.totalSanti);
          return `🖼️ ${phrase.title} de la medida ${phrase.optionsSelected[0].size}cm y precio ${phrase.optionsSelected[0].price}€`;
      }).join(' ');
      this.msgPaula = this.itemsPaula.map(phrase => {
          console.log(phrase);
          console.log(phrase.title + phrase.optionsSelected[0].price + phrase.optionsSelected[0].size + this.totalSanti);
          return `🖼️ ${phrase.title} de la medida ${phrase.optionsSelected[0].size}cm y precio ${phrase.optionsSelected[0].price}€`;
      }).join(' ');
      this.msgLorenzo = this.itemsLorenzo.map(phrase => {
          console.log(phrase);
          console.log(phrase.title + phrase.optionsSelected[0].price + phrase.optionsSelected[0].size + this.totalSanti);
          return `🖼️ ${phrase.title} de la medida ${phrase.optionsSelected[0].size}cm y precio ${phrase.optionsSelected[0].price}€`;
      }).join(' ');
      this.msgDuna = this.itemsDuna.map(phrase => {
          console.log(phrase);
          console.log(phrase.title + phrase.optionsSelected[0].price + phrase.optionsSelected[0].size + this.totalSanti);
          return `🖼️ ${phrase.title} de la medida ${phrase.optionsSelected[0].size}cm y precio ${phrase.optionsSelected[0].price}€`;
      }).join(' ');
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
    <h1>Encarga tus láminas contactando con el/la autorx de las fotografías seleccionadas</h1>
    
    <div class="autor-block duna" v-if="itemsDuna.length > 0">
      <h3>Duna Vallés</h3>
      <div class="item" v-if="itemsDuna.length > 0" v-for="item in itemsDuna">
        <div class="image-container">
         
          <img :src="this.photoUrl  + item.photo + '&sz=w600-h600'"  alt="">
          </div>
          <div class="item-info">
            <h2>{{ item.title }}</h2>
           
            <div class="options" v-for=" selected in item.optionsSelected">
              <span>{{ selected.size }} cm</span> <span>{{ selected.price }}€</span>
            </div>
            
            <div @click="removeFromCart(item.title, this.totalPrice)" class="remove">Eliminar</div>
        </div>
       
      </div>
      <div class="subtotal">
        <div class="total"><p>Total</p><p>{{ this.totalDuna }}€</p></div>
        <div class="button-container">
          <a class="button whats" :href="'https://wa.me/+34695501618?text=Estoy%20interesada%20en%20' + this.msgDuna" target="_blank">WhatsApp</a>
          <a class="button pay" :href="'https://wa.me/+34695501618?text=Estoy%20interesada%20en%20' + this.itemsSanti" target="_blank">PayPal</a>
        </div>
      </div>

        <!-- <PayPalDonateButton/> -->
    </div>

    <div class="autor-block lorenzo" v-if="itemsLorenzo.length > 0">
      <h3>Lorenzo de Nicola</h3>
      <div class="item" v-if="itemsLorenzo.length > 0" v-for="item in itemsLorenzo">
        <div class="image-container">
            <img :src="this.photoUrl  + item.photo + '&sz=w600-h600'"  alt="">
          </div>
            <div class="item-info">
            <h2>{{ item.title }}</h2>
            <div class="options" v-for=" selected in item.optionsSelected">
              <span>{{ selected.size }} cm</span> <span>{{ selected.price }}€</span>
            </div>
            
            <div @click="removeFromCart(item.title, this.totalPrice)" class="remove">Eliminar</div>
        </div>
       
      </div>
      <div class="subtotal">
        <div class="total"><p>Total</p><p>{{ this.totalLorenzo }}€</p></div>
        <div class="button-container">
          <a class="button whats" :href="'https://wa.me/+34695501618?text=Estoy%20interesada%20en%20' + this.msgLorenzo" target="_blank">WhatsApp</a>
          <a class="button pay" :href="'https://wa.me/+34695501618?text=Estoy%20interesada%20en%20' + this.itemsSanti" target="_blank">PayPal</a>
        </div>
      </div>
      
        <!-- <PayPalDonateButton/> -->
    </div>

    <div class="autor-block paula" v-if="itemsPaula.length > 0">
      <h3>Paula Grácia</h3>
      <div class="item" v-if="itemsPaula.length > 0" v-for="item in itemsPaula">
        <div class="image-container">
            <img :src="this.photoUrl  + item.photo + '&sz=w600-h600'"  alt="">
            </div>
            <div class="item-info">
            <h2>{{ item.title }}</h2>
            <div class="options" v-for=" selected in item.optionsSelected">
              <span>{{ selected.size }} cm</span> <span>{{ selected.price }}€</span>
            </div>
            
            <div @click="removeFromCart(item.title, this.totalPrice)" class="remove">Eliminar</div>
        </div>
       
      </div>
        <!-- <PayPalDonateButton/> -->
      <div class="subtotal">
        <div class="total"><p>Total</p><p>{{ this.totalPaula }}€</p></div>
        <div class="button-container">
          <a class="button whats" :href="'https://wa.me/+34695501618?text=Estoy%20interesada%20en%20' + this.msgPaula" target="_blank">WhatsApp</a>
          <a class="button pay" :href="'https://wa.me/+34695501618?text=Estoy%20interesada%20en%20' + this.itemsSanti" target="_blank">PayPal</a>
        </div>
      </div>
    </div>

    <div class="autor-block santi" v-if="itemsSanti.length > 0">
      <h3>Santi Sánchez</h3>
      <div class="item" v-if="itemsSanti.length > 0" v-for="item in itemsSanti">
        
        <div class="image-container">
          <img :src="this.photoUrl  + item.photo + '&sz=w600-h600'"  alt="">
          </div>
            <div class="item-info">
            <h2>{{ item.title }}</h2>
            <div class="options" v-for=" selected in item.optionsSelected">
              <span>{{ selected.size }} cm</span> <span>{{ selected.price }}€</span>
            </div>
            
            <div @click="removeFromCart(item.title, this.totalPrice)" class="remove">Eliminar</div>
        </div>
        
      </div>
      <div class="subtotal">
        <div class="total"><p>Total</p><p>{{ this.totalSanti }}€</p></div>
        <div class="button-container">
          <a class="button whats" :href="'https://wa.me/+34695501618?text=Me%20gustaría%20recibir%20' + this.msgSanti" target="_blank">WhatsApp</a>
          <a class="button pay" :href="'https://wa.me/+34695501618?text=Estoy%20interesada%20en%20' + this.msgSanti.optionsSelected" target="_blank">PayPal</a>
        </div>
      </div>
     
    </div>

    

  </div>
</template>

<style>

  
.cart {
  margin-top: max(200 * var(--r), 200px);
  padding: max(20 * var(--r), 20px);
  padding-bottom: max(100 * var(--r), 100px);
  @apply
  relative
  bg-white;
  &:after {
    content: '';
    @apply
    absolute
    w-full
    h-6
    left-0
    -top-6
    bg-gradient-to-b
    from-transparent
    to-white;
  }
  @media screen and (min-width: 1200px) {
    max-width: 500px;
    margin: 0 auto;
    margin-top: max(200 * var(--r), 200px);
    
  }
}

.cart h1 {
  font-size: max(20 * var(--r), 20px);
  line-height: max(24 * var(--r), 24px);
  margin-bottom: max(40 * var(--r), 40px);
}

.cart .autor-block {
  @apply
  flex
  gap-2
  flex-col;
  margin-bottom: max(40 * var(--r), 40px);
}

.bag_container .bag {
  &:before {
    @apply
    hidden;
  }
}

.cart .autor-block .item {
  @apply
  flex
  gap-2;
}

.cart .autor-block h2 {
  font-size: max(30 * var(--r), 30px);
  line-height: max(30 * var(--r), 30px);
  margin-bottom: max(10 * var(--r), 10px);
}

.cart .autor-block > h3 {
  font-family: 'Sometimes';
  font-size: max(24 * var(--r), 24px);
  line-height: max(28 * var(--r), 28px);
  margin-bottom: max(10 * var(--r), 10px);
}

.cart .autor-block  h3 {
  font-family: 'Sometimes';
  font-size: max(30 * var(--r), 30px);
  line-height: max(30 * var(--r), 30px);
  border-top: 1px solid black;
  padding-top: max(10 * var(--r), 10px);
  padding-bottom: max(20 * var(--r), 20px);
}

.cart .autor-block .options {
  @apply
  flex
  gap-0
  flex-col;
}

.cart .autor-block .options span {
  @apply
  block;
}

.cart .autor-block .item .image-container, .cart .autor-block .item .item-info {
  @apply
  flex-1;
}

.cart .subtotal {
  padding-top: max(20 * var(--r), 20px);
  @apply
  flex
  flex-col;
}

.cart .subtotal .total {
  @apply
  w-full
  justify-between
  flex;
}

.cart .subtotal p {
  font-size: max(20 * var(--r), 20px);
  margin-bottom: max(20 * var(--r), 20px);
}

.cart .subtotal .button-container {

  @apply
  flex
  flex-col
  gap-2
  text-center;
}

</style>
<script>
import { mapState } from 'pinia';
import { mapActions } from 'pinia';
import { usePhotosStore } from '@/stores/photosStore.js';


export default {
  name: 'PayPalDonateButton',
  computed: {
        ...mapState(usePhotosStore, ['totalPrice'])
  },
  mounted() {
    let totalPrice = this.totalPrice.toString();
    this.$loadScript("https://www.paypalobjects.com/donate/sdk/donate-sdk.js")
     .then(() => {
        window.PayPal.Donation.Button({
          env: 'production', // Cambia a 'sandbox' para pruebas
          
          business: 'sanzdecastro@gmail.com', // Reemplaza con tu correo de PayPal
          amount: totalPrice,
          image: {
            src: '',
            title: 'PayPal - The safer, easier way to pay online!',
            alt: 'Donate with PayPal button'
          },
          // Agrega más opciones según sea necesario
        }).render('#paypal-donate-button-container');
      })
     .catch((error) => {
        console.error('Error loading PayPal Donation SDK:', error);
      });
  }
};
</script>
<template>
    <div>
   
      <div id="paypal-donate-button-container">Dona</div>
    </div>


  </template>
<script>
import { mapState } from 'pinia';
import { mapActions } from 'pinia';
import { usePhotosStore } from '@/stores/photosStore.js';


export default {
  name: 'PayPalDonateButtonSanti',
  // computed: {
  //       ...mapState(usePhotosStore, ['totalPrice'])
  // },
  mounted() {
    this.$forceUpdate(); 
    // let totalPrice = this.totalPrice.toString();
    this.$loadScript("https://www.paypalobjects.com/donate/sdk/donate-sdk.js")
     .then(() => {
        window.PayPal.Donation.Button({
          env: 'production', // Cambia a 'sandbox' para pruebas
          business: 'sanzdecastro@gmail.com', // Reemplaza con tu correo de PayPal
          amount: '10',
          image: {
            src: '',
            title: 'PayPal - The safer, easier way to pay online!',
            alt: 'Donate with PayPal button'
          },
          // Agrega más opciones según sea necesario
        }).render('.paypal-donate-button-container-santi');
      })
     .catch((error) => {
        console.error('Error loading PayPal Donation SDK:', error);
      });
  }
};
</script>
<template>
    <div>
      <div class="paypal-donate-button-container-santi">Dona</div>
    </div>
</template>
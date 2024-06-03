<script>
import { mapState } from 'pinia';
import { mapActions } from 'pinia';
import { usePhotosStore } from '@/stores/photosStore.js';

export default {
  name: 'PayPalButton',
  computed: {
        ...mapState(usePhotosStore, ['totalPrice'])
  },
  mounted() {
    const script = document.createElement('script');
    script.src = "https://www.paypal.com/sdk/js?client-id=AUsETOx9miHnva40TNv7fxkU51VanwTpc_vyMjy5Lo0AstR-FjX5lsP2Ib6dLheyTQdt09qhtsGZlAxa&currency=EUR";
    script.async = true;
    document.body.appendChild(script);
    let totalPrice = this.totalPrice.toString();
    console.log(totalPrice);
    script.onload = () => {
      paypal.Buttons({
        createOrder: function(data, actions) {
          // Configuración de la creación del pedido
          return actions.order.create({
                purchase_units: [{
                amount: {
                    value: totalPrice, // El monto del pedido
                }
                }]
            });
        },
        onApprove: function(data, actions) {
          // Manejo de la aprobación del pedido
          // Captura el ID del pedido aprobado
            const orderId = data.orderID;

            // Envía el ID del pedido a tu servidor para confirmar el pago
            fetch('/confirm-payment/' + orderId, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            }
            }).then(function(response) {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error('Error confirming payment: ' + response.statusText);
            }
            }).then(function(jsonResponse) {
            // Maneja la respuesta de tu servidor aquí
            console.log('Payment confirmed successfully:', jsonResponse);
            }).catch(function(error) {
            // Maneja errores aquí
            console.error('Error during payment confirmation:', error);
            });
        }
      }).render('#paypal-button-container'); // Asegúrate de que el ID coincide con el del contenedor en el template
    };
  }
};
</script>

<template>
    <div>
      <!-- Contenedor para el botón de PayPal -->
      <div id="paypal-button-container"></div>
    </div>
  </template>
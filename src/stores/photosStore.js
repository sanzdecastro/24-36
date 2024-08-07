import { defineStore } from 'pinia';
import { gsap } from "gsap";

export const usePhotosStore = defineStore('photosStore', {
    state: () => ({
      loading: true,
      // Todo el data
      data: [],
      // Data por autor
      dataLorenzo: [],
      dataDuna: [],
      dataSanti: [],
      dataPaula: [],
      // Info autores
      autores: [],
      // Combinamos los arrays/datas
      dataReel: [],
      dataReelRandom: [],
      // Info de cada ficha
      selectedPhoto: [],
      sizeOptions: [],
      // Cart
      cartItems: [],
      numberCartItems: 0,
      totalPrice: 0,
    }),
    getters: {
    },
    actions: {
        async fetchData() {
            try {
                let response = await fetch("https://script.googleusercontent.com/macros/echo?user_content_key=KB69RUqjZ8gBYSrEzYC38njuPOL5JxHeKyOfgTHKXDKVHPHDQW2lKXB3b6-mYJSaN1pj2i57mkjt1FEL7Q-aPNIX9OIyPVtSm5_BxDlH2jW0nuo2oDemN9CCS2h10ox_1xSncGQajx_ryfhECjZEnPBJTDxdTFGd_7xWdUp2pRcUMOkvhJras2m57cyH16Q7r33u9qjxKHtlvE9_oyKsOMyD4Btlz2tsuxptRjGWTtPLmBTVK5tbAtz9Jw9Md8uu&lib=MK7W_QqRaw6yysaSkdZIloXe3xnvQUYfV");
                let data = await response.json();
                console.log(data);
                this.dataLorenzo = data['Lorenzo de Nicola'];
                this.dataSanti = data['Santi Sánchez'];
                this.dataPaula = data['Paula Grácia'];
                this.dataDuna = data['Duna Vallés'];
                this.autores =  data['Autorxs'];
               
              }
              catch(error) {
                console.log(error);
              }
              finally {
                this.dataReel = [...this.dataLorenzo,...this.dataDuna,...this.dataSanti,...this.dataPaula],
                this.dataReelRandom = this.dataReel.sort((a, b) => Math.random() - 0.5);
                console.log("done")
                // console.log(this.loading)
                this.loading = false;
              }
          },
          async updateSelectedPhoto(photo) {
            this.selectedPhoto = photo.title;
            this.dataReel.forEach(photoItem => {
              if ( photoItem.title === this.selectedPhoto) {
                this.selectedPhoto = photoItem;
                this.sizeOptions = [
                  {"20x30": photoItem.size20x30 || "No size 20x30",
                  "40x60" : photoItem.size40x60 || "No size 40x60"}
                ]
              }
            })
            console.log(this.sizeOptions)
          },
          addToCart(photo, title, autor, optionsSelected) {
            let item = {
              photo: photo,
              title: title,
              autor: autor,
              optionsSelected: optionsSelected
            }

            this.cartItems.push(item)

            let bagActual = document.querySelector(".bag span");
            const tl = gsap.timeline();

            tl.to(bagActual, {
              duration: .6,
              xPercent: -100,
              rotation: 15,
              autoAlpha: 0,
              ease: "power2.out",
              onComplete: () => {
                this.numberCartItems = this.numberCartItems + 1;
              }
            }).to(bagActual, {
              duration:0,
              rotation: -15,
              xPercent: 100,
            }).to(bagActual, {
              duration: .6,
              xPercent: 0,
              autoAlpha: 1,
              rotation: 0,
              ease: "power2.in"
            })


            // this.numberCartItems = this.numberCartItems + 1;
            console.log(this.cartItems);
            console.log(this.numberCartItems);
            this.setLocal()
          },
          removeFromCart(title){
            this.cartItems.forEach(item => {
              if(item.title === title){
                let index = this.cartItems.indexOf(item)
                console.log(index);
                this.cartItems.splice(index, 1);
                this.numberCartItems = this.cartItems.length;
                this.setLocal()
              }
            });
           
            window.location.reload()
            
            
          },
          calculateTotalPrice() {
            console.log(this.cartItems);
            this.totalPrice = 0;
      
            this.cartItems.forEach(element => {
              console.log(element.optionsSelected);
              element.optionsSelected.forEach(element => {
                console.log(element.price)
                this.totalPrice += element.price;
                
              })

            });
            console.log(this.totalPrice)
          },
          setLocal() {
            localStorage.setItem("itemsCart", JSON.stringify(this.cartItems));
            localStorage.setItem("numberCartItems", JSON.stringify(this.numberCartItems));
          },
          getLocal() {
            // Carga los items del carrito desde localStorage al iniciar la tienda
            const savedItemsCart = localStorage.getItem("itemsCart");
            const savedNumberCart = localStorage.getItem("numberCartItems");
            if (savedItemsCart) {
              this.cartItems = JSON.parse(savedItemsCart);
              this.numberCartItems = JSON.parse(savedNumberCart);
              console.log(this.cartItems);
            }
          },
    },
    
})
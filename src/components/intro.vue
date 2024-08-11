<script>
import { gsap } from "gsap";

export default {
name: 'intro',
  mounted() {
    this.animateIntro();
  },
  methods: {

    animateIntro() {

        var tl = gsap.timeline({
            
        });

        var tl2 = gsap.timeline({
            
        });



        let line1 = document.querySelectorAll(".intro-container .line1");
        let items = document.querySelectorAll(".intro-container .line img");

        gsap.set(line1, {
            yPercent: 10,
        })

        gsap.set(items, {
            autoAlpha: 0,
        })

        gsap.to(items, {
            autoAlpha: 1,
            duration: .7,
            stagger: .03,
        })

        tl.to(line1, {
            yPercent: -0,
            stagger: .2,
            ease: "power1.out",
        }).to(line1, {
            delay: .1,
            yPercent: -10,
            stagger: .2,
            ease: "power1.out",
        }).to(line1, {
            delay: .1,
            yPercent: -20,
            stagger: .2,
            ease: "power1.out",
        }).to(line1, {
            delay: .1,
            yPercent: -30,
            stagger: .2,
            ease: "power1.out",
        }).to(line1, {
            delay: .1,
            yPercent: -40,
            stagger: .2,
            ease: "power1.out",
            autoAlpha: 0,
        });

        let line2 = document.querySelectorAll(".intro-container .line2");

        gsap.set(line2, {
            yPercent: -10,
        })
        tl2.to(line2, {
            yPercent: 0,
            stagger: .2,
            ease: "power1.out",
        }).to(line2, {
            delay: .1,
            yPercent: 10,
            stagger: .2,
            ease: "power1.out",
        }).to(line2, {
            delay: .1,
            yPercent: 20,
            stagger: .2,
            ease: "power1.out",
        }).to(line2, {
            delay: .1,
            yPercent: 30,
            stagger: .2,
            ease: "power1.out",
        }).to(line2, {
            delay: .1,
            yPercent: 40,
            stagger: .2,
            ease: "power1.out",
            autoAlpha: 0,
             onComplete: function(){ gsap.to (".intro-container", {
                pointerEvents: "none",
                autoAlpha: 0,
            })}
        });
    }
  }
}
</script>

<template>
    <div class="intro-container">
       
            <div class="line line1">
                <img src="../assets/images/01.jpg">
                <img src="../assets/images/02.jpg">
                <img src="../assets/images/03.jpg">
                <img src="../assets/images/04.jpg">
                <span>24</span>
            </div>
            <div class="guion"><div>—</div></div>
            <div class="line line2">
                <span>36</span>
                <img src="../assets/images/05.jpg">
                <img src="../assets/images/06.jpg">
                <img src="../assets/images/07.jpg">
                <img src="../assets/images/08.jpg">
                
            </div>
            


    </div>
</template>

<style>
.intro-container {
    
    width: 100vw;
    height: 100vh;
    @apply
    z-50
    bg-white
    overflow-hidden
    flex
    justify-center
    items-center
    top-0
    left-0
    flex
    fixed;
}

.intro-container .mask {
    @apply

    flex;
}

.intro-container .line {
    
    @apply
    flex-col
    flex;
}

.intro-container .line img, .intro-container .line span {
    height: 25vh;
    width: auto;
    padding-bottom: max(20 * var(--r), 20px);
    @apply
    flex
    items-center
    justify-center;
}

.intro-container span, .intro-container div  {
    font-family: 'Sometimes';
    font-size: max(120 * var(--r), 120px);
    line-height:  max(120 * var(--r), 120px);
    @apply
    flex
    justify-center
    items-center
    block;
}
</style>
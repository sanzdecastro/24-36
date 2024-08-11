<script>
import { gsap } from "gsap";

export default {
name: 'loading',
  mounted() {
    this.animateLoading();
  },
  methods: {

    animateLoading() {

        var tl = gsap.timeline({
            repeat: -1,
        });

        let logoLoading = document.querySelectorAll(".loading-container span");

        gsap.set(logoLoading, {
            yPercent: 100,
            autoAlpha: 0,
        })

        gsap.to(".loading-container span", {
            autoAlpha: 1,
        })
        tl.to(logoLoading, {
            yPercent: 0,
            stagger: .2,
            ease: "power1.out",
        }).to(logoLoading, {
            delay: .1,
            yPercent: -100,
            stagger: .2,
            ease: "power1.out",
        });
    }
  }
}
</script>

<template>
    <div class="loading-container">
        <div class="mask">
            <span>24</span><div>—</div><span>36</span>
        </div>
    </div>
</template>

<style>
.loading-container {
    width: 100vw;
    height: 100vh;
    @apply
    bg-white
    overflow-hidden
    z-20
    flex
    justify-center
    items-center
    top-0
    left-0
    fixed;
}

.loading-container .mask {
    @apply
    overflow-hidden
    flex;
}

.loading-container span, .loading-container div  {
    font-family: 'Sometimes';
    font-size: max(120 * var(--r), 120px);
    line-height:  max(120 * var(--r), 120px);
    @apply
    block;
}
</style>
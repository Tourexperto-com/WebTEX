<template>
    <section>
        <CarouselStatic :slides-per-view="{base: 1.2, sm: 2.2, md: 3}" class="lg:hidden">
            <NuxtImg v-for="(item, index) in banners" :key="index" :src="item.img" :alt="item.alt" class="rounded-[18px] shadow-1" />
        </CarouselStatic>
        <div class="hidden lg:flex gap-4">
            <NuxtImg v-for="(item, index) in bannersDesktop" :key="index" :src="item.img" :alt="item.alt" class="first:w-1/2 w-1/4 rounded-[36px]" />
        </div>
    </section>
</template>

<script setup>
const banners = [
    {
        img: "/images/ventajas/banner-a.jpeg",
        alt: "",
    },
    {
        img: "/images/ventajas/banner-b.jpeg",
        alt: "",
    },
    {
        img: "/images/ventajas/banner-c.jpeg",
        alt: "",
    },
];

const bannersDesktop = [
    {
        img: "/images/ventajas/banner-a-desktop.png",
        alt: "",
    },
    {
        img: "/images/ventajas/banner-b-desktop.png",
        alt: "",
    },
    {
        img: "/images/ventajas/banner-c-desktop.png",
        alt: "",
    },
];
</script>
<template>
    <section>
        <CarouselStatic :slides-per-view="{base: 1.2, sm: 2.2, md: 3}">
            <NuxtImg v-for="(item, index) in banners" :key="index" :src="item.img" :alt="item.alt" class="rounded-[18px] shadow-1" />
        </CarouselStatic>
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
</script>
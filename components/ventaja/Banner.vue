<template>
    <section>
        <CarouselStatic>
            <NuxtImg v-for="(item, index) in banners" :key="index" :src="item.img" :alt="item.alt" class="h-52 rounded-[18px] shadow-1 first-of-type:ml-4 last-of-type:mr-4" />
        </CarouselStatic>
    </section>
</template>

<script setup>
const banners = [
    {
        img: "/images/ventajas/banner-a.png",
        alt: "",
    },
    {
        img: "/images/ventajas/banner-b.png",
        alt: "",
    },
    {
        img: "/images/ventajas/banner-c.png",
        alt: "",
    },
];
</script>
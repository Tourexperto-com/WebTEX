<template>
    <DefaultSection class="px-4 lg:px-0">
        <HeadingH2 class="text-center text-secondary">Elige tu próxima aventura de viaje por categoría</HeadingH2>

        <CarouselAutoplay 
            :auto-play="true" 
            :auto-play-interval="2500" 
            :show-dots="true" 
            :slides-per-view="{base: 2, sm: 2, md: 2, lg: 5, xl: 5}"
            :gap="{base: 8, lg: 16}">
            <NuxtLink to="#" v-for="(categoria, index) in categorias" :key="index"
                class="relative snap-start flex-shrink-0">
                <NuxtImg :src="categoria.img" :alt="categoria.titulo"
                    class="lg:h-[260px] object-cover rounded-[18px]" />
                <div
                    class="flex flex-col justify-end absolute inset-0 bg-gradient-to-t from-[#200033] via-transparent via-60% to-transparent rounded-[18px] px-3 lg:px-7 lg:pb-6 pb-4">
                    <HeadingH3 class="text-light z-10">{{ categoria.titulo }}</HeadingH3>
                </div>
            </NuxtLink>
        </CarouselAutoplay>
    </DefaultSection>
</template>

<script setup>
const categorias = [
    {
        slug: 'aventura-safaris',
        titulo: 'Aventura y safaris',
        img: '/images/categorias/cruceros.png',
    },
    {
        slug: 'exoticos',
        titulo: 'Exóticos',
        img: '/images/categorias/lgbtq.png',
    },
    {
        slug: 'playas',
        titulo: 'Playas',
        img: '/images/categorias/cruceros.png',
    },
    {
        slug: 'religiosos',
        titulo: 'Religiosos',
        img: '/images/categorias/lgbtq.png',
    },
    {
        slug: 'lgbtq',
        titulo: 'LGBTQ+',
        img: '/images/categorias/cruceros.png',
    },
    {
        slug: 'cruceros',
        titulo: 'Cruceros fluviales y marítimos',
        img: '/images/categorias/lgbtq.png',
    },
    {
        slug: 'cultura',
        titulo: 'Cultura y patrimonio',
        img: '/images/categorias/cruceros.png',
    },
    {
        slug: 'mujeres',
        titulo: 'Viaje de mujeres',
        img: '/images/categorias/lgbtq.png',
    },
    {
        slug: 'premier',
        titulo: 'Viajes premier',
        img: '/images/categorias/cruceros.png',
    },
    {
        slug: 'wellness',
        titulo: 'Yoga, meditación y spa',
        img: '/images/categorias/lgbtq.png',
    },
]
</script>
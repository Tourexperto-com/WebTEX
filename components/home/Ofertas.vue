<template>
    <DefaultSection class="!gap-0">
        <div class="w-full flex flex-col items-center gap-3 bg-gradient-violet pt-6 pb-28">
            <div class="flex flex-col items-center gap-2">
                <HeadingH2 class="text-white">Ofertas especiales</HeadingH2>
                <p class="text-center text-white text-sm">Explora nuestros tours con descuentos</p>
            </div>
            <ButtonPrimary>Ver tours en oferta</ButtonPrimary>
        </div>
        <div class="w-full -mt-[5.5rem]">
            <CarouselStatic>
                <NuxtLink :to="oferta.url" v-for="(oferta, index) in ofertas" :key="index"
                    class="max-w-[214px] flex flex-col gap-2 relative bg-white rounded-[18px] shadow-1 p-2 pb-3 first-of-type:ml-4 last-of-type:mr-4">
                    <NuxtImg :src="oferta.img" :alt="`${oferta.descuento} ${oferta.descripcion}`"
                        class="w-full h-28 object-cover rounded-[10px]" />
                    <NuxtImg v-if="oferta.sticker" :src="oferta.sticker" alt=""
                        class="w-16 h-16 absolute top-5 right-5" />
                    <p class="text-sm text-primary font-bold px-2">{{ oferta.descuento }} <span
                            class="text-secondary font-semibold">{{ oferta.descripcion }}</span></p>
                </NuxtLink>
            </CarouselStatic>
        </div>
    </DefaultSection>
</template>

<script setup>
const ofertas = [
    {
        url: '#',
        img: '/images/home/ofertas/europa.jpg',
        sticker: '/images/home/ofertas/sticker.png',
        descuento: 'Ofertas hasta 15% OFF ',
        descripcion: 'en tours por Europa',
    },
    {
        url: '#',
        img: '/images/home/ofertas/europa.jpg',
        sticker: '/images/home/ofertas/sticker.png',
        descuento: 'Ofertas hasta 20% OFF ',
        descripcion: 'en tours por USA, Canadá y México',
    },
    {
        url: '#',
        img: '/images/home/ofertas/europa.jpg',
        sticker: '/images/home/ofertas/sticker.png',
        descuento: 'Ofertas hasta 25% OFF ',
        descripcion: 'en tours por Asia y Oceanía',
    },
    {
        url: '#',
        img: '/images/home/ofertas/europa.jpg',
        sticker: '/images/home/ofertas/sticker.png',
        descuento: 'Ofertas hasta 18% OFF ',
        descripcion: 'en tours por Sudamérica',
    },
    {
        url: '#',
        img: '/images/home/ofertas/europa.jpg',
        sticker: '/images/home/ofertas/sticker.png',
        descuento: 'Ofertas hasta 30% OFF ',
        descripcion: 'en tours por África',
    },
    {
        url: '#',
        img: '/images/home/ofertas/europa.jpg',
        sticker: '/images/home/ofertas/sticker.png',
        descuento: 'Ofertas hasta 12% OFF ',
        descripcion: 'en tours por el Caribe',
    },
    {
        url: '#',
        img: '/images/home/ofertas/europa.jpg',
        sticker: '/images/home/ofertas/sticker.png',
        descuento: 'Ofertas hasta 22% OFF ',
        descripcion: 'en tours por Medio Oriente',
    },
];
</script>
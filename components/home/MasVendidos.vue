<template>
    <section class="flex flex-col gap-3 py-6">
        <HeadingH2 class="text-center text-secondary">Los más vendidos</HeadingH2>
        <CarouselStatic :scroll-amount="280">
            <ProductCard v-for="(producto, index) in productos" :key="index" :producto="producto"
                class="w-48 flex-shrink-0 first-of-type:ml-4 last-of-type:mr-4" />
        </CarouselStatic>
    </section>
</template>

<script setup>
const productos = [
    {
        url: '#',
        titulo: 'Madrid, París, Alpes e Italia “clásico”',
        img: '/images/product/product.jpg',
        sticker: '/images/product/sticker.png',
        duracion: '13 días/12 noches',
        iniciaFinaliza: 'Berlín/Viena',
        precio: "2.000",
        precioTachado: "2.200",
        calificacion: "Excelente"
    },
];
</script>
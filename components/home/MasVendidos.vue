<template>
    <DefaultSection>
        <HeadingH2 class="text-center text-secondary">Los más vendidos</HeadingH2>
        <CarouselStatic>
            <ProductCard v-for="(producto, index) in productos" :key="index" :producto="producto"
                class="w-48 flex-shrink-0 first-of-type:ml-4 last-of-type:mr-4" />
        </CarouselStatic>
    </DefaultSection>
</template>

<script setup>
const productos = [
    {
        url: '#',
        titulo: 'Madrid, París, Alpes e Italia "clásico"',
        img: '/images/product/product.jpg',
        sticker: '/images/product/sticker.png',
        duracion: '13 días/12 noches',
        iniciaFinaliza: 'Berlín/Viena',
        precio: "2.000",
        precioTachado: "2.200",
        calificacion: "Excelente"
    },
    {
        url: '#',
        titulo: 'Londres, Amsterdam y Bruselas',
        img: '/images/product/product.jpg',
        sticker: '/images/product/sticker.png',
        duracion: '8 días/7 noches',
        iniciaFinaliza: 'Ciudad del Cabo/Ciudad del Cabo',
        precio: "1.500",
        calificacion: "Muy bueno"
    },
    {
        url: '#',
        titulo: 'Circuito por Escandinavia',
        img: '/images/product/product.jpg',
        duracion: '15 días/14 noches',
        iniciaFinaliza: 'Estocolmo/Oslo',
        precio: "2.800",
        precioTachado: "3.200",
        calificacion: "Excelente"
    },
    {
        url: '#',
        titulo: 'Barcelona, Niza y Roma Express',
        img: '/images/product/product.jpg',
        duracion: '10 días/9 noches',
        iniciaFinaliza: 'Barcelona/Roma',
        precio: "1.800",
        precioTachado: "2.100",
        calificacion: "Bueno"
    },
    {
        url: '#',
        titulo: 'Praga, Viena y Budapest Imperial',
        img: '/images/product/product.jpg',
        sticker: '/images/product/sticker.png',
        duracion: '12 días/11 noches',
        iniciaFinaliza: 'Praga/Budapest',
        precio: "2.300",
        precioTachado: "2.600",
        calificacion: "Excelente"
    },
    {
        url: '#',
        titulo: 'Grecia Clásica y Islas',
        img: '/images/product/product.jpg',
        sticker: '/images/product/sticker.png',
        duracion: '14 días/13 noches',
        iniciaFinaliza: 'Atenas/Santorini',
        precio: "2.500",
        precioTachado: "2.900",
        calificacion: "Muy bueno"
    },
    {
        url: '#',
        titulo: 'Suiza y Alemania Romántica',
        img: '/images/product/product.jpg',
        sticker: '/images/product/sticker.png',
        duracion: '11 días/10 noches',
        iniciaFinaliza: 'Zurich/Munich',
        precio: "2.200",
        precioTachado: "2.500",
        calificacion: "Excelente"
    }
];
</script>
<template>
    <DefaultSection>
        <HeadingH2>Tours con vuelo incluido</HeadingH2>
        <CarouselStatic :slides-per-view="{ base: 1.5, sm: 1.5, md: 3, lg: 3, lg: 6 }" class="md:hidden">
            <ProductCard v-for="(producto, index) in productos" :key="index" :producto="producto" />
        </CarouselStatic>
        <div class="hidden md:grid md:grid-cols-3 xl:grid-cols-5 md:gap-y-3 md:gap-x-2 lg:gap-4">
            <ProductCard class="xl:hidden" v-for="(producto, index) in productos.slice(0, 6)" :key="index" :producto="producto" />
            <ProductCard class="hidden xl:flex" v-for="(producto, index) in productos.slice(0, 10)" :key="index" :producto="producto" />
        </div>
        <ButtonPrimary>Ver más tours con vuelos</ButtonPrimary>
    </DefaultSection>
</template>


<script setup>
const productos = [
    {
        url: '#',
        incluido: true,
        titulo: 'Madrid, París, Alpes e Italia "clásico"',
        img: '/images/product/product.jpg',
        sticker: '/images/product/sticker.png',
        duracion: '13 días/12 noches',
        iniciaFinaliza: 'Berlín/Viena',
        salidas: "Agosto a Septiembre 2025",
        precio: "2.000",
        precioTachado: "2.200",
        calificacion: "Excelente"
    },
    {
        url: '#',
        incluido: true,
        titulo: 'Londres, Amsterdam y Bruselas',
        img: '/images/product/product.jpg',
        sticker: '/images/product/sticker.png',
        duracion: '8 días/7 noches',
        iniciaFinaliza: 'Ciudad del Cabo/Ciudad del Cabo',
        salidas: "Agosto a Septiembre 2025",
        precio: "1.500",
        calificacion: "Muy bueno"
    },
    {
        url: '#',
        incluido: true,
        titulo: 'Circuito por Escandinavia',
        img: '/images/product/product.jpg',
        duracion: '15 días/14 noches',
        iniciaFinaliza: 'Estocolmo/Oslo',
        salidas: "Agosto a Septiembre 2025",
        precio: "2.800",
        precioTachado: "3.200",
        calificacion: "Excelente"
    },
    {
        url: '#',
        incluido: true,
        titulo: 'Barcelona, Niza y Roma Express',
        img: '/images/product/product.jpg',
        duracion: '10 días/9 noches',
        iniciaFinaliza: 'Barcelona/Roma',
        salidas: "Agosto a Septiembre 2025",
        precio: "1.800",
        precioTachado: "2.100",
        calificacion: "Bueno"
    },
    {
        url: '#',
        incluido: true,
        titulo: 'Praga, Viena y Budapest Imperial',
        img: '/images/product/product.jpg',
        sticker: '/images/product/sticker.png',
        duracion: '12 días/11 noches',
        iniciaFinaliza: 'Praga/Budapest',
        salidas: "Agosto a Septiembre 2025",
        precio: "2.300",
        precioTachado: "2.600",
        calificacion: "Excelente"
    },
    {
        url: '#',
        incluido: true,
        titulo: 'Grecia Clásica y Islas',
        img: '/images/product/product.jpg',
        sticker: '/images/product/sticker.png',
        duracion: '14 días/13 noches',
        iniciaFinaliza: 'Atenas/Santorini',
        salidas: "Agosto a Septiembre 2025",
        precio: "2.500",
        precioTachado: "2.900",
        calificacion: "Muy bueno"
    },
    {
        url: '#',
        incluido: true,
        titulo: 'Suiza y Alemania Romántica',
        img: '/images/product/product.jpg',
        sticker: '/images/product/sticker.png',
        duracion: '11 días/10 noches',
        iniciaFinaliza: 'Zurich/Munich',
        salidas: "Agosto a Septiembre 2025",
        precio: "2.200",
        precioTachado: "2.500",
        calificacion: "Excelente"
    },
    {
        url: '#',
        incluido: true,
        titulo: 'Madrid, París, Alpes e Italia "clásico"',
        img: '/images/product/product.jpg',
        sticker: '/images/product/sticker.png',
        duracion: '13 días/12 noches',
        iniciaFinaliza: 'Berlín/Viena',
        salidas: "Agosto a Septiembre 2025",
        precio: "2.000",
        precioTachado: "2.200",
        calificacion: "Excelente"
    },
    {
        url: '#',
        incluido: true,
        titulo: 'Londres, Amsterdam y Bruselas',
        img: '/images/product/product.jpg',
        sticker: '/images/product/sticker.png',
        duracion: '8 días/7 noches',
        iniciaFinaliza: 'Ciudad del Cabo/Ciudad del Cabo',
        salidas: "Agosto a Septiembre 2025",
        precio: "1.500",
        calificacion: "Muy bueno"
    },
    {
        url: '#',
        incluido: true,
        titulo: 'Circuito por Escandinavia',
        img: '/images/product/product.jpg',
        duracion: '15 días/14 noches',
        iniciaFinaliza: 'Estocolmo/Oslo',
        salidas: "Agosto a Septiembre 2025",
        precio: "2.800",
        precioTachado: "3.200",
        calificacion: "Excelente"
    },
    {
        url: '#',
        incluido: true,
        titulo: 'Barcelona, Niza y Roma Express',
        img: '/images/product/product.jpg',
        duracion: '10 días/9 noches',
        iniciaFinaliza: 'Barcelona/Roma',
        salidas: "Agosto a Septiembre 2025",
        precio: "1.800",
        precioTachado: "2.100",
        calificacion: "Bueno"
    },
    {
        url: '#',
        incluido: true,
        titulo: 'Praga, Viena y Budapest Imperial',
        img: '/images/product/product.jpg',
        sticker: '/images/product/sticker.png',
        duracion: '12 días/11 noches',
        iniciaFinaliza: 'Praga/Budapest',
        salidas: "Agosto a Septiembre 2025",
        precio: "2.300",
        precioTachado: "2.600",
        calificacion: "Excelente"
    },
    {
        url: '#',
        incluido: true,
        titulo: 'Grecia Clásica y Islas',
        img: '/images/product/product.jpg',
        sticker: '/images/product/sticker.png',
        duracion: '14 días/13 noches',
        iniciaFinaliza: 'Atenas/Santorini',
        salidas: "Agosto a Septiembre 2025",
        precio: "2.500",
        precioTachado: "2.900",
        calificacion: "Muy bueno"
    },
    {
        url: '#',
        incluido: true,
        titulo: 'Suiza y Alemania Romántica',
        img: '/images/product/product.jpg',
        sticker: '/images/product/sticker.png',
        duracion: '11 días/10 noches',
        iniciaFinaliza: 'Zurich/Munich',
        salidas: "Agosto a Septiembre 2025",
        precio: "2.200",
        precioTachado: "2.500",
        calificacion: "Excelente"
    }
];
</script>
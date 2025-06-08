<template>
    <DefaultSection>
        <HeadingH2>Nuestros viajeros nos cuentan</HeadingH2>
        <CarouselStatic>
            <ReviewCard v-for="(review, index) in reviews" :key="index" :review="review" />
        </CarouselStatic>
    </DefaultSection>
</template>

<script setup>
const reviews = [
    {
        nombre: "María J. Marquez",
        img: "/images/reviews/persona.png",
        tour: "Perú, Cultura, Sol y Relax",
        comentario: "Hermoso viaje. Esmerada la atención de todos los guias. Recorrimos ciudades hermosas. Lo mejor fue el paseo en góndola en Venecia, una experiencia inolvidable.",
        rating: 5
    },
    {
        nombre: "Carlos Pérez",
        img: "/images/reviews/persona.png",
        tour: "Aventura en la montaña",
        comentario: "Increíble aventura, paisajes espectaculares y un guía muy profesional.",
        rating: 4.5
    },
    {
        nombre: "Ana García",
        img: "/images/reviews/persona.png",
        tour: "Excursión a la playa",
        comentario: "Un día perfecto en la playa, todo muy bien organizado.",
        rating: 4
    },
    {
        nombre: "Luis Fernández",
        img: "/images/reviews/persona.png",
        tour: "Tour gastronómico",
        comentario: "Deliciosa comida y una experiencia cultural única.",
        rating: 4.5
    },
    {
        nombre: "Sofía Martínez",
        img: "/images/reviews/persona.png",
        tour: "Visita a museos",
        comentario: "Muy informativo y bien guiado, aprendí mucho sobre la historia local.",
        rating: 5
    }
];
</script>
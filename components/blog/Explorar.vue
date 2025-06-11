<template>
    <DefaultSection class="px-4 lg:bg-violet-dark lg:rounded-[36px] lg:p-12 lg:pb-6">
        <div class="w-full relative lg:hidden">
            <NuxtImg src="/images/blog/fondo.png" alt="Blog" class="h-64 rounded-[18px]" />
            <div
                class="w-full h-full flex flex-col justify-end items-center gap-4 text-center text-light absolute inset-0 bg-gradient-to-t from-[#200033] to-transparent rounded-[18px] p-4">
                <div class="flex flex-col items-center gap-2">
                    <HeadingH2>Tu forma de ver el mundo</HeadingH2>
                    <p class="text-sm font-medium px-4">Explora el blog creado por nuestros Expertos</p>
                </div>
                <ButtonPrimary>Explorar Blog</ButtonPrimary>
            </div>
        </div>
        <div class="hidden lg:w-full lg:flex lg:flex-col lg:gap-6">
            <div class="lg:w-full lg:flex flex-col gap-2">
                <HeadingH2 class="text-white !font-bold">Tu forma del ver el mundo</HeadingH2>
                <p class="text-xl text-white font-semibold">Explora nuestras notas más destacadas</p>
            </div>
            <ButtonPrimary class="hidden lg:w-max lg:block">Explorar Blog</ButtonPrimary>
        </div>
        <div class="w-full">
            <CarouselStatic :slides-per-view="{ lg: 3, xl: 3 }">
                <NuxtLink to="#" v-for="(blog, index) in blogs" :key="index"
                    class="flex flex-col justify-between gap-2 relative bg-light text-secondary rounded-[18px] p-2 pb-3">
                    <NuxtImg :src="blog.img" :alt="blog.alt" class="w-full h-32 object-cover rounded-[10px]" />
                    <div class="h-full flex flex-col justify-between gap-7 px-2">
                        <p class="font-semibold">{{ blog.titulo }}</p>
                        <p class="text-sm">Por {{ blog.autor }} - {{ blog.fecha }}</p>
                    </div>
                </NuxtLink>
            </CarouselStatic>
        </div>
    </DefaultSection>
</template>

<script setup>
const blogs = [
    {
        img: "/images/blog/1.jpg",
        alt: "",
        titulo: "FITUR 2025, la grán cita del turismo global y el impacto en Tour Experto",
        autor: "Belen Cuevas",
        fecha: "19/02/25",
    },
    {
        img: "/images/blog/2.jpg",
        alt: "",
        titulo: "Consejos de salud para viajes internacionales",
        autor: "Ismael Artigas",
        fecha: "08/02/25",
    },
    {
        img: "/images/blog/3.jpg",
        alt: "",
        titulo: "Mejores destinos para viajar en 2025",
        autor: "Ismael Artigas",
        fecha: "07/02/25",
    },
    {
        img: "/images/blog/1.jpg",
        alt: "",
        titulo: "FITUR 2025, la grán cita del turismo global y el impacto en Tour Experto",
        autor: "Belen Cuevas",
        fecha: "19/02/25",
    },
    {
        img: "/images/blog/2.jpg",
        alt: "",
        titulo: "Consejos de salud para viajes internacionales",
        autor: "Ismael Artigas",
        fecha: "08/02/25",
    },
    {
        img: "/images/blog/3.jpg",
        alt: "",
        titulo: "Mejores destinos para viajar en 2025",
        autor: "Ismael Artigas",
        fecha: "07/02/25",
    },
]
</script>
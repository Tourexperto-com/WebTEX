<template>
    <DefaultSection class="px-4 md:bg-violet-dark md:rounded-[36px] md:p-12 md:pb-6">
        <div class="w-full relative md:hidden">
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
        <div class="hidden md:w-full md:flex md:flex-col md:gap-4 lg:gap-6">
            <div class="md:w-full md:flex flex-col gap-2">
                <HeadingH2 class="text-white !font-bold">Tu forma del ver el mundo</HeadingH2>
                <p class="text-sm lg:text-xl text-white font-semibold">Explora nuestras notas más destacadas</p>
            </div>
            <ButtonPrimary class="hidden md:w-max md:block">Explorar Blog</ButtonPrimary>
        </div>
        <div class="w-full mt-3 lg:mt-0">
            <CarouselStatic :slides-per-view="{ md:3, lg: 3, xl: 3 }">
                <NuxtLink to="#" v-for="(blog, index) in blogs" :key="index"
                    class="flex flex-col justify-between gap-2 relative bg-light text-secondary rounded-[18px] p-2 pb-3">
                    <NuxtImg :src="blog.img" :alt="blog.alt" class="w-full h-28 lg:h-32 object-cover rounded-[10px]" />
                    <div class="h-full flex flex-col justify-between gap-2 lg:gap-7 px-2">
                        <p class="text-sm lg:text-base font-semibold">{{ blog.titulo }}</p>
                        <p class="text-xs lg:text-sm">Por <span class="font-semibold">{{ blog.autor }}</span> - {{ blog.fecha }}</p>
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
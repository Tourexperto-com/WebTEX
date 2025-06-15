<template>
    <DefaultSection>
        <HeadingH2 class="text-center text-secondary px-4 md:px-0">Somos agentes oficiales autorizados de los pricipales
            operadores</HeadingH2>
        <CarouselStatic class="md:px-16" :slides-per-view="{ base: 2.7, sm: 4.5, md: 5, lg: 6, xl: 8 }" :gap="{ base: 8, md: 48 }"
            :button-position="{
                top: '10%',
                transform: 'translateY(0)',
                left: {
                    base: '0.5rem',
                    lg: '0rem'
                },
                right: {
                    base: '0.5rem',
                    lg: '0rem'
                }
            }">
            <div v-for="(operador, index) in operadores" :key="index"
                class=" md:h-10 lg:h-16 flex justify-center items-center bg-light md:bg-none rounded-md shadow-1 md:shadow-none p-[0.375rem] md:p-0">
                <NuxtImg :src="`/images/home/operadores/${operador.img}.png`" :alt="operador.alt"
                    class="w-[4.375rem] md:w-auto max-h-10 md:max-h-full md:h-full object-contain" />
            </div>
        </CarouselStatic>
    </DefaultSection>
</template>

<script setup>
const operadores = [
    {
        img: "1",
        alt: "",
    },
    {
        img: "2",
        alt: "",
    },
    {
        img: "3",
        alt: "",
    },
    {
        img: "4",
        alt: "",
    },
    {
        img: "1",
        alt: "",
    },
    {
        img: "2",
        alt: "",
    },
    {
        img: "3",
        alt: "",
    },
    {
        img: "4",
        alt: "",
    },
    {
        img: "1",
        alt: "",
    },
    {
        img: "2",
        alt: "",
    },
    {
        img: "3",
        alt: "",
    },
    {
        img: "4",
        alt: "",
    },
    {
        img: "1",
        alt: "",
    },
    {
        img: "2",
        alt: "",
    },
    {
        img: "3",
        alt: "",
    },
    {
        img: "4",
        alt: "",
    },
]
</script>
<template>
    <DefaultSection>
        <HeadingH2 class="text-center text-secondary px-4 lg:px-0">Somos agentes oficiales autorizados de los pricipales
            operadores</HeadingH2>
        <CarouselStatic class="lg:px-16" :slides-per-view="{ base: 2.7, sm: 4.5, md: 5.5, lg: 6, xl: 6 }" :gap="{ base: 8, lg: 48 }"
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
                class="lg:h-16 flex justify-center items-center bg-light lg:bg-none rounded-lg shadow-1 lg:shadow-none p-[0.375rem] lg:p-0">
                <NuxtImg :src="`/images/home/operadores/${operador.img}.png`" :alt="operador.alt"
                    class="w-[4.375rem] lg:w-auto max-h-10 lg:max-h-full lg:h-full object-contain" />
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
]
</script>
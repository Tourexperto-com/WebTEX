<template>
    <DefaultSection>
        <HeadingH2 class="text-center text-secondary px-4">Somos agentes oficiales autorizados de los pricipales operadores</HeadingH2>
        <CarouselStatic>
            <div v-for="(operador, index) in operadores" :key="index" class="w-24 h-12 flex justify-center items-center bg-white rounded-lg shadow-1 first-of-type:ml-4 last-of-type:mr-4">
                <NuxtImg :src="`/images/home/operadores/${operador.img}.png`" :alt="operador.alt" />
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
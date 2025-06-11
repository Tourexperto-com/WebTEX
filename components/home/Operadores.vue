<template>
    <DefaultSection>
        <HeadingH2 class="text-center text-secondary px-4">Somos agentes oficiales autorizados de los pricipales
            operadores</HeadingH2>
        <CarouselStatic :slides-per-view="{ base: 2.7, sm: 4.5, md: 5.5, lg: 6, xl: 6 }" :gap="{ base: 8, lg: 48 }">
            <div v-for="(operador, index) in operadores" :key="index"
                class="flex justify-center items-center bg-light rounded-lg shadow-1 p-[0.375rem]">
                <NuxtImg :src="`/images/home/operadores/${operador.img}.png`" :alt="operador.alt"
                    class="w-[4.375rem] max-h-10 object-contain" />
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
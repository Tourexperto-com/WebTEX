<template>
    <DefaultSection class="md:flex md:flex-col !gap-0 md:!gap-4 md:bg-gradient-violet md:rounded-[36px] pb-6 md:pt-8 lg:pt-12 md:px-12">
        <div class="w-full md:flex md:justify-start bg-gradient-violet md:bg-none pt-6 pb-20 md:p-0">
            <div class="flex flex-col items-center md:items-left gap-2 px-4 md:px-0">
                <HeadingH2 class="text-light !font-bold md:w-full">Tour Experto en la prensa</HeadingH2>
                <p class="text-center text-light text-sm lg:text-xl font-medium">Destacamos las últimas notas que nos han hecho
                    algunos medios digitales</p>
            </div>
        </div>
        <div class="w-full -mt-[3.5rem] md:mt-0">
            <CarouselStatic :slides-per-view="{base: 1.5, sm: 2.5, md: 3, lg: 3, xl: 4, xxl: 4 }">
                <NuxtLink to="#" v-for="(item, index) in notas" :key="index"
                    class="flex flex-col gap-2 bg-gray-extraLight rounded-[18px] shadow-1 p-2 pb-3">
                    <NuxtImg :src="item.img" :alt="item.alt" class="min-h-12 md:h-16 lg:min-h-20 object-cover rounded-[12px]" />
                    <p class="text-xs lg:text-base font-semibold text-secondary px-2">{{ item.texto }}</p>
                </NuxtLink>
            </CarouselStatic>
        </div>
    </DefaultSection>
</template>

<script setup>
const notas = [
    {
        link: "",
        img: "/images/prensa/caras.png",
        alt: "",
        texto: "Turismo: cuáles son los destinos más elegidos para viajar en 2024",
    },
    {
        link: "",
        img: "/images/prensa/altavoz.png",
        alt: "",
        texto: "Descubriendo destinos increíbles con verdaderos expertos",
    },
    {
        link: "",
        img: "/images/prensa/caras.png",
        alt: "",
        texto: "Turismo: cuáles son los destinos más elegidos para viajar en 2024",
    },
    {
        link: "",
        img: "/images/prensa/altavoz.png",
        alt: "",
        texto: "Descubriendo destinos increíbles con verdaderos expertos",
    },
    {
        link: "",
        img: "/images/prensa/caras.png",
        alt: "",
        texto: "Turismo: cuáles son los destinos más elegidos para viajar en 2024",
    },
    {
        link: "",
        img: "/images/prensa/altavoz.png",
        alt: "",
        texto: "Descubriendo destinos increíbles con verdaderos expertos",
    },
    {
        link: "",
        img: "/images/prensa/caras.png",
        alt: "",
        texto: "Turismo: cuáles son los destinos más elegidos para viajar en 2024",
    },
    {
        link: "",
        img: "/images/prensa/altavoz.png",
        alt: "",
        texto: "Descubriendo destinos increíbles con verdaderos expertos",
    },
];
</script>
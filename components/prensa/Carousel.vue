<template>
    <DefaultSection class="!gap-0">
        <div class="w-full bg-gradient-violet pt-6 pb-20">
            <div class="flex flex-col items-center gap-2 px-4">
                <HeadingH2 class="text-white">Tour Experto en la prensa</HeadingH2>
                <p class="text-center text-white text-sm font-medium">Destacamos las últimas notas que nos han hecho
                    algunos medios digitales</p>
            </div>
        </div>
        <div class="w-full -mt-[3.5rem]">
            <CarouselStatic>
                <NuxtLink to="#" v-for="(item, index) in notas" :key="index"
                    class="w-52 flex flex-col gap-2 bg-gray-extraLight rounded-[18px] shadow-1 p-2 pb-3 first-of-type:ml-4 last-of-type:mr-4">
                    <NuxtImg :src="item.img" :alt="item.alt" class="w-48 h-12 rounded-[12px]" />
                    <p class="text-xs font-semibold text-secondary">{{ item.texto }}</p>
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
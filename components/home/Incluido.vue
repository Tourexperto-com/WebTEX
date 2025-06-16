<template>
    <DefaultSection class="bg-gradient-violet py-6 px-4">
        <HeadingH2 class="text-center text-light">Viajes todo incluido</HeadingH2>
        <div class="grid grid-cols-3 gap-x-2 gap-y-3">
            <div v-for="(item, index) in incluido" :key="index"
                class="flex flex-col items-center gap-1 bg-light rounded-lg shadow-1 py-2 px-4">
                <span
                    :class="`w-6 h-6 bg-contain bg-no-repeat bg-center`"
                    :style="{ backgroundImage: `url('/images/home/incluido/${item.img}.svg')` }"></span>
                <p class="text-xs text-secondary font-semibold">{{ item.title }}</p>
            </div>
        </div>
    </DefaultSection>
</template>

<script setup>
const incluido = [
    {
        img: "Traslados",
        title: "Traslados"
    },
    {
        img: "Alojamiento",
        title: "Alojamiento"
    },
    {
        img: "Comidas",
        title: "Comidas"
    },
    {
        img: "Excursiones",
        title: "Excursiones"
    },
    {
        img: "Guias",
        title: "Guías"
    },
    {
        img: "Seguro",
        title: "Seguro"
    },
];
</script>
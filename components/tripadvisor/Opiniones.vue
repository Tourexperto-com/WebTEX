<template>
    <NuxtLink :to="url" class="md:w-full md:max-w-[37rem] lg:max-w-[46.875rem] md:h-12 lg:h-14 flex flex-col md:flex-row md:items-center md:justify-between md:bg-tripadvisor-green border-2 lg:border-none border-tripadvisor-green rounded-[20px] md:rounded-full md:p-1 md:pl-8" target="_blank">
        <div class="bg-tripadvisor-green md:bg-none rounded-t-[18px] md:rounded-none py-2">
            <p class="text-center lg:text-xl font-semibold">Opiniones de nuestros viajeros</p>
        </div>
        <div class="md:h-full flex justify-center items-center gap-2 md:bg-light rounded-b-[18px] md:rounded-full py-2 px-6">
            <p class="text-sm lg:text-xl font-bold font-roboto">4.5</p>
            <div class="flex items-center gap-1">
                <div v-for="n in 4" :key="n" class="w-4 h-4 lg:w-5 lg:h-5 bg-tripadvisor-green rounded-full"></div>
                <div class="w-4 h-4 lg:w-5 lg:h-5 border border-tripadvisor-green rounded-full relative overflow-hidden">
                    <span class="absolute left-0 top-0 h-full w-1/2 bg-tripadvisor-green"></span>
                    <span class="absolute right-0 top-0 h-full w-1/2"></span>
                </div>
            </div>
            <NuxtImg src="/images/tripadvisor/Logo-Tripadvisor.svg" alt="Logo-Tripadvisor" class="h-4 lg:h-6" />
        </div>
    </NuxtLink>
</template>

<script setup>
const props = defineProps({
    url: {
        type: String,
        required: true
    }
});
</script>
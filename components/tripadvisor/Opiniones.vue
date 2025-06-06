<template>
    <NuxtLink :to="url" class="flex flex-col border-2 border-tripadvisor-green rounded-[20px]" target="_blank">
        <div class="bg-tripadvisor-green rounded-t-[18px] py-2 px-6">
            <p class="text-center font-medium">Opiniones de nuestros viajeros</p>
        </div>
        <div class="flex justify-center items-center gap-2 rounded-b-[18px] py-2 px-6">
            <p class="text-sm font-bold">4.5</p>
            <div class="flex items-center gap-1">
                <div v-for="n in 4" :key="n" class="w-4 h-4 bg-tripadvisor-green rounded-full"></div>
                <div class="w-4 h-4 border border-tripadvisor-green rounded-full relative overflow-hidden">
                    <span class="absolute left-0 top-0 h-full w-1/2 bg-tripadvisor-green"></span>
                    <span class="absolute right-0 top-0 h-full w-1/2"></span>
                </div>
            </div>
            <NuxtImg src="/images/tripadvisor/Logo-Tripadvisor.svg" alt="Logo-Tripadvisor" class="h-4" />
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
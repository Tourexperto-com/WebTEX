<template>
    <NuxtLink :to="url" class="w-full flex items-center gap-3 bg-light border-2 border-tripadvisor-green rounded-full py-2 px-4">
        <NuxtImg src="/images/tripadvisor/Logo-Tripadvisor.svg" alt="Logo Tripadvisor" class="h-3" />
        <div class="flex items-center gap-2">
            <p class="text-xs font-bold font-roboto">4.5</p>
            <div class="flex items-center gap-1">
                <div v-for="n in 4" :key="n" class="w-3 h-3 bg-tripadvisor-green rounded-full"></div>
                <div
                    class="w-3 h-3 border border-tripadvisor-green rounded-full relative overflow-hidden">
                    <span class="absolute left-0 top-0 h-full w-1/2 bg-tripadvisor-green"></span>
                    <span class="absolute right-0 top-0 h-full w-1/2"></span>
                </div>
            </div>
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
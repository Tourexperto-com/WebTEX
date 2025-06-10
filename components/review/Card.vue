<template>
    <NuxtLink to="#" class="flex flex-col gap-2 bg-white rounded-[18px] shadow-1 p-4">
        <div class="flex items-center gap-3">
            <NuxtImg :src="review.img" :alt="review.nombre" class="w-12 h-12 rounded-full" />
            <div class="flex flex-col gap-0.5">
                <div class="flex items-start gap-0.5">
                    <p class="text-xs text-gray-extraDark font-semibold">{{ review.nombre }}</p>
                    <NuxtImg src="/images/reviews/verificado.svg" alt="Verificado" class="w-3 h-3 -mt-0.5" />
                </div>
                <div class="flex items-center gap-1">
                    <div v-for="n in Math.floor(review.rating)" :key="`full-${n}`"
                        class="w-3 h-3 bg-tripadvisor-green rounded-full"></div>

                    <div v-if="review.rating % 1 !== 0"
                        class="w-3 h-3 border border-tripadvisor-green rounded-full relative overflow-hidden">
                        <span class="absolute left-0 top-0 h-full w-1/2 bg-tripadvisor-green"></span>
                        <span class="absolute right-0 top-0 h-full w-1/2"></span>
                    </div>

                    <div v-for="n in (5 - Math.ceil(review.rating))" :key="`empty-${n}`"
                        class="w-3 h-3 border border-tripadvisor-green rounded-full"></div>
                </div>
            </div>
        </div>

        <div class="flex items-center gap-1">
            <NuxtImg src="/images/reviews/mundo.svg" alt="Mundo" class="w-3 h-3" />
            <p class="text-xs text-secondary font-bold">{{ review.tour }}</p>
        </div>

        <p class="text-xs text-gray-extraDark line-clamp-4">
            {{ review.comentario }}
        </p>
    </NuxtLink>
</template>

<script setup>
const props = defineProps({
    review: {
        type: Object,
        required: true
    }
});
</script>
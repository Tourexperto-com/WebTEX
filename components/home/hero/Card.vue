<template>
    <NuxtLink :to="destino.url"
        class="max-w-64 max-h-48 bg-white rounded-[18px] hover:shadow-1 duration-300 overflow-hidden cursor-pointer p-2 pb-3">
        <NuxtImg :src="destino.image" :alt="destino.name" class="w-full h-[60%] object-cover rounded-xl" loading="lazy" />

        <div class="flex flex-col pt-2 px-0.5">
            <h3 class="text-primary font-bold">
                {{ destino.name }}
            </h3>
            <p class="text-secondary font-semibold text-xs">
                {{ destino.price }}
            </p>
        </div>
    </NuxtLink>
</template>

<script setup>
defineProps({
    destino: {
        type: Object,
        required: true,
    }
})
</script>
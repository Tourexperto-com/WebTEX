<template>
    <div
        class="max-w-64 max-h-48 bg-white rounded-[18px] hover:shadow-40 duration-300 overflow-hidden cursor-pointer p-[0.375rem]">
        <NuxtImg :src="destination.image" :alt="destination.name" class="w-full h-[60%] object-cover rounded-xl" loading="lazy" />

        <div class="flex flex-col gap-0.5 py-3 px-4">
            <h3 class="text-primary font-bold">
                {{ destination.name }}
            </h3>
            <p class="text-secondary font-semibold text-xs">
                {{ destination.price }}
            </p>
        </div>
    </div>
</template>

<script setup>
defineProps({
    destination: {
        type: Object,
        required: true,
        validator: (destination) => {
            return destination &&
                typeof destination.name === 'string' &&
                typeof destination.price === 'string' &&
                typeof destination.image === 'string'
        }
    }
})
</script>
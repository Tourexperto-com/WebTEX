<template>
    <NuxtLink :to="producto.url"
        class="min-w-[13.375rem] flex flex-col justify-between relative rounded-[18px] shadow-1">
        <NuxtImg :src="producto.img" :alt="producto.titulo" class="w-full h-[6.25rem] rounded-t-[18px] object-cover" />
        <span class="absolute top-3 left-4 bg-secondary rounded-[6px] text-xs text-white font-medium py-1 px-3">Aéreo
            incluido</span>
        <NuxtImg v-if="producto.sticker" :src="producto.sticker" alt="" class="w-16 h-16 absolute top-3 right-3" />
        <div class="h-full flex flex-col justify-between gap-2 relative bg-gray-light p-4 pb-3">
            <span
                class="flex items-center gap-1 absolute -top-3 right-0 bg-gray-extraLight rounded-l-[9px] text-secondary text-xs font-medium !leading-none py-[5px] px-3">{{
                    producto.calificacion }}
                <Icon name="material-symbols:star-rounded" size="0.875rem" />
            </span>
            <HeadingH3 class="text-secondary line-clamp-2">{{ producto.titulo }}</HeadingH3>
            <div class="flex flex-col gap-2">
                <div>
                    <p class="text-sm text-secondary font-medium">Duración:</p>
                    <p class="text-sm text-gray-dark font-medium">{{ producto.duracion }}</p>
                </div>
                <div>
                    <p class="text-sm text-secondary font-medium">Salidas:</p>
                    <p class="text-sm text-gray-dark font-medium">{{ producto.salidas }}</p>
                </div>
                <div>
                    <p class="text-sm text-secondary font-medium">Inicia/Finaliza:</p>
                    <p class="text-sm text-gray-dark font-medium truncate">{{ producto.iniciaFinaliza }}</p>
                </div>
            </div>
        </div>
        <div class="flex flex-col gap-1 bg-gradient-to-r from-secondary to-violet-dark rounded-b-[18px] py-2 px-4">
            <p class="text-xs text-white font-medium">Todo incluido desde <span v-if="producto.precioTachado"
                    class="line-through font-semibold font-roboto">USD {{ producto.precioTachado }}</span></p>
            <p class="text-white text-xs font-medium">USD <span class="text-lg font-bold font-roboto">{{ producto.precio
            }}</span>
                por persona</p>
        </div>
    </NuxtLink>
</template>

<script setup>
const props = defineProps({
    producto: {
        type: Object,
        required: true
    }
})
</script>
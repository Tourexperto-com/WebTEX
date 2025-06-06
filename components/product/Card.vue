<template>
    <NuxtLink :to="producto.url" class="min-w-[13.375rem] relative rounded-[18px] shadow-1">
        <NuxtImg :src="producto.img" :alt="producto.titulo" class="w-full h-[6.25rem] rounded-t-[18px] object-cover" />
        <NuxtImg :src="producto.sticker" alt="" class="w-16 h-16 absolute top-3 right-3" />
        <div class="flex flex-col gap-2 relative bg-gray-light p-4 pb-3">
            <span class="flex items-center gap-1 absolute -top-3 right-0 bg-gray-extraLight rounded-l-[9px] text-secondary text-xs font-medium py-1 px-3">{{
                producto.calificacion }}
                <Icon name="material-symbols:star-rounded" />
            </span>
            <HeadingH3 class="text-secondary">{{ producto.titulo }}</HeadingH3>
            <div>
                <p class="text-sm text-secondary font-medium">Duración:</p>
                <p class="text-sm text-gray-dark font-medium">{{ producto.duracion }}</p>
            </div>
            <div>
                <p class="text-sm text-secondary font-medium">Inicia/Finaliza:</p>
                <p class="text-sm text-gray-dark font-medium">{{ producto.iniciaFinaliza }}</p>
            </div>
        </div>
        <div class="bg-gradient-to-r from-secondary to-violet-dark rounded-b-[18px] py-2 px-4">
            <p class="text-xs text-white font-medium">Todo incluido desde <span v-if="producto.precioTachado"
                    class="line-through font-semibold">USD {{ producto.precioTachado }}</span></p>
            <p class="text-white text-xs font-medium">USD <span class="text-lg font-bold">{{ producto.precio }}</span>
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
<template>
    <div
        class="flex flex-col items-center md:items-start gap-4 md:gap-6 bg-gray-light md:bg-violet-dark rounded-[18px] md:rounded-[36px] text-center text-secondary py-6 xxl:p-12 px-5 md:px-6">
        <NuxtImg src="/images/contacto/Expertos.png" alt="Expertos" class="w-40 h-16 md:hidden" />
        <div class="md:max-w-48 lg:max-w-[22rem] flex flex-col items-center gap-2 md:gap-3 px-2 md:px-0">
            <HeadingH2 class="md:w-full flex flex-col md:text-base lg:text-xl md:text-left md:text-light">
                ¿Alguna duda?
                <span>Preguntale a un Experto</span>
            </HeadingH2>
            <p class="md:text-left text-xs lg:text-sm font-medium md:text-light">
                Nuestro equipo ha viajado
                a cientos de países y tiene
                años de experiencia en viajes
                para compartir contigo
            </p>
        </div>
        <ButtonPrimary @click="handleClick">
            Hablar con un Experto
        </ButtonPrimary>
    </div>
</template>

<script setup>
const emit = defineEmits(['open-popup'])

const handleClick = () => {
    emit('open-popup')
}
</script>
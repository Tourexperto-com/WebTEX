<template>
    <div :class="containerClasses">
        <button v-for="country in countries" :key="country.code" :aria-label="`Bandera ${country.name}`"
            @click="selectRegion(country.region)" :class="buttonClasses">
            <div class="rounded-full bg-contain bg-no-repeat bg-center" :class="flagClasses"
                :style="`background-image: url('${country.flag}')`"></div>
            <span v-if="variant === 'modal'" class="text-xs font-semibold text-secondary">{{ country.code }}</span>
        </button>
    </div>
</template>

<script setup>
const props = defineProps({
    variant: {
        type: String,
        default: 'modal'
    }
})

const emit = defineEmits(['regionSelected'])

const containerClasses = computed(() => {
    if (props.variant === 'footer') {
        return 'flex flex-wrap justify-center gap-3'
    }
    return 'grid md:flex grid-cols-3 justify-center gap-3'
})

const buttonClasses = computed(() => {
    if (props.variant === 'footer') {
        return 'flex flex-col items-center gap-1'
    }
    return 'flex flex-col items-center gap-2'
})

const flagClasses = computed(() => {
    if (props.variant === 'footer') {
        return 'w-8 h-8'
    }
    return 'w-10 h-10'
})

const countries = [
    { code: 'ARG', name: 'Argentina', flag: '/images/segmentos/banderas/argentina.png', region: 'ar' },
    { code: 'CHI', name: 'Chile', flag: '/images/segmentos/banderas/chile.png', region: 'latam' },
    { code: 'COL', name: 'Colombia', flag: '/images/segmentos/banderas/colombia.png', region: 'latam' },
    { code: 'CR', name: 'Costa Rica', flag: '/images/segmentos/banderas/costa-rica.png', region: 'latam' },
    { code: 'ECU', name: 'Ecuador', flag: '/images/segmentos/banderas/ecuador.png', region: 'latam' },
    { code: 'ESP', name: 'España', flag: '/images/segmentos/banderas/espana.png', region: 'es' },
    { code: 'USA', name: 'Estados Unidos', flag: '/images/segmentos/banderas/estados-unidos.png', region: 'us' },
    { code: 'GUA', name: 'Guatemala', flag: '/images/segmentos/banderas/guatemala.png', region: 'latam' },
    { code: 'HND', name: 'Honduras', flag: '/images/segmentos/banderas/honduras.png', region: 'latam' },
    { code: 'MEX', name: 'México', flag: '/images/segmentos/banderas/mexico.png', region: 'mx' },
    { code: 'PNM', name: 'Panamá', flag: '/images/segmentos/banderas/panama.png', region: 'latam' },
    { code: 'URU', name: 'Uruguay', flag: '/images/segmentos/banderas/uruguay.png', region: 'latam' }
]

const selectRegion = async (region) => {
    try {
        localStorage.setItem('region-selected', 'true')
        localStorage.setItem('selected-region', region)

        let targetPath = '/'

        if (region === 'ar') {
            targetPath = '/ar'
        } else if (region === 'es') {
            targetPath = '/es'
        } else if (region === 'us') {
            targetPath = '/us'
        } else if (region === 'mx') {
            targetPath = '/mx'
        }

        await navigateTo(targetPath)

        emit('regionSelected')
    } catch (error) {
        console.error('Error al cambiar región:', error)
    }
}
</script>
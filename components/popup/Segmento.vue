<template>
    <div v-if="showModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div class="w-[90%] max-w-80 md:max-w-[41rem] lg:max-w-4xl flex flex-col gap-4 relative bg-light rounded-2xl mx-4 p-5 md:p-8">
            <button @click="closeModal"
                class="w-7 h-7 absolute top-5 right-5 bg-violet-mid rounded-full flex items-center justify-center text-white hover:bg-blue-600 transition-colors">
                <Icon name="material-symbols:close" class="w-5 h-5" />
            </button>

            <div class="flex flex-col gap-5 text-center">
                <p class="max-w-[80%] md:max-w-full text-sm md:text-base text-left text-secondary  font-semibold">
                    Para una mejor experiencia, cuéntanos desde dónde te conectas.
                </p>
                <p class="font-bold text-secondary">
                    Selecciona tu país de origen.
                </p>
            </div>

            <div class="grid md:flex grid-cols-3 gap-3">
                <button v-for="country in countries" :key="country.code" @click="selectRegion(country.region)"
                    class="flex flex-col items-center gap-2">
                    <NuxtImg :src="`/images/segmentos/banderas/${country.flag}.png`" :alt="country.name"
                        class="w-10 h-10 rounded-full" />
                    <span class="text-xs font-semibold text-secondary">{{ country.code }}</span>
                </button>
            </div>
        </div>
    </div>
</template>

<script setup>
const { switchLocalePath } = useI18n()
const router = useRouter()

const showModal = ref(false)

const countries = [
    { code: 'ARG', name: 'Argentina', flag: 'argentina', region: 'ar' },
    { code: 'CHI', name: 'Chile', flag: 'argentina', region: 'latam' },
    { code: 'COL', name: 'Colombia', flag: 'argentina', region: 'latam' },
    { code: 'CR', name: 'Costa Rica', flag: 'argentina', region: 'latam' },
    { code: 'ECU', name: 'Ecuador', flag: 'argentina', region: 'latam' },
    { code: 'ESP', name: 'España', flag: 'argentina', region: 'es' },
    { code: 'USA', name: 'Estados Unidos', flag: 'argentina', region: 'us' },
    { code: 'GUA', name: 'Guatemala', flag: 'argentina', region: 'latam' },
    { code: 'HND', name: 'Honduras', flag: 'argentina', region: 'latam' },
    { code: 'MEX', name: 'México', flag: 'argentina', region: 'mx' },
    { code: 'PNM', name: 'Panamá', flag: 'argentina', region: 'latam' },
    { code: 'URU', name: 'Uruguay', flag: 'argentina', region: 'latam' }
]

onMounted(() => {
    const hasVisited = localStorage.getItem('region-selected')
    if (!hasVisited) {
        showModal.value = true
    }
})

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

        showModal.value = false
    } catch (error) {
        console.error('Error al cambiar región:', error)
    }
}

const closeModal = async () => {
    try {
        await navigateTo('/')

        showModal.value = false
        localStorage.setItem('region-selected', 'true')
    } catch (error) {
        console.error('Error al cerrar modal:', error)
        showModal.value = false
        localStorage.setItem('region-selected', 'true')
    }
}
</script>
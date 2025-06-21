<template>
    <div v-if="showModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div
            class="w-[90%] max-w-80 md:max-w-[41rem] flex flex-col gap-4 relative bg-light rounded-2xl mx-4 p-5 md:p-8">
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

            <SegmentoBanderas @regionSelected="handleRegionSelected" />
        </div>
    </div>
</template>

<script setup>
const { switchLocalePath } = useI18n()
const router = useRouter()

const showModal = ref(false)

onMounted(() => {
    const hasVisited = localStorage.getItem('region-selected')
    if (!hasVisited) {
        showModal.value = true
    }
})

const handleRegionSelected = () => {
    showModal.value = false
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
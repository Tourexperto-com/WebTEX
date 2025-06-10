<template>
    <DefaultSection class="relative" style="background-position: 80% 50%;">
        <NuxtImg src="/images/home/Hero-Mobile.png" alt=""
            class="w-full min-h-[19.5rem] lg:min-h-[28.75rem] object-cover relative -z-10 lg:rounded-[36px]" />
        <NuxtImg src="/images/home/Hero-Sticker.webp" alt="" class="w-16 lg:w-24 h-16 lg:h-24 absolute top-4 lg:top-8 right-4 lg:right-[4.5rem]" />

        <div
            class="w-full max-w-72 lg:max-w-[50.5rem] flex flex-col items-center gap-2 absolute z-[2] top-[4.75rem] lg:top-[10.25rem] py-4 lg:pt-0 lg:pb-6">
            <div class="w-full lg:max-w-[47rem] lg:flex lg:flex-col lg:gap-2 lg:mb-4">
                <HeadingH1 class="text-white drop-shadow-[0_1px_4px_rgba(0,0,0,0.15)]">
                    Planificar el viaje de tus sueños nunca fue tan fácil.
                </HeadingH1>
                <p class="hidden lg:inline text-white text-xl font-semibold">
                    Transporte, alojamiento y actividades organizadas en todos nuestros tours,
                    para que tu única preocupación sea disfrutar cada momento.
                </p>
            </div>

            <div class="w-full flex flex-col items-center relative" ref="searchContainer">
                <!-- Search -->
                <div class="w-full relative">
                    <!-- Destinos seleccionados dentro del input -->
                    <div v-if="selectedDestinatinos.length > 0"
                        class="absolute left-4 top-1/2 transform -translate-y-1/2 z-10">
                        <div class="flex flex-wrap gap-1">
                            <div v-for="destino in selectedDestinatinos" :key="destino.id"
                                class="flex items-center gap-0.5 bg-secondary rounded-xl text-white text-xs lg:text-sm pl-3 pr-1 py-[0.375rem]">
                                <span>{{ destino.name }}</span>
                                <button @click="removeDestino(destino.id)"
                                    class="flex justify-center items-center hover:text-gray-light transition-colors"
                                    aria-label="Remover destino">
                                    <Icon name="material-symbols:close-small" size="1.5rem" />
                                </button>
                            </div>
                        </div>
                    </div>
                    <label for="searchInput" class="sr-only">¿Dónde quieres viajar?</label>
                    <input v-model="searchQuery" type="text" id="searchInput"
                        :placeholder="selectedDestinatinos.length === 0 ? '¿Dónde quieres viajar?' : ''"
                        :readonly="isMobile && selectedDestinatinos.length > 0"
                        class="w-full rounded-full border-0 text-gray-extraDark text-xs lg:text-base placeholder-gray-dark placeholder:text-xs lg:placeholder:text-base placeholder:font-semibold focus:outline-none py-5 lg:py-[18px] px-6"
                        @input="handleInput" @focus="handleFocus" @keyup.enter="handleSearch"
                        @keydown.escape="hideDropdown" />

                    <button @click="handleSearch"
                        class="w-12 lg:w-auto h-12 lg:h-auto flex justify-center items-center absolute right-1 top-1/2 bg-primary hover:bg-primaryButton-hover focus:bg-primaryButton-focus text-white font-bold rounded-full transform -translate-y-1/2 transition-colors duration-300 focus:outline-none lg:py-3 lg:px-6"
                        aria-label="Buscar destino">
                        <div class="flex items-center gap-2">
                            <Icon name="material-symbols:search-rounded" size="1.5rem" />
                            <p class="hidden lg:inline">Buscar</p>
                        </div>
                    </button>
                </div>

                <!-- Dropdown -->
                <div v-if="showDropdown"
                    class="w-max absolute top-full left-4 right-0 bg-white border border-gray-dark rounded-xl overflow-hidden mt-1">

                    <div v-if="isMobile && selectedDestinatinos.length > 0"
                        class="text-gray-dark font-semibold text-xs lg:text-sm p-4">
                        Solo puedes elegir un destino
                    </div>

                    <div v-else-if="searchQuery.length < 3" class="text-gray-dark font-semibold text-xs lg:text-sm p-4">
                        Ingresa 3 o más caracteres
                    </div>

                    <div v-else-if="isLoading" class="text-gray-dark font-semibold text-xs lg:text-sm p-4">
                        Buscando...
                    </div>

                    <div v-else-if="filteredDestinatinos.length === 0" class="text-gray-dark font-semibold text-xs lg:text-sm p-4">
                        No se encontraron resultados
                    </div>

                    <div v-else class="overflow-y-auto max-h-52">
                        <button v-for="destino in filteredDestinatinos" :key="destino.id"
                            @click="selectDestino(destino)"
                            class="min-w-44 flex flex-col text-left hover:bg-violet-light/10 transition-colors duration-300 focus:outline-none px-4 py-3">
                            <div class="text-xs lg:text-sm text-gray-dark font-semibold">{{ destino.name }}</div>
                        </button>
                    </div>
                </div>
            </div>

            <!-- Promocion -->
            <div
                class="w-max flex items-center justify-center gap-1 z-[-1] bg-primary text-white rounded-full py-[0.375rem] pl-2 pr-3">
                <Icon name="material-symbols:check-circle-outline-rounded" class="lg:w-5 lg:h-5" />
                <p class="lg:hidden font-medium text-xs">
                    Reserva con el 20% y paga en cuotas.
                </p>
                <p class="hidden lg:inline text-sm">Reserva con el 20% y pagá el resto en cuotas fijas sin interés</p>
            </div>
        </div>
        <!-- Carrusel con destinos -->
        <div class="w-full max-w-[808px] -mt-16">
            <CarouselStatic :slides-per-view="{ base: 1.5, sm: 2.25, md: 3.5, lg: 4.15, xl: 6 }">
                <HomeHeroCard v-for="destino in carouselDestinos" :key="destino.id" :destino="destino" />
            </CarouselStatic>
        </div>
    </DefaultSection>
</template>

<script setup>
const searchQuery = ref('')
const showDropdown = ref(false)
const isLoading = ref(false)
const searchContainer = ref(null)
const selectedDestinatinos = ref([])

const destinos = ref([
    { id: 1, name: 'Arabia Saudita' },
    { id: 2, name: 'Aracena' },
    { id: 3, name: 'Arad' },
    { id: 4, name: 'Arava' },
    { id: 5, name: 'Barcelona' },
    { id: 6, name: 'París' },
    { id: 7, name: 'Roma' },
    { id: 8, name: 'Madrid' },
    { id: 9, name: 'Londres' },
    { id: 10, name: 'Berlín' }
])

const carouselDestinos = ref([
    {
        id: 1,
        name: 'Europa',
        price: 'Desde USD 381',
        image: '/images/home/hero/espana-viaje.webp'
    },
    {
        id: 2,
        name: 'España',
        price: 'Desde USD 279',
        image: '/images/home/hero/espana-viaje.webp'
    },
    {
        id: 3,
        name: 'Italia',
        price: 'Desde USD 456',
        image: '/images/home/hero/espana-viaje.webp'
    },
    {
        id: 4,
        name: 'Japón',
        price: 'Desde USD 1.609',
        image: '/images/home/hero/espana-viaje.webp'
    },
    {
        id: 5,
        name: 'Estados Unidos',
        price: 'Desde USD 824',
        image: '/images/home/hero/espana-viaje.webp'
    }
])

const isMobile = ref(false)

const filteredDestinatinos = computed(() => {
    if (searchQuery.value.length < 3) return []

    const query = searchQuery.value.toLowerCase().trim()
    const selectedIds = selectedDestinatinos.value.map(d => d.id)

    return destinos.value.filter(destino =>
        destino.name.toLowerCase().includes(query) &&
        !selectedIds.includes(destino.id)
    )
})

const handleFocus = () => {
    showDropdown.value = true

    // Si es mobile y ya hay destino seleccionado, no permitir escribir
    if (isMobile.value && selectedDestinatinos.value.length > 0) {
        return
    }
}

const handleInput = () => {
    if (isMobile.value && selectedDestinatinos.value.length > 0) {
        return
    }

    showDropdown.value = true

    if (searchQuery.value.trim().length >= 3) {
        isLoading.value = true

        // Simular delay de búsqueda
        setTimeout(() => {
            isLoading.value = false
        }, 500)
    } else {
        isLoading.value = false
    }
}

const selectDestino = (destino) => {
    if (isMobile.value) {
        selectedDestinatinos.value = [destino]
    } else {
        selectedDestinatinos.value.push(destino)
    }

    searchQuery.value = ''
    hideDropdown()
}

const removeDestino = (destinoId) => {
    selectedDestinatinos.value = selectedDestinatinos.value.filter(d => d.id !== destinoId)
}

const handleSearch = () => {
    if (searchQuery.value.trim()) {
        hideDropdown()
    }
}

const hideDropdown = () => {
    showDropdown.value = false
    isLoading.value = false
}

const handleClickOutside = (event) => {
    if (searchContainer.value && !searchContainer.value.contains(event.target)) {
        hideDropdown()
    }
}

onMounted(() => {
    document.addEventListener('click', handleClickOutside)
    isMobile.value = window.innerWidth < 768

    const handleResize = () => {
        isMobile.value = window.innerWidth < 768
        if (isMobile.value && selectedDestinatinos.value.length > 1) {
            selectedDestinatinos.value = [selectedDestinatinos.value[0]]
        }
    }

    window.addEventListener('resize', handleResize)

    window.handleResize = handleResize
})

onUnmounted(() => {
    document.removeEventListener('click', handleClickOutside)
    if (window.handleResize) {
        window.removeEventListener('resize', window.handleResize)
        delete window.handleResize
    }
})
</script>
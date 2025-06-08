<template>
    <DefaultSection class="relative mb-[5.5rem]" style="background-position: 80% 50%;">
        <NuxtImg src="/images/home/Hero-Mobile.png" alt="" class="w-full min-h-[302px] object-cover relative -z-10" />
        <NuxtImg src="/images/home/Hero-Sticker.webp" alt="" class="w-16 h-16 absolute top-4 right-4" />

        <div class="w-full max-w-72 flex flex-col items-center gap-2 absolute z-[2] top-1/2 transform -translate-y-1/2 my-4">
            <HeadingH1 class="text-white drop-shadow-[0_1px_4px_rgba(0,0,0,0.15)]">
                Planificar el viaje de tus sueños nunca fue tan fácil.
            </HeadingH1>

            <div class="w-full flex flex-col items-center relative" ref="searchContainer">
                <!-- Search -->
                <div class="w-full relative">
                    <!-- Destinos seleccionados DENTRO del input -->
                    <div v-if="selectedDestinatinos.length > 0"
                        class="absolute left-4 top-1/2 transform -translate-y-1/2 z-10">
                        <div class="flex flex-wrap gap-1">
                            <div v-for="destino in selectedDestinatinos" :key="destino.id"
                                class="flex items-center gap-0.5 bg-secondary rounded-xl text-white text-xs pl-3 pr-1 py-[0.375rem]">
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
                        class="w-full rounded-full border-0 text-gray-extraDark placeholder-gray-dark placeholder:text-xs placeholder:font-semibold focus:outline-none text-xs py-5 px-6"
                        @input="handleInput" @focus="handleFocus" @keyup.enter="handleSearch"
                        @keydown.escape="hideDropdown" />

                    <button @click="handleSearch"
                        class="w-12 h-12 flex justify-center items-center absolute right-1 top-1/2 bg-primary hover:bg-primaryButton-hover focus:bg-primaryButton-focus text-white font-bold rounded-full transform -translate-y-1/2 transition-colors duration-300 focus:outline-none"
                        aria-label="Buscar destino">
                        <div class="flex items-center gap-2">
                            <Icon name="material-symbols:search-rounded" size="1.5rem" />
                            <p class="hidden xl:inline">Buscar</p>
                        </div>
                    </button>
                </div>

                <!-- Dropdown -->
                <div v-if="showDropdown"
                    class="w-max absolute top-full left-4 right-0 bg-white border border-gray-dark rounded-xl overflow-hidden mt-1">

                    <div v-if="isMobile && selectedDestinatinos.length > 0" class="text-gray-dark font-semibold text-xs p-4">
                        Solo puedes elegir un destino
                    </div>

                    <div v-else-if="searchQuery.length < 3" class="text-gray-dark font-semibold text-xs p-4">
                        Ingresa 3 o más caracteres
                    </div>

                    <div v-else-if="isLoading" class="text-gray-dark font-semibold text-xs p-4">
                        Buscando...
                    </div>

                    <div v-else-if="filteredDestinatinos.length === 0" class="text-gray-dark font-semibold text-xs p-4">
                        No se encontraron resultados
                    </div>

                    <div v-else class="overflow-y-auto max-h-52">
                        <button v-for="destino in filteredDestinatinos" :key="destino.id"
                            @click="selectDestino(destino)"
                            class="min-w-44 flex flex-col text-left hover:bg-violet-light/10 transition-colors duration-300 focus:outline-none px-4 py-3">
                            <div class="text-xs text-gray-dark font-semibold">{{ destino.name }}</div>
                        </button>
                    </div>
                </div>
            </div>

            <!-- Promocion -->
            <div
                class="w-max flex items-center justify-center gap-1 z-[-1] bg-primary text-white rounded-full py-[0.375rem] pl-2 pr-3">
                <Icon name="material-symbols:check-circle-outline-rounded" />
                <p class="font-medium text-xs">
                    Reserva con el 20% y paga en cuotas.
                </p>
            </div>
        </div>
        <!-- Carrusel con destinos -->
        <div class="w-full absolute -bottom-24">
            <CarouselStatic>
                <HomeHeroCard v-for="destino in carouselDestinos" :key="destino.id"
                    :destino="destino" class="w-48 flex-shrink-0 first-of-type:ml-4 last-of-type:mr-4" />
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
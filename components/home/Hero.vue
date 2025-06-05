<template>
    <section
        class="w-full flex flex-col items-center relative bg-cover bg-no-repeat bg-[url('/images/home/Hero-Mobile.webp')] pt-28 pb-[3.5rem]"
        style="background-position: 80% 50%;">
        <NuxtImg src="/images/home/Hero-Sticker.webp" alt="" class="w-16 h-16 absolute top-3 right-3" />

        <div class="w-full max-w-72 flex flex-col items-center gap-2">
            <HeadingH1 class="text-white">
                Planificar el viaje de tus sueños nunca fue tan fácil.
            </HeadingH1>

            <div class="w-full flex flex-col items-center relative" ref="searchContainer">
                <!-- Search -->
                <div class="w-full relative">
                    <!-- Destinos seleccionados DENTRO del input -->
                    <div v-if="selectedDestinations.length > 0"
                        class="absolute left-4 top-1/2 transform -translate-y-1/2 z-10">
                        <div class="flex flex-wrap gap-1">
                            <div v-for="destination in selectedDestinations" :key="destination.id"
                                class="flex items-center gap-0.5 bg-primary rounded-xl text-white text-xs pl-3 pr-1 py-[0.375rem]">
                                <span>{{ destination.name }}</span>
                                <button @click="removeDestination(destination.id)"
                                    class="flex justify-center items-center hover:text-gray-light transition-colors"
                                    aria-label="Remover destino">
                                    <Icon name="material-symbols:close-small" size="1.5rem" />
                                </button>
                            </div>
                        </div>
                    </div>
                    <label for="searchInput" class="sr-only">¿Dónde quieres viajar?</label>
                    <input v-model="searchQuery" type="text" id="searchInput"
                        :placeholder="selectedDestinations.length === 0 ? '¿Dónde quieres viajar?' : ''"
                        :readonly="isMobile && selectedDestinations.length > 0" :style="{ paddingLeft: '1rem' }"
                        class="w-full rounded-full border-0 text-gray-extraDark placeholder-gray-extraDark placeholder:text-xs placeholder:font-medium focus:outline-none text-base py-4 pr-16"
                        :class="{ 'bg-gray-100 cursor-not-allowed': isMobile && selectedDestinations.length > 0 }"
                        @input="handleInput" @focus="handleFocus" @keyup.enter="handleSearch"
                        @keydown.escape="hideDropdown" />

                    <button @click="handleSearch"
                        class="absolute right-2 top-1/2 bg-gray-extraLight hover:bg-primary border-2 border-primary text-primary hover:text-white font-bold rounded-full transform -translate-y-1/2 transition-colors duration-300 focus:outline-none px-4 py-2"
                        aria-label="Buscar destino">
                        <div class="flex items-center gap-2">
                            <Icon name="material-symbols:search-rounded" size="1.5rem" />
                            Buscar
                        </div>
                    </button>
                </div>

                <!-- Dropdown -->
                <div v-if="showDropdown"
                    class="w-max absolute top-full left-0 right-0 z-50 bg-white border-2 border-gray-dark rounded-md overflow-hidden mt-1">

                    <div v-if="isMobile && selectedDestinations.length > 0" class="text-gray-dark text-xs p-4">
                        Solo puedes elegir un destino
                    </div>

                    <div v-else-if="searchQuery.length < 3" class="text-gray-dark text-xs p-4">
                        Ingresa 3 o más caracteres
                    </div>

                    <div v-else-if="isLoading" class="text-gray-dark text-xs p-4">
                        Buscando...
                    </div>

                    <div v-else-if="filteredDestinations.length === 0" class="text-gray-dark text-xs p-4">
                        No se encontraron resultados
                    </div>

                    <div v-else class="overflow-y-auto max-h-52">
                        <button v-for="destination in filteredDestinations" :key="destination.id"
                            @click="selectDestination(destination)"
                            class="min-w-44 flex flex-col text-left hover:bg-violet-light/10 transition-colors duration-300 focus:outline-none px-4 py-3">
                            <div class="text-xs">{{ destination.name }}</div>
                        </button>
                    </div>
                </div>
            </div>

            <!-- Promocion -->
            <div
                class="w-max flex items-center justify-center gap-1 bg-primary text-white px-3 py-1 rounded-full text-xs">
                <Icon name="material-symbols:check-circle-outline-rounded" />
                <p class="font-medium">
                    Reserva con el 20% y paga en cuotas.
                </p>
            </div>
        </div>
    </section>
</template>

<script setup>
const searchQuery = ref('')
const showDropdown = ref(false)
const isLoading = ref(false)
const searchContainer = ref(null)
const selectedDestinations = ref([])

const destinations = ref([
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

const isMobile = ref(false)

const filteredDestinations = computed(() => {
    if (searchQuery.value.length < 3) return []

    const query = searchQuery.value.toLowerCase().trim()
    const selectedIds = selectedDestinations.value.map(d => d.id)

    return destinations.value.filter(destination =>
        destination.name.toLowerCase().includes(query) &&
        !selectedIds.includes(destination.id)
    )
})

const handleFocus = () => {
    showDropdown.value = true

    // Si es mobile y ya hay destino seleccionado, no permitir escribir
    if (isMobile.value && selectedDestinations.value.length > 0) {
        return
    }
}

const handleInput = () => {
    if (isMobile.value && selectedDestinations.value.length > 0) {
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

const selectDestination = (destination) => {
    if (isMobile.value) {
        selectedDestinations.value = [destination]
    } else {
        selectedDestinations.value.push(destination)
    }

    searchQuery.value = ''
    hideDropdown()
}

const removeDestination = (destinationId) => {
    selectedDestinations.value = selectedDestinations.value.filter(d => d.id !== destinationId)
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
        if (isMobile.value && selectedDestinations.value.length > 1) {
            selectedDestinations.value = [selectedDestinations.value[0]]
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
<template>
    <DefaultSection class="relative" style="background-position: 80% 50%;">
        <NuxtImg src="/images/home/Hero-Mobile.png" alt=""
            class="w-full min-h-[19.5rem] md:min-h-[27.25rem] lg:min-h-[28.75rem] object-cover md:rounded-[36px]" />
        <NuxtImg src="/images/home/Hero-Sticker.webp" alt=""
            class="w-16 md:w-24 h-16 md:h-24 absolute top-4 md:top-8 right-4 md:right-12 lg:right-[4.5rem] xl:right-[17.75rem]" />

        <div
            class="w-full max-w-72 md:max-w-[40rem] lg:max-w-[50.5rem] flex flex-col items-center gap-2 absolute z-[2] top-[4.75rem] md:top-[10.25rem] py-4 md:pt-0 md:pb-6">
            <div class="w-full lg:max-w-[47rem] md:flex md:flex-col md:gap-2 md:mb-4">
                <HeadingH1 class="text-light drop-shadow-[0_1px_4px_rgba(0,0,0,0.15)]">
                    Planificar el viaje de tus sueños nunca fue tan fácil.
                </HeadingH1>
                <p class="hidden md:inline text-light lg:text-xl font-semibold">
                    Transporte, alojamiento y actividades organizadas en todos nuestros tours,
                    para que tu única preocupación sea disfrutar cada momento.
                </p>
            </div>

            <div class="w-full flex flex-col items-center relative" ref="searchContainer">
                <!-- Search -->
                <!-- TODO: Fix the search input to not overlap with the selected destinations -->
                <div class="w-full relative search-container">
                    <!-- Destinos seleccionados dentro del input -->
                    <div v-if="selectedDestinatinos.length > 0" ref="destinosContainer"
                        class="max-w-[calc(100%-8rem)] absolute left-[3.5rem] top-1/2 z-10 transform -translate-y-1/2">
                        <div class="flex flex-wrap gap-1">
                            <div v-for="(destino, index) in visibleDestinos" :key="index"
                                class="flex items-center gap-0.5 bg-secondary rounded-xl text-light text-xs lg:text-sm pl-3 pr-1 py-[0.375rem] whitespace-nowrap">
                                <span class="max-w-[150px] truncate">{{ destino.name }}</span>
                                <button @click="removeDestino(destino.id)"
                                    class="flex justify-center items-center hover:text-gray-light transition-colors"
                                    aria-label="Remover destino">
                                    <Icon name="material-symbols:close-small" size="1.5rem" />
                                </button>
                            </div>
                        </div>
                    </div>

                    <div
                        class="hidden md:flex absolute left-6 top-1/2 transform -translate-y-1/2 z-10 pointer-events-none">
                        <Icon name="material-symbols:location-on-outline" size="1.5rem" class="text-gray-dark" />
                    </div>

                    <label for="searchInput" class="sr-only">¿Dónde quieres viajar?</label>
                    <input v-model="searchQuery" type="text" id="searchInput"
                        :placeholder="selectedDestinatinos.length === 0 ? '¿Dónde quieres viajar?' : ''"
                        :readonly="selectedDestinatinos.length >= maxDestinos" :style="inputPaddingStyle"
                        class="w-full rounded-full border-0 text-gray-extraDark text-xs md:text-sm lg:text-base placeholder-gray-dark placeholder:text-xs md:placeholder:text-sm lg:placeholder:text-base placeholder:font-semibold focus:outline-none py-5 lg:py-[1.125rem] px-6"
                        @input="handleInput" @focus="handleFocus" @keyup.enter="handleSearch"
                        @keydown.escape="hideDropdown" />

                    <button @click="handleSearch"
                        class="w-12 md:w-auto h-12 md:h-auto flex justify-center items-center absolute right-1 top-1/2 bg-primary hover:bg-primaryButton-hover focus:bg-primaryButton-focus text-light font-bold rounded-full transform -translate-y-1/2 transition-colors duration-300 focus:outline-none md:py-3 md:px-6"
                        aria-label="Buscar destino">
                        <div class="flex items-center gap-2">
                            <Icon name="material-symbols:search-rounded" size="1.5rem" />
                            <p class="hidden md:inline">Buscar</p>
                        </div>
                    </button>
                </div>

                <!-- Dropdown -->
                <div v-if="showDropdown"
                    class="w-max absolute top-full left-4 right-0 bg-light border border-gray-dark rounded-xl overflow-hidden mt-1">

                    <div v-if="selectedDestinatinos.length >= maxDestinos"
                        class="text-gray-dark font-semibold text-xs lg:text-sm p-4">
                        {{ isMobile ? 'Solo puedes elegir un destino' : `Máximo ${maxDestinos} destinos` }}
                    </div>

                    <div v-else-if="searchQuery.length < 3" class="text-gray-dark font-semibold text-xs lg:text-sm p-4">
                        Ingresa 3 o más caracteres
                    </div>

                    <div v-else-if="isLoading" class="text-gray-dark font-semibold text-xs lg:text-sm p-4">
                        Buscando...
                    </div>

                    <div v-else-if="filteredDestinatinos.length === 0"
                        class="text-gray-dark font-semibold text-xs lg:text-sm p-4">
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
                class="w-max flex items-center justify-center gap-1 z-[-1] bg-primary text-light rounded-full py-[0.375rem] md:py-2 pl-2 md:pl-3 pr-3 md:pr-4">
                <Icon name="material-symbols:check-circle-outline-rounded" class="md:w-5 md:h-5" />
                <p class="md:hidden font-medium text-xs">
                    Reserva con el 20% y paga en cuotas.
                </p>
                <p class="hidden md:inline text-sm">Reserva con el 20% y pagá el resto en cuotas fijas sin interés</p>
            </div>
        </div>
        <div class="w-full md:max-w-[35.75rem] lg:max-w-[50.5rem] xl:max-w-[76rem] -mt-16 lg:-mt-[4.5rem]">
            <CarouselStatic :slides-per-view="{ base: 1.5, sm: 1.5, md: 3, lg: 4, xl: 6 }" :button-position="{
                top: '20%',
                transform: 'translateY(0)',
                left: {
                    base: '0.5rem',
                    md: '-1.5rem',
                    lg: '-1.5rem',
                    xl: '-1.75rem',
                },
                right: {
                    base: '0.5rem',
                    md: '-1.5rem',
                    lg: '-1.5rem',
                    xl: '-1.75rem',
                }
            }">
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
const destinosContainer = ref(null)
const destinosWidth = ref(0)

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
    { id: 10, name: 'Berlín' },
    { id: 11, name: 'Ciudad del Cabo' },
    { id: 12, name: 'San Petersburgo' }
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
    },
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

const maxDestinos = computed(() => isMobile.value ? 1 : 5)

const visibleDestinos = computed(() => selectedDestinatinos.value)

const inputPaddingStyle = computed(() => {
    if (isMobile.value) {
        return {}
    }

    if (selectedDestinatinos.value.length === 0) {
        return { paddingLeft: '3.5rem' }
    }

    const basePadding = 56;
    const gap = 4;
    const dynamicPadding = destinosWidth.value + basePadding + gap;

    const minRightPadding = 48 + 16;

    return {
        paddingLeft: `${dynamicPadding}px`,
        paddingRight: `${minRightPadding}px`
    }
})

const filteredDestinatinos = computed(() => {
    if (searchQuery.value.length < 3) return []

    const query = searchQuery.value.toLowerCase().trim()
    const selectedIds = selectedDestinatinos.value.map(d => d.id)

    return destinos.value.filter(destino =>
        destino.name.toLowerCase().includes(query) &&
        !selectedIds.includes(destino.id)
    )
})

const updateDestinosWidth = () => {
    nextTick(() => {
        if (destinosContainer.value) {
            destinosWidth.value = destinosContainer.value.offsetWidth
        } else {
            destinosWidth.value = 0
        }
    })
}

const handleFocus = () => {
    showDropdown.value = true

    if (selectedDestinatinos.value.length >= maxDestinos.value) {
        return
    }
}

const handleInput = () => {
    if (selectedDestinatinos.value.length >= maxDestinos.value) {
        return
    }

    showDropdown.value = true

    if (searchQuery.value.trim().length >= 3) {
        isLoading.value = true

        setTimeout(() => {
            isLoading.value = false
        }, 500)
    } else {
        isLoading.value = false
    }
}

const selectDestino = (destino) => {
    if (selectedDestinatinos.value.length < maxDestinos.value) {
        selectedDestinatinos.value.push(destino)
        searchQuery.value = ''
        hideDropdown()
        updateDestinosWidth()
    }
}

const removeDestino = (destinoId) => {
    selectedDestinatinos.value = selectedDestinatinos.value.filter(d => d.id !== destinoId)
    updateDestinosWidth()
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

watch(() => selectedDestinatinos.value.length, () => {
    nextTick(() => {
        updateDestinosWidth();
    });
});

onMounted(() => {
    document.addEventListener('click', handleClickOutside)
    isMobile.value = window.innerWidth < 768

    const handleResize = () => {
        isMobile.value = window.innerWidth < 768

        if (isMobile.value && selectedDestinatinos.value.length > 1) {
            selectedDestinatinos.value = [selectedDestinatinos.value[0]]
        }

        updateDestinosWidth()
    }

    window.addEventListener('resize', handleResize)

    window.handleResize = handleResize

    updateDestinosWidth()
})

onUnmounted(() => {
    document.removeEventListener('click', handleClickOutside)
    if (window.handleResize) {
        window.removeEventListener('resize', window.handleResize)
        delete window.handleResize
    }
})
</script>
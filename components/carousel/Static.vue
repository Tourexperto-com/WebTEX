<template>
    <div class="relative w-full" ref="carouselWrapper">
        <button v-if="showLeftArrow" @click="scrollLeft"
            class="w-12 h-12 hidden lg:flex justify-center items-center absolute z-10 bg-light shadow-md rounded-full"
            :style="leftButtonStyle" :disabled="isAtStart" aria-label="Anterior">
            <Icon name="material-symbols:chevron-left-rounded" size="3rem" class="text-primary" />
        </button>

        <div ref="container" class="scrollbar-hide overflow-x-auto cursor-grab select-none"
            :class="{ 'cursor-grabbing': isDragging }" @scroll="updateArrows" @mousedown="startDrag" @mousemove="drag"
            @mouseup="endDrag" @mouseleave="endDrag" @touchstart="startDrag" @touchmove="drag" @touchend="endDrag">

            <div class="carousel-wrapper flex pb-2 px-1 first:ml-4 lg:first:ml-0 first:mr-4 lg:first:mr-0"
                :style="wrapperStyles">
                <slot />
            </div>
        </div>

        <button v-if="showRightArrow" @click="scrollRight"
            class="w-12 h-12 hidden lg:flex justify-center items-center absolute z-10 bg-light shadow-md rounded-full"
            :style="rightButtonStyle" :disabled="isAtEnd" aria-label="Siguiente">
            <Icon name="material-symbols:chevron-right-rounded" size="3rem" class="text-primary" />
        </button>
    </div>
</template>

<script setup>
const props = defineProps({
    gap: {
        type: [Number, Object],
        default: 8
    },
    slidesPerView: {
        type: Object,
        default: () => ({
            base: 1.5,
            sm: 2.5,
            md: 3.5,
            lg: 4,
            xl: 5
        })
    },
    buttonPosition: {
        type: Object,
        default: () => ({
            top: '50%',
            transform: 'translateY(-50%)',
            left: {
                base: '0.5rem',
                lg: '-2rem'
            },
            right: {
                base: '0.5rem',
                lg: '-2rem'
            }
        })
    },
    scrollBehavior: {
        type: String,
        default: 'smooth',
        validator: (value) => ['smooth', 'auto'].includes(value)
    }
})

const container = ref(null)
const carouselWrapper = ref(null)

const isAtStart = ref(true)
const isAtEnd = ref(false)
const isDragging = ref(false)
const containerWidth = ref(0)
const currentBreakpoint = ref('base')

let startX = 0
let scrollStart = 0
let resizeObserver = null

const showLeftArrow = computed(() => !isAtStart.value)
const showRightArrow = computed(() => !isAtEnd.value)

const slidesVisible = computed(() => {
    const value = props.slidesPerView[currentBreakpoint.value] || props.slidesPerView.base
    // Asegurar que siempre devuelva un número entero para evitar problemas de cálculo
    return Math.floor(value)
})

// Nuevo computed para slides parciales (para casos como 3.5, 4.2, etc.)
const slidesVisibleDecimal = computed(() => {
    return props.slidesPerView[currentBreakpoint.value] || props.slidesPerView.base
})

const responsiveGap = computed(() => {
    if (typeof props.gap === 'number') {
        return props.gap
    }
    return props.gap[currentBreakpoint.value] || props.gap.base || 8
})

// Mejorado: Cálculo para scroll de una slide a la vez
const scrollAmount = computed(() => {
    if (!containerWidth.value) return 280

    // Restar el padding horizontal de px-1 (4px * 2 = 8px)
    const paddingOffset = 8
    const effectiveWidth = containerWidth.value - paddingOffset

    // Calcular el espacio ocupado por gaps
    const totalGapsWidth = (slidesVisibleDecimal.value - 1) * responsiveGap.value
    const availableWidth = effectiveWidth - totalGapsWidth
    const slideWidth = availableWidth / slidesVisibleDecimal.value

    // Scroll de exactamente una slide + su gap
    return slideWidth + responsiveGap.value
})

const wrapperStyles = computed(() => ({
    gap: `${responsiveGap.value}px`,
    width: 'max-content'
}))

// Mejorada: Detección de breakpoints más robusta
const updateBreakpoint = () => {
    if (!process.client) return

    const width = window.innerWidth
    let newBreakpoint = 'base'

    if (width >= 1280) newBreakpoint = 'xl'
    else if (width >= 1024) newBreakpoint = 'lg'
    else if (width >= 768) newBreakpoint = 'md'
    else if (width >= 640) newBreakpoint = 'sm'

    if (currentBreakpoint.value !== newBreakpoint) {
        currentBreakpoint.value = newBreakpoint
        nextTick(() => {
            updateContainerWidth()
            setupChildrenClasses()
            updateArrows()
        })
    }
}

// Mejorada: Cálculo más preciso del ancho del contenedor
const updateContainerWidth = () => {
    if (!container.value) return

    // Usar getBoundingClientRect para mayor precisión
    const rect = container.value.getBoundingClientRect()
    containerWidth.value = rect.width
}

// Mejorada: Detección de arrows con tolerancia ajustable
const updateArrows = () => {
    if (!container.value) return

    const { scrollLeft, scrollWidth, clientWidth } = container.value
    const tolerance = 2 // Reducida la tolerancia para mejor precisión

    isAtStart.value = scrollLeft <= tolerance
    isAtEnd.value = scrollLeft >= scrollWidth - clientWidth - tolerance
}

// Mejoradas: Funciones de scroll con mejor manejo
const scrollLeft = () => {
    if (!container.value) return

    container.value.scrollBy({
        left: -scrollAmount.value,
        behavior: props.scrollBehavior
    })
}

const scrollRight = () => {
    if (!container.value) return

    container.value.scrollBy({
        left: scrollAmount.value,
        behavior: props.scrollBehavior
    })
}

// Nuevas funciones para scroll más preciso
const scrollToSlide = (slideIndex) => {
    if (!container.value) return

    // Restar el padding horizontal de px-1 (4px * 2 = 8px)
    const paddingOffset = 8
    const effectiveWidth = containerWidth.value - paddingOffset

    const totalGapsWidth = (slidesVisibleDecimal.value - 1) * responsiveGap.value
    const availableWidth = effectiveWidth - totalGapsWidth
    const slideWidth = availableWidth / slidesVisibleDecimal.value
    const targetScroll = (slideWidth + responsiveGap.value) * slideIndex

    container.value.scrollTo({
        left: targetScroll,
        behavior: props.scrollBehavior
    })
}

const getCurrentSlideIndex = () => {
    if (!container.value) return 0

    // Restar el padding horizontal de px-1 (4px * 2 = 8px)
    const paddingOffset = 8
    const effectiveWidth = containerWidth.value - paddingOffset

    const totalGapsWidth = (slidesVisibleDecimal.value - 1) * responsiveGap.value
    const availableWidth = effectiveWidth - totalGapsWidth
    const slideWidth = availableWidth / slidesVisibleDecimal.value
    return Math.round(container.value.scrollLeft / (slideWidth + responsiveGap.value))
}

const startDrag = (e) => {
    isDragging.value = true
    startX = e.pageX || e.touches[0].pageX
    scrollStart = container.value.scrollLeft
    e.preventDefault()
}

const drag = (e) => {
    if (!isDragging.value) return
    e.preventDefault()

    const x = e.pageX || e.touches[0].pageX
    const walk = (x - startX) * 1.2 // Reducido para mejor control
    container.value.scrollLeft = scrollStart - walk
}

const endDrag = () => {
    isDragging.value = false
}

// Mejorada: Setup de clases de children más robusto
const setupChildrenClasses = () => {
    nextTick(() => {
        if (!container.value || !containerWidth.value) return

        const wrapper = container.value.querySelector('.carousel-wrapper')
        if (!wrapper) return

        const children = Array.from(wrapper.children)

        if (children.length === 0) return

        // Restar el padding horizontal de px-1 (4px * 2 = 8px)
        const paddingOffset = 8
        const effectiveWidth = containerWidth.value - paddingOffset

        // Calcular el espacio ocupado por gaps
        const totalGapsWidth = (slidesVisibleDecimal.value - 1) * responsiveGap.value
        const availableWidth = effectiveWidth - totalGapsWidth
        const slideWidth = availableWidth / slidesVisibleDecimal.value

        children.forEach(child => {
            child.style.width = `${slideWidth}px`
            child.style.flexShrink = '0'
            child.style.minWidth = `${slideWidth}px`
        })
    })
}

// New computed for responsive left positioning
const responsiveLeft = computed(() => {
    const leftConfig = props.buttonPosition.left
    if (typeof leftConfig === 'string') {
        return leftConfig
    }
    return leftConfig?.[currentBreakpoint.value] || leftConfig?.base || '0.5rem'
})

// New computed for responsive right positioning  
const responsiveRight = computed(() => {
    const rightConfig = props.buttonPosition.right
    if (typeof rightConfig === 'string') {
        return rightConfig
    }
    return rightConfig?.[currentBreakpoint.value] || rightConfig?.base || '0.5rem'
})

const leftButtonStyle = computed(() => ({
    top: props.buttonPosition.top,
    transform: props.buttonPosition.transform,
    left: responsiveLeft.value
}))

const rightButtonStyle = computed(() => ({
    top: props.buttonPosition.top,
    transform: props.buttonPosition.transform,
    right: responsiveRight.value
}))

// Función de inicialización mejorada
const initialize = async () => {
    await nextTick()

    updateBreakpoint()
    updateContainerWidth()
    setupChildrenClasses()

    // Pequeño delay para asegurar que todo esté renderizado
    setTimeout(() => {
        updateArrows()
    }, 100)
}

onMounted(() => {
    initialize()

    // Event listeners con debounce para resize
    let resizeTimeout
    const debouncedResize = () => {
        clearTimeout(resizeTimeout)
        resizeTimeout = setTimeout(() => {
            updateBreakpoint()
            updateContainerWidth()
            setupChildrenClasses()
        }, 150)
    }

    window.addEventListener('resize', debouncedResize)

    // ResizeObserver para cambios en el contenedor
    if (container.value && window.ResizeObserver) {
        resizeObserver = new ResizeObserver((entries) => {
            for (const entry of entries) {
                if (entry.target === container.value) {
                    updateContainerWidth()
                    setupChildrenClasses()
                }
            }
        })
        resizeObserver.observe(container.value)
    }
})

onUnmounted(() => {
    window.removeEventListener('resize', updateBreakpoint)
    window.removeEventListener('resize', updateContainerWidth)
    window.removeEventListener('resize', setupChildrenClasses)

    if (resizeObserver) {
        resizeObserver.disconnect()
    }
})

// Exponer funciones útiles
defineExpose({
    scrollLeft,
    scrollRight,
    scrollToSlide,
    getCurrentSlideIndex,
    updateArrows,
    setupChildrenClasses
})
</script>

<style scoped>
.scrollbar-hide {
    -ms-overflow-style: none;
    scrollbar-width: none;
}

.scrollbar-hide::-webkit-scrollbar {
    display: none;
}

/* Asegurar que el contenedor mantenga su tamaño */
.carousel-wrapper {
    min-height: 1px;
    /* Evitar colapso */
}
</style>
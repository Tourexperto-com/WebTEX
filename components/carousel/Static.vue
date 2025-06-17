<template>
    <div class="relative w-full" ref="carouselWrapper">
        <button v-if="showLeftArrow" @click="scrollLeft"
            class="w-12 h-12 hidden md:flex justify-center items-center absolute z-10 bg-light shadow-md rounded-full"
            :style="leftButtonStyle" :disabled="isAtStart" aria-label="Anterior">
            <Icon name="material-symbols:chevron-left-rounded" size="3rem" class="text-primary" />
        </button>

        <div ref="container" class="scrollbar-hide overflow-x-auto cursor-grab select-none"
            :class="{ 'cursor-grabbing': isDragging }" @scroll="updateArrows" @mousedown="startDrag" @mousemove="drag"
            @mouseup="endDrag" @mouseleave="endDrag" @touchstart="startDrag" @touchmove="drag" @touchend="endDrag">

            <div class="carousel-wrapper flex pb-2 px-1 first:ml-4 md:first:ml-0 first:mr-4 md:first:mr-0"
                :style="wrapperStyles">
                <slot />
            </div>
        </div>

        <button v-if="showRightArrow" @click="scrollRight"
            class="w-12 h-12 hidden md:flex justify-center items-center absolute z-10 bg-light shadow-md rounded-full"
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
            xl: 5,
            xxl: 5,
        })
    },
    buttonPosition: {
        type: Object,
        default: () => ({
            top: '50%',
            transform: 'translateY(-50%)',
            left: {
                base: '0.5rem',
                md: '-2rem',
                lg: '-2rem',
                xl: '-2rem',
                xxl: '-2rem',
            },
            right: {
                base: '0.5rem',
                md: '-2rem',
                lg: '-2rem',
                xl: '-2rem',
                xxl: '-2rem',
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
    return Math.floor(value)
})

const slidesVisibleDecimal = computed(() => {
    return props.slidesPerView[currentBreakpoint.value] || props.slidesPerView.base
})

const responsiveGap = computed(() => {
    if (typeof props.gap === 'number') {
        return props.gap
    }
    return props.gap[currentBreakpoint.value] || props.gap.base || 8
})

const scrollAmount = computed(() => {
    if (!containerWidth.value) return 280

    const paddingOffset = 8
    const effectiveWidth = containerWidth.value - paddingOffset

    const totalGapsWidth = (slidesVisibleDecimal.value - 1) * responsiveGap.value
    const availableWidth = effectiveWidth - totalGapsWidth
    const slideWidth = availableWidth / slidesVisibleDecimal.value

    return slideWidth + responsiveGap.value
})

const wrapperStyles = computed(() => ({
    gap: `${responsiveGap.value}px`,
    width: 'max-content'
}))

const updateBreakpoint = () => {
    if (!process.client) return

    const width = window.innerWidth
    let newBreakpoint = 'base'

    if (width >= 1440) newBreakpoint = 'xxl'
    else if (width >= 1280) newBreakpoint = 'xl'
    else if (width >= 1080) newBreakpoint = 'lg'
    else if (width >= 768) newBreakpoint = 'md'
    else if (width >= 480) newBreakpoint = 'sm'

    if (currentBreakpoint.value !== newBreakpoint) {
        currentBreakpoint.value = newBreakpoint
        nextTick(() => {
            updateContainerWidth()
            setupChildrenClasses()
            updateArrows()
        })
    }
}

const updateContainerWidth = () => {
    if (!container.value) return

    const rect = container.value.getBoundingClientRect()
    containerWidth.value = rect.width
}

const updateArrows = () => {
    if (!container.value) return

    const { scrollLeft, scrollWidth, clientWidth } = container.value
    const tolerance = 2

    isAtStart.value = scrollLeft <= tolerance
    isAtEnd.value = scrollLeft >= scrollWidth - clientWidth - tolerance
}

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

const scrollToSlide = (slideIndex) => {
    if (!container.value) return

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
    const walk = (x - startX) * 1.2
    container.value.scrollLeft = scrollStart - walk
}

const endDrag = () => {
    isDragging.value = false
}

const setupChildrenClasses = () => {
    nextTick(() => {
        if (!container.value || !containerWidth.value) return

        const wrapper = container.value.querySelector('.carousel-wrapper')
        if (!wrapper) return

        const children = Array.from(wrapper.children)

        if (children.length === 0) return

        const paddingOffset = 8
        const effectiveWidth = containerWidth.value - paddingOffset

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

const responsiveLeft = computed(() => {
    const leftConfig = props.buttonPosition.left
    if (typeof leftConfig === 'string') {
        return leftConfig
    }
    return leftConfig?.[currentBreakpoint.value] || leftConfig?.base || '0.5rem'
})

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

const initialize = async () => {
    await nextTick()

    updateBreakpoint()
    updateContainerWidth()
    setupChildrenClasses()

    setTimeout(() => {
        updateArrows()
    }, 100)
}

onMounted(() => {
    initialize()

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

.carousel-wrapper {
    min-height: 1px;
}
</style>
<template>
    <div class="relative w-full" ref="carouselWrapper">
        <button v-if="showLeftArrow" @click="scrollLeft"
            class="w-12 h-12 hidden lg:flex justify-center items-center absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-white shadow-md rounded-full"
            :disabled="isAtStart" aria-label="Anterior">
            <Icon name="material-symbols:chevron-left-rounded" size="3rem" class="text-primary" />
        </button>

        <div ref="container" class="scrollbar-hide overflow-x-auto cursor-grab select-none"
            :class="{ 'cursor-grabbing': isDragging }" @scroll="updateArrows" @mousedown="startDrag" @mousemove="drag"
            @mouseup="endDrag" @mouseleave="endDrag" @touchstart="startDrag" @touchmove="drag" @touchend="endDrag">

            <div class="carousel-wrapper flex pb-2" :style="wrapperStyles">
                <slot />
                <div class="carousel-spacer" :style="spacerStyles" aria-hidden="true"></div>
            </div>
        </div>

        <button v-if="showRightArrow" @click="scrollRight"
            class="w-12 h-12 hidden lg:flex justify-center items-center absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-white shadow-md rounded-full"
            :disabled="isAtEnd" aria-label="Siguiente">
            <Icon name="material-symbols:chevron-right-rounded" size="3rem" class="text-primary" />
        </button>
    </div>
</template>

<script setup>
const props = defineProps({
    gap: {
        type: Number,
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
    return props.slidesPerView[currentBreakpoint.value] || props.slidesPerView.base
})

const scrollAmount = computed(() => {
    if (!containerWidth.value) return 280
    const slideWidth = containerWidth.value / slidesVisible.value
    return slideWidth * Math.floor(slidesVisible.value)
})

const wrapperStyles = computed(() => ({
    gap: `${props.gap}px`,
    paddingLeft: `${props.gap * 2}px`,
    width: 'max-content'
}))

const spacerStyles = computed(() => ({
    width: `${props.gap}px`,
    height: '1px',
    flexShrink: 0
}))

const updateBreakpoint = () => {
    const width = window.innerWidth
    if (width >= 1280) currentBreakpoint.value = 'xl'
    else if (width >= 1024) currentBreakpoint.value = 'lg'
    else if (width >= 768) currentBreakpoint.value = 'md'
    else if (width >= 640) currentBreakpoint.value = 'sm'
    else currentBreakpoint.value = 'base'
}

const updateContainerWidth = () => {
    if (container.value) {
        containerWidth.value = container.value.clientWidth
    }
}

const updateArrows = () => {
    if (!container.value) return

    const { scrollLeft, scrollWidth, clientWidth } = container.value
    isAtStart.value = scrollLeft <= 5
    isAtEnd.value = scrollLeft >= scrollWidth - clientWidth - 5
}

const scrollLeft = () => {
    container.value?.scrollBy({
        left: -scrollAmount.value,
        behavior: 'smooth'
    })
}

const scrollRight = () => {
    container.value?.scrollBy({
        left: scrollAmount.value,
        behavior: 'smooth'
    })
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
    const walk = (x - startX) * 1.5
    container.value.scrollLeft = scrollStart - walk
}

const endDrag = () => {
    isDragging.value = false
}

const setupChildrenClasses = () => {
    nextTick(() => {
        if (!container.value) return

        const wrapper = container.value.querySelector('.carousel-wrapper')
        if (!wrapper) return

        const children = Array.from(wrapper.children).filter(child => !child.classList.contains('carousel-spacer'))
        const slideWidth = (containerWidth.value - (props.gap * 2)) / slidesVisible.value

        children.forEach(child => {
            child.style.width = `${slideWidth}px`
            child.style.flexShrink = '0'
        })
    })
}

onMounted(async () => {
    await nextTick()

    updateBreakpoint()
    updateContainerWidth()
    updateArrows()

    setupChildrenClasses()

    window.addEventListener('resize', updateBreakpoint)
    window.addEventListener('resize', updateContainerWidth)
    window.addEventListener('resize', setupChildrenClasses)

    if (container.value) {
        resizeObserver = new ResizeObserver(() => {
            updateContainerWidth()
            setupChildrenClasses()
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

defineExpose({ scrollLeft, scrollRight })
</script>

<style scoped>
.scrollbar-hide {
    -ms-overflow-style: none;
    scrollbar-width: none;
}

.scrollbar-hide::-webkit-scrollbar {
    display: none;
}

.carousel-spacer {
    pointer-events: none;
}
</style>
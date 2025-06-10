<template>
    <div class="relative w-full" ref="carouselWrapper">
        <div ref="container" class="scrollbar-hide overflow-x-auto cursor-grab select-none snap-x snap-mandatory"
            :class="{ 'cursor-grabbing': isDragging }" @scroll="handleScroll" @mousedown="startDrag" @mousemove="drag"
            @mouseup="endDrag" @touchstart="startDrag" @touchmove="drag" @touchend="endDrag" @mouseenter="pauseAutoplay"
            @mouseleave="resumeAutoplay">

            <div class="carousel-wrapper max-content flex pb-2" :style="wrapperStyles">
                <slot />
            </div>
        </div>

        <div v-if="showDots && totalSlides > 1" class="flex justify-center gap-2 mt-1">
            <button v-for="(dot, index) in totalSlides" :key="index" @click="goToSlide(index)"
                class="w-3 h-3 rounded-full transition-colors duration-300"
                :class="currentSlide === index ? 'bg-primary' : 'bg-gray-300 hover:bg-gray-400'"
                :aria-label="`Ir a la diapositiva ${index + 1}`">
            </button>
        </div>
    </div>
</template>

<script setup>
const props = defineProps({
    autoPlay: { type: Boolean, default: false },
    autoPlayInterval: { type: Number, default: 3000 },
    showDots: { type: Boolean, default: false },
    pauseOnInvisible: { type: Boolean, default: true },
    visibilityThreshold: { type: Number, default: 0.5 },
    gap: { type: Number, default: 8 },

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

const emit = defineEmits(['slide-change'])

const container = ref(null)
const carouselWrapper = ref(null)

const isDragging = ref(false)
const currentSlide = ref(0)
const totalSlides = ref(0)
const isVisible = ref(true)
const isPaused = ref(false)
const containerWidth = ref(0)
const currentBreakpoint = ref('base')
const slideElements = ref([])

let startX = 0
let scrollStart = 0
let autoplayTimer = null
let intersectionObserver = null
let scrollTimeout = null
let resizeObserver = null

const slidesVisible = computed(() => {
    return props.slidesPerView[currentBreakpoint.value] || props.slidesPerView.base
})

const wrapperStyles = computed(() => ({
    gap: `${props.gap}px`,
    paddingLeft: `${props.gap * 2}px`,
    paddingRight: `${props.gap * 2}px`
}))

const updateBreakpoint = () => {
    const width = window.innerWidth
    if (width >= 1280) currentBreakpoint.value = 'xl'
    else if (width >= 1080) currentBreakpoint.value = 'lg'
    else if (width >= 768) currentBreakpoint.value = 'md'
    else if (width >= 480) currentBreakpoint.value = 'sm'
    else currentBreakpoint.value = 'base'
}

const updateContainerWidth = () => {
    if (container.value) {
        containerWidth.value = container.value.clientWidth
    }
}

const setupChildrenClasses = async () => {
    await nextTick()

    if (!container.value) return

    const wrapper = container.value.querySelector('.carousel-wrapper')
    if (!wrapper) return

    const children = wrapper.children
    const slideWidth = (containerWidth.value - (props.gap * 2)) / slidesVisible.value

    slideElements.value = Array.from(children)
    slideElements.value.forEach(child => {
        child.style.width = `${slideWidth}px`
        child.style.flexShrink = '0'
        child.classList.add('snap-start')
    })

    totalSlides.value = children.length
}

const updateSlidePosition = () => {
    if (!container.value || slideElements.value.length === 0) return

    const containerScrollLeft = container.value.scrollLeft
    let closestSlide = 0
    let minDistance = Infinity

    slideElements.value.forEach((slide, i) => {
        const slideLeft = slide.offsetLeft - (props.gap * 2)
        const distance = Math.abs(slideLeft - containerScrollLeft)

        if (distance < minDistance) {
            minDistance = distance
            closestSlide = i
        }
    })

    if (closestSlide !== currentSlide.value) {
        currentSlide.value = closestSlide
        emit('slide-change', closestSlide)
    }
}

const handleScroll = () => {
    if (scrollTimeout) clearTimeout(scrollTimeout)
    scrollTimeout = setTimeout(updateSlidePosition, 100)
}

const goToSlide = (slideIndex) => {
    if (!container.value || !slideElements.value[slideIndex]) return

    const targetSlide = slideElements.value[slideIndex]
    const targetPosition = targetSlide.offsetLeft - (props.gap * 2)

    container.value.scrollTo({
        left: targetPosition,
        behavior: 'smooth'
    })

    currentSlide.value = slideIndex
    pauseAutoplay()
    setTimeout(resumeAutoplay, 3000)
}

const goToNext = () => {
    const nextSlide = currentSlide.value + 1
    if (nextSlide < totalSlides.value) {
        goToSlide(nextSlide)
        return true
    }
    return false
}

const startAutoplay = () => {
    if (!props.autoPlay || autoplayTimer) return

    autoplayTimer = setInterval(() => {
        if (!isVisible.value && props.pauseOnInvisible) return
        if (isPaused.value) return
        if (isDragging.value) return

        if (!goToNext()) {
            goToSlide(0)
        }
    }, props.autoPlayInterval)
}

const stopAutoplay = () => {
    if (autoplayTimer) {
        clearInterval(autoplayTimer)
        autoplayTimer = null
    }
}

const pauseAutoplay = () => {
    isPaused.value = true
}

const resumeAutoplay = () => {
    if (!isDragging.value) {
        isPaused.value = false
        if (props.autoPlay && !autoplayTimer) {
            startAutoplay()
        }
    }
}

const startDrag = (e) => {
    isDragging.value = true
    startX = e.pageX || e.touches[0].pageX
    scrollStart = container.value.scrollLeft
    e.preventDefault()
    pauseAutoplay()
}

const drag = (e) => {
    if (!isDragging.value) return
    e.preventDefault()

    const x = e.pageX || e.touches[0].pageX
    const walk = (x - startX) * 1.2
    container.value.scrollLeft = scrollStart - walk
}

const endDrag = () => {
    if (isDragging.value) {
        isDragging.value = false
        setTimeout(() => {
            updateSlidePosition()
            resumeAutoplay()
        }, 300)
    }
}

const setupIntersectionObserver = () => {
    if (!props.pauseOnInvisible || !carouselWrapper.value) return

    intersectionObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                isVisible.value = entry.isIntersecting
                if (entry.isIntersecting && props.autoPlay) {
                    resumeAutoplay()
                } else {
                    pauseAutoplay()
                }
            })
        },
        {
            threshold: props.visibilityThreshold,
            rootMargin: '50px'
        }
    )

    intersectionObserver.observe(carouselWrapper.value)
}

onMounted(async () => {
    await nextTick()

    updateBreakpoint()
    updateContainerWidth()

    setTimeout(async () => {
        await setupChildrenClasses()
        updateSlidePosition()
        setupIntersectionObserver()

        if (props.autoPlay) {
            startAutoplay()
        }
    }, 100)

    window.addEventListener('resize', async () => {
        updateBreakpoint()
        updateContainerWidth()
        await setupChildrenClasses()
    })

    if (container.value) {
        resizeObserver = new ResizeObserver(async () => {
            updateContainerWidth()
            await setupChildrenClasses()
        })
        resizeObserver.observe(container.value)
    }
})

onUnmounted(() => {
    if (scrollTimeout) clearTimeout(scrollTimeout)
    if (intersectionObserver) intersectionObserver.disconnect()
    if (resizeObserver) resizeObserver.disconnect()
    stopAutoplay()
})

defineExpose({
    goToSlide,
    startAutoplay,
    stopAutoplay,
    currentSlide: readonly(currentSlide),
    totalSlides: readonly(totalSlides)
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

.snap-x {
    scroll-behavior: smooth;
}
</style>
<template>
    <div class="relative w-full" ref="carouselWrapper">
        <div ref="container" class="scrollbar-hide overflow-x-auto cursor-grab select-none snap-x snap-mandatory"
            :class="{ 'cursor-grabbing': isDragging }" @scroll="handleScroll" @mousedown="startDrag" @mousemove="drag"
            @mouseup="endDrag" @touchstart="startDrag" @touchmove="drag" @touchend="endDrag" @mouseenter="pauseAutoplay"
            @mouseleave="resumeAutoplay">

            <div class="carousel-wrapper flex" :style="wrapperStyles">
                <slot />
            </div>
        </div>

        <div v-if="showDots && totalPages > 1" class="flex justify-center gap-2 mt-3 lg:mt-5">
            <button v-for="(dot, index) in totalPages" :key="index" @click="goToPage(index)"
                class="w-3 h-3 rounded-full transition-colors duration-300"
                :class="currentPage === index ? 'bg-primary' : 'bg-gray-mid hover:bg-gray-dark'"
                :aria-label="`Ir a la página ${index + 1}`">
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
    gap: { 
        type: [Number, Object], 
        default: () => ({
            base: 8,
            sm: 8,
            md: 8,
            lg: 8,
            xl: 8,
            xxl: 8,
        })
    },
    slidesToScroll: { type: Number, default: 1 },

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
    }
})

const emit = defineEmits(['slide-change', 'page-change'])

const container = ref(null)
const carouselWrapper = ref(null)

const isDragging = ref(false)
const currentSlide = ref(0)
const currentPage = ref(0)
const totalSlides = ref(0)
const totalPages = ref(0)
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

const currentGap = computed(() => {
    if (typeof props.gap === 'number') {
        return props.gap
    }
    return props.gap[currentBreakpoint.value] || props.gap.base || 8
})

const wrapperStyles = computed(() => {
    const leftPadding = (containerWidth.value - (Math.floor(slidesVisible.value) * (containerWidth.value / slidesVisible.value))) / 2
    return {
        gap: `${currentGap.value}px`,
        paddingLeft: `${leftPadding}px`,
        paddingRight: `${leftPadding}px`
    }
})

const updateBreakpoint = () => {
    const width = window.innerWidth
    if (width >= 1440) currentBreakpoint.value = 'xxl'
    else if (width >= 1280) currentBreakpoint.value = 'xl'
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
    const slideWidth = (containerWidth.value / slidesVisible.value) - (currentGap.value * (slidesVisible.value - 1) / slidesVisible.value)

    slideElements.value = Array.from(children)
    slideElements.value.forEach(child => {
        child.style.width = `${slideWidth}px`
        child.style.flexShrink = '0'
        child.classList.add('snap-start')
    })

    totalSlides.value = children.length

    const visibleSlides = Math.floor(slidesVisible.value)
    const maxScrollableSlides = Math.max(0, totalSlides.value - visibleSlides)
    totalPages.value = Math.ceil((maxScrollableSlides + props.slidesToScroll) / props.slidesToScroll)
}

const updateSlidePosition = () => {
    if (!container.value || slideElements.value.length === 0) return

    const containerScrollLeft = container.value.scrollLeft
    const slideWidth = slideElements.value[0]?.offsetWidth || 0
    const gap = currentGap.value

    let closestSlide = Math.round(containerScrollLeft / (slideWidth + gap))
    closestSlide = Math.max(0, Math.min(closestSlide, totalSlides.value - 1))

    if (closestSlide !== currentSlide.value) {
        currentSlide.value = closestSlide
        emit('slide-change', closestSlide)

        const newPage = Math.floor(closestSlide / props.slidesToScroll)
        if (newPage !== currentPage.value && newPage < totalPages.value) {
            currentPage.value = newPage
            emit('page-change', newPage)
        }
    }
}

const handleScroll = () => {
    if (scrollTimeout) clearTimeout(scrollTimeout)
    scrollTimeout = setTimeout(updateSlidePosition, 50)
}

const goToSlide = (slideIndex) => {
    if (!container.value || !slideElements.value[slideIndex]) return

    const slideWidth = slideElements.value[0]?.offsetWidth || 0
    const gap = currentGap.value
    const leftPadding = parseFloat(getComputedStyle(container.value.querySelector('.carousel-wrapper')).paddingLeft) || 0

    const targetPosition = (slideIndex * (slideWidth + gap)) - leftPadding + leftPadding

    container.value.scrollTo({
        left: targetPosition,
        behavior: 'smooth'
    })

    currentSlide.value = slideIndex
    pauseAutoplay()
    setTimeout(resumeAutoplay, 3000)
}

const goToPage = (pageIndex) => {
    if (pageIndex < 0 || pageIndex >= totalPages.value) return

    const targetSlideIndex = Math.min(pageIndex * props.slidesToScroll, totalSlides.value - Math.floor(slidesVisible.value))

    goToSlide(targetSlideIndex)
    currentPage.value = pageIndex
}

const goToNext = () => {
    const nextPage = currentPage.value + 1
    if (nextPage < totalPages.value) {
        goToPage(nextPage)
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
            goToPage(0)
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
    goToPage,
    startAutoplay,
    stopAutoplay,
    currentSlide: readonly(currentSlide),
    currentPage: readonly(currentPage),
    totalSlides: readonly(totalSlides),
    totalPages: readonly(totalPages)
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
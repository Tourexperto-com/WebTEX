<template>
    <div class="relative w-full" ref="carouselWrapper">
        <div ref="container" class="scrollbar-hide overflow-x-auto cursor-grab select-none snap-x snap-mandatory"
            :class="{ 'cursor-grabbing': isDragging }" @scroll="handleScroll" @mousedown="startDrag" @mousemove="drag"
            @mouseup="endDrag" @touchstart="startDrag" @touchmove="drag" @touchend="endDrag" @mouseenter="pauseAutoplay"
            @mouseleave="resumeAutoplay">

            <div :class="`w-max flex justify-center gap-${gap} pb-2`">
                <slot />
            </div>
        </div>

        <div v-if="showDots && totalSlides > 1" class="flex justify-center gap-2 mt-1">
            <button v-for="(dot, index) in totalSlides" :key="index" @click="goToSlide(index)"
                class="w-3 h-3 rounded-full transition-colors duration-300"
                :class="currentSlide === index ? 'bg-primary' : 'bg-gray-mid hover:bg-gray-dark'"
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
    gap: { type: String, default: '2' }
})

const emit = defineEmits(['slide-change'])

const container = ref(null)
const carouselWrapper = ref(null)
const isDragging = ref(false)
const currentSlide = ref(0)
const totalSlides = ref(0)
const isVisible = ref(true)
const isPaused = ref(false)

let startX = 0
let scrollStart = 0
let autoplayTimer = null
let intersectionObserver = null
let scrollTimeout = null

const updateSlidePosition = () => {
    if (!container.value) return

    const slides = container.value.querySelector('.w-max')?.children
    if (!slides || slides.length === 0) return

    const containerScrollLeft = container.value.scrollLeft
    let closestSlide = 0
    let minDistance = Infinity

    for (let i = 0; i < slides.length; i++) {
        const slide = slides[i]
        const slideLeft = slide.offsetLeft
        const distance = Math.abs(slideLeft - containerScrollLeft)

        if (distance < minDistance) {
            minDistance = distance
            closestSlide = i
        }
    }

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
    if (!container.value) return

    const slides = container.value.querySelector('.w-max')?.children
    if (!slides || slideIndex >= slides.length || slideIndex < 0) return

    const targetSlide = slides[slideIndex]
    container.value.scrollTo({
        left: targetSlide.offsetLeft,
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
            stopAutoplay()
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

const calculateTotalSlides = () => {
    if (!container.value) return

    const slides = container.value.querySelector('.w-max')?.children
    if (!slides || slides.length === 0) return

    const containerWidth = container.value.clientWidth
    const scrollWidth = container.value.scrollWidth
    const maxScroll = scrollWidth - containerWidth

    let validSlides = 0

    for (let i = 0; i < slides.length; i++) {
        const slide = slides[i]
        const slideLeft = slide.offsetLeft

        if (slideLeft <= maxScroll + 10) {
            validSlides++
        }
    }

    totalSlides.value = validSlides
}

onMounted(() => {
    nextTick(() => {
        calculateTotalSlides()
        updateSlidePosition()
        setupIntersectionObserver()

        if (props.autoPlay) {
            startAutoplay()
        }
    })
})

onUnmounted(() => {
    if (scrollTimeout) clearTimeout(scrollTimeout)
    if (intersectionObserver) intersectionObserver.disconnect()
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

:slotted(*) {
    scroll-snap-align: start;
    flex-shrink: 0;
}
</style>
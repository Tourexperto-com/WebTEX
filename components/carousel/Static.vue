<template>
    <div class="relative w-full">
        <button v-if="showLeftArrow" @click="scrollLeft"
            class="w-12 h-12 hidden lg:flex justify-center items-center absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-white shadow-md rounded-full"
            :disabled="isAtStart" aria-label="Anterior">
            <Icon name="material-symbols:chevron-left-rounded" size="3rem" class="text-primary" />
        </button>

        <div ref="container" class="scrollbar-hide overflow-x-auto cursor-grab select-none"
            :class="{ 'cursor-grabbing': isDragging }" @scroll="updateArrows" @mousedown="startDrag" @mousemove="drag"
            @mouseup="endDrag" @mouseleave="endDrag" @touchstart="startDrag" @touchmove="drag" @touchend="endDrag">
            <div class="flex gap-2 w-max first-of-type:ml-3 last-of-type:mr-3 pb-3">
                <slot />
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
    scrollAmount: { type: Number, default: 280 }
})

const container = ref(null)
const isAtStart = ref(true)
const isAtEnd = ref(false)
const isDragging = ref(false)

let startX = 0
let scrollStart = 0

const showLeftArrow = computed(() => !isAtStart.value)
const showRightArrow = computed(() => !isAtEnd.value)

const updateArrows = () => {
    if (!container.value) return

    const { scrollLeft, scrollWidth, clientWidth } = container.value
    isAtStart.value = scrollLeft <= 5
    isAtEnd.value = scrollLeft >= scrollWidth - clientWidth - 5
}

const scrollLeft = () => {
    container.value?.scrollBy({ left: -props.scrollAmount, behavior: 'smooth' })
}

const scrollRight = () => {
    container.value?.scrollBy({ left: props.scrollAmount, behavior: 'smooth' })
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

onMounted(() => {
    updateArrows()

    const observer = new ResizeObserver(updateArrows)
    observer.observe(container.value)

    onUnmounted(() => observer.disconnect())
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
</style>
<template>
    <NuxtLink v-if="to" :to="to"
        class="bg-primary rounded-full text-light text-sm lg:text-base font-bold py-4 px-12">
        <slot />
    </NuxtLink>
    <button v-else type="button"
        class="bg-primary rounded-full text-light text-sm lg:text-base font-bold py-4 px-12">
        <slot />
    </button>
</template>

<script>
export default {
    props: {
        to: {
            type: [String, Object],
            default: null
        }
    }
}
</script>
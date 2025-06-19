<template>
    <DefaultSection class="md:flex-row md:items-stretch md:!gap-2 px-4 md:px-0">
        <ContactoExperto class="w-full md:w-1/2" @open-popup="handleOpenPopup" />
        <NewsletterSuscribirse class="w-full md:w-1/2" />
    </DefaultSection>
</template>

<script setup>
const emit = defineEmits(['open-popup'])

const handleOpenPopup = () => {
    emit('open-popup')
}
</script>
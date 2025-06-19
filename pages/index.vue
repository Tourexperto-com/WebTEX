<template>
    <DefaultMain>
        <HomeHero />
        <HomeIncluido class="md:hidden" />
        <HomeMasVendidos />
        <HomeOpinionTripadvisor />
        <HomeOfertas />
        <HomeVueloIncluido />
        <VentajaBanner />
        <HomeCategorias />
        <HomeReviews />
        <PrensaCarousel />
        <ContactoExpertoNewsletter @open-popup="showContactPopup = true" />
        <HomeOperadores />
        <BlogExplorar />

        <div v-if="showContactPopup"
            class="flex items-start justify-center fixed inset-0 z-50 bg-black bg-opacity-50 overflow-y-auto p-5"
            @click.self="closeContactPopup">
            <PopupContacto :producto="currentProduct" :preload-product-info="false" @close="closeContactPopup"
                @submit="handleFormSubmit" />
        </div>
    </DefaultMain>
</template>

<script setup>
const showContactPopup = ref(false)

const currentProduct = ref(null)

const closeContactPopup = () => {
    showContactPopup.value = false
    currentProduct.value = null
    if (process.client) {
        document.body.style.overflow = 'auto'
    }
}

const handleFormSubmit = async (formData) => {
    console.log('Formulario enviado:', formData)

    try {
        // Logica Back
        closeContactPopup()

        // Mostrar mensaje de éxito

    } catch (error) {
        console.error('Error al enviar consulta:', error)
    }
}

watch(showContactPopup, (newValue) => {
    if (process.client) {
        if (newValue) {
            document.body.style.overflow = 'hidden'
        } else {
            document.body.style.overflow = 'auto'
        }
    }
})

onUnmounted(() => {
    if (process.client) {
        document.body.style.overflow = 'auto'
    }
})
</script>
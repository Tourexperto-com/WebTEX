<template>
    <div
        class="flex flex-col lg:items-center gap-4 bg-secondary lg:bg-violet-dark rounded-[18px] lg:rounded-[36px] p-6 text-center text-light">
        <div class="lg:w-full lg:flex lg:items-center lg:gap-4">
            <NuxtImg src="/images/newsletter/suscribirse.png" alt="" class="w-20 h-20 hidden lg:block" />
            <div class="lg:max-w-56 flex flex-col lg:items-start gap-2">
                <HeadingH2 class="lg:w-full lg:text-base lg:text-left">
                    Ahorrá <span class="text-primary lg:text-light">hasta un 50%</span> en nuestros tours
                </HeadingH2>
                <p class="text-sm font-medium lg:text-start">Suscribete a nuestro newsletter</p>
            </div>
        </div>

        <form @submit.prevent="handleSubmit" class="lg:w-full flex flex-col items-center gap-2">
            <FormEmailIconField id="newsletter-email" v-model="form.newsletterEmail" :error="errors.newsletterEmail"
                placeholder="Ingresa aquí tu email" label="Ingresa aquí tu email" icon="material-symbols:mail-outline"
                :show-button="true" button-text="Suscribirme"
                :submit-on-enter="true" @blur="validateEmail" @button-click="handleSubmit" />

            <ButtonPrimary type="submit" class="w-max lg:hidden">
                Suscribirme
            </ButtonPrimary>
        </form>

        <p class="lg:w-full lg:max-w-56 text-[10px] lg:text-xs font-medium lg:-mt-2">
            Al subscribirme acepto las
            <NuxtLink to="#" class="underline lg:no-underline lg:text-primary">
                políticas de privacidad de Tour Experto.
            </NuxtLink>
        </p>
    </div>
</template>

<script setup>
const form = reactive({ newsletterEmail: '' })
const errors = reactive({ newsletterEmail: null })

const validateEmail = () => {
    if (!form.newsletterEmail.trim()) {
        errors.newsletterEmail = 'El email es requerido'
        return false
    }
    const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.newsletterEmail)
    errors.newsletterEmail = !isValid ? 'Email inválido' : null
    return isValid
}

const handleSubmit = async () => {
    if (!validateEmail()) return

    try {
        console.log('Enviando newsletter:', form.newsletterEmail)
        form.newsletterEmail = ''
        errors.newsletterEmail = null


    } catch (error) {
        console.error('Error enviando newsletter:', error)
    }
}
</script>
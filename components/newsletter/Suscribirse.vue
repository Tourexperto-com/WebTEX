<template>
    <div
        class="flex flex-col md:items-center xxl:items-start gap-4 bg-secondary md:bg-violet-dark rounded-[18px] md:rounded-[36px] p-6 xxl:py-10 xxl:px-12 text-center text-light">
        <div class="md:w-full md:flex md:items-center md:gap-4">
            <NuxtImg src="/images/newsletter/suscribirse.png" alt="" class="w-20 h-20 hidden md:block" />
            <div class="md:max-w-56 flex flex-col lg:items-start gap-2">
                <HeadingH2 class="md:w-full md:text-base lg:text-xl md:text-left">
                    Ahorrá <span class="text-primary md:text-light">hasta un 50%</span> en nuestros tours
                </HeadingH2>
                <p class="text-sm font-medium md:text-start">Suscribete a nuestro newsletter</p>
            </div>
        </div>

        <form @submit.prevent="handleSubmit" class="md:w-full xxl:max-w-[26.25rem] flex flex-col items-center gap-2">
            <FormEmailIconField id="newsletter-email" v-model="form.newsletterEmail" :error="errors.newsletterEmail"
                placeholder="Ingresa aquí tu email" label="Ingresa aquí tu email" icon="material-symbols:mail-outline"
                :show-button="true" button-text="Suscribirme"
                :submit-on-enter="true" @blur="validateEmail" @button-click="handleSubmit" />

            <ButtonPrimary type="submit" class="w-max md:hidden">
                Suscribirme
            </ButtonPrimary>
        </form>

        <p class="md:w-full md:max-w-56 lg:max-w-full xxl:max-w-[26.25rem] text-[10px] md:text-xs font-medium md:-mt-2">
            Al subscribirme acepto las
            <NuxtLink to="#" class="underline md:no-underline md:text-primary">
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
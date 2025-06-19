<template>
    <div
        class="flex flex-col md:justify-between items-center xl:items-start gap-4 bg-secondary md:bg-violet-dark rounded-[18px] md:rounded-[36px] p-6 xxl:py-10 xxl:px-12 text-center text-light">
        <div class="md:w-full md:flex md:items-center md:gap-4">
            <NuxtImg src="/images/newsletter/suscribirse.png" alt="" class="w-20 h-20 hidden md:block" />
            <div class="md:max-w-56 flex flex-col lg:items-start gap-2">
                <HeadingH2 class="md:w-full md:text-base lg:text-xl md:text-left">
                    Ahorrá <span class="text-primary md:text-light">hasta un 50%</span> en nuestros tours
                </HeadingH2>
                <p class="text-sm font-medium md:text-start">Suscribete a nuestro newsletter</p>
            </div>
        </div>

        <form @submit.prevent="handleSubmit"
            class="w-full max-w-sm md:max-w-full xl:max-w-[26.25rem] flex flex-col items-center gap-2">
            <div class="hidden md:block w-full relative">
                <Icon name="material-symbols:mail-outline"
                    class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-5 h-5 z-10" />
                <label for="newsletter-email" class="sr-only">Ingresa aquí tu email</label>
                <input id="newsletter-email" type="email" v-model="form.newsletterEmail"
                    class="w-full h-12 bg-light rounded-full text-gray-dark font-semibold text-sm placeholder:gray-dark placeholder:text-xs placeholder:font-semibold focus:outline-none focus:none p-3 pl-10 pr-32"
                    placeholder="Ingresa aquí tu email" @blur="validateEmail" @keydown.enter="handleSubmit"
                    :class="{ 'border-error focus:border-error': errors.newsletterEmail }" />
                <ButtonPrimary @click="handleSubmit" type="button"
                    class="absolute right-0.5 top-1/2 !text-sm transform -translate-y-1/2 !py-3 px-6">
                    Suscribirme
                </ButtonPrimary>
            </div>

            <div class="md:hidden w-full flex flex-col gap-2">
                <div class="relative">
                    <Icon name="material-symbols:mail-outline"
                        class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-5 h-5" />
                    <label for="newsletter-email-mobile" class="sr-only">Ingresa aquí tu email</label>
                    <input id="newsletter-email-mobile" type="email" v-model="form.newsletterEmail"
                        class="w-full bg-light text-gray-dark font-semibold text-xs placeholder:gray-dark placeholder:text-xs placeholder:font-semibold rounded-full py-3 pl-9 pr-4 focus:outline-none focus:border-transparent border-2 border-transparent focus:border-primary"
                        placeholder="Ingresa aquí tu email" @blur="validateEmail"
                        :class="{ 'border-error focus:border-error': errors.newsletterEmail }" />
                </div>
            </div>

            <ButtonPrimary type="submit" class="w-max md:hidden">
                Suscribirme
            </ButtonPrimary>

            <div class="md:w-full min-h-4">
                <div v-if="errors.newsletterEmail" class="w-full flex items-center gap-1">
                    <Icon name="material-symbols:error-circle-rounded-outline-sharp" class="text-light" />
                    <p class="text-light text-xs">
                        {{ errors.newsletterEmail }}
                    </p>
                </div>
            </div>
        </form>

        <p class="md:w-full md:max-w-56 lg:max-w-full xl:max-w-[26.25rem] text-[10px] md:text-xs font-medium md:-mt-2">
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

        // Back
        form.newsletterEmail = ''
        errors.newsletterEmail = null


    } catch (error) {
        console.error('Error enviando newsletter:', error)
        errors.newsletterEmail = 'Error al suscribirse. Inténtalo nuevamente.'
    }
}
</script>
<template>
    <div class="flex flex-col gap-4 bg-secondary rounded-[18px] p-6 text-center text-light">
        <div class="flex flex-col gap-2">
            <HeadingH2>
                Ahorrá <span class="text-primary">hasta un 50%</span> en nuestros tours
            </HeadingH2>
            <p class="text-sm font-medium">Suscribete a nuestro newsletter</p>
        </div>

        <form @submit.prevent="handleSubmit" class="flex flex-col items-center gap-2">
            <FormEmailIconField id="newsletter-email" v-model="form.newsletterEmail" :error="errors.newsletterEmail"
                placeholder="Ingresa aquí tu email" label="Ingresa aquí tu email" icon="material-symbols:mail-outline" @blur="validateEmail" />
            <ButtonPrimary type="submit" class="w-max">Suscribirme</ButtonPrimary>
        </form>

        <p class="text-[10px] font-medium">
            Al subscribirme acepto las
            <NuxtLink to="#" class="underline">políticas de privacidad de Tour Experto.</NuxtLink>
        </p>
    </div>
</template>

<script setup>
const form = reactive({ newsletterEmail: '' })
const errors = reactive({ newsletterEmail: null })

const validateEmail = () => {
    if (!form.newsletterEmail.trim()) {
        errors.newsletterEmail = 'El email es requerido'
        return
    }
    const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.newsletterEmail)
    errors.newsletterEmail = !isValid ? 'Email inválido' : null
}

const handleSubmit = async () => {
    validateEmail()
    if (errors.newsletterEmail) return

    try {
        console.log('Enviando newsletter:', form.newsletterEmail)
        form.newsletterEmail = ''
    } catch (error) {
        console.error('Error:', error)
    }
}
</script>
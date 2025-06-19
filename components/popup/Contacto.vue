<template>
    <div v-if="!showSuccessModal"
        class="w-full max-w-72 md:max-w-[45.5rem] lg:max-w-[48.5rem] rounded-[18px] md:rounded-[36px] mx-auto">
        <div
            class="flex flex-col md:flex-row items-center gap-3 md:gap-6 relative bg-gradient-to-r from-secondary to-violet-light rounded-t-[18px] md:rounded-t-[36px] p-4 md:p-6 pb-8 md:pb-16">
            <button @click="$emit('close')"
                class="w-6 h-6 flex justify-center items-center absolute top-4 right-4 bg-light rounded-full hover:bg-gray-100 transition-colors">
                <Icon name="material-symbols:close" class="text-primary" />
            </button>
            <NuxtImg src="/images/contacto/Expertos.png" alt="" class="h-12 md:h-28" />
            <div class="flex flex-col items-center md:items-start text-center md:text-start gap-2">
                <p class="text-light font-bold text-sm md:text-xl">
                    Déjanos tu consulta
                    <span v-if="producto">sobre {{ producto.nombre }}</span>
                </p>
                <p class="text-xs md:text-sm font-semibold text-light">
                    Ponte en contacto con nosotros sobre cualquiera de los tours. Nuestros expertos se comunicarán a la
                    brevedad.
                </p>
            </div>
        </div>

        <form @submit.prevent="submitForm"
            class="relative z-[1] flex flex-col gap-2 md:gap-4 bg-light rounded-[18px] md:rounded-[36px] p-4 md:p-5 -mt-4 md:-mt-10">
            <FormFieldsContainer>
                <FormTextIconField class="md:w-1/2" id="nombre" v-model="formData.nombre" :error="errors.nombre"
                    label="Nombre" :show-label="true" placeholder="Ingresa aquí tu nombre"
                    icon="material-symbols:person-outline" autocomplete="name" :required="true" tabindex="1"
                    @blur="validateNombre" />

                <FormEmailIconField class="md:w-1/2" id="email" v-model="formData.email" :error="errors.email"
                    label="Correo electrónico" :show-label="true" placeholder="Ingresa aquí tu correo"
                    icon="material-symbols:mail-outline" type="email" tabindex="2" @blur="validateEmail" />
            </FormFieldsContainer>

            <FormFieldsContainer>
                <FormSelectIconField class="md:w-1/2" id="pais" v-model="formData.pais" :error="errors.pais"
                    label="Selecciona tu país" :show-label="true" placeholder="Selecciona tu país"
                    icon="material-symbols:public" :options="paisesOrdenados" :required="true" tabindex="3"
                    @blur="validatePais" />

                <div class="flex flex-col gap-1 md:gap-2">
                    <FormLabel for="numero">Número de Whatsapp (opcional)</FormLabel>
                    <div class="flex gap-[0.375rem]">
                        <FormTextIconField id="prefijo" v-model="formData.prefijo" label="Prefijo" placeholder="Prefijo"
                            personalizedIcon="/images/icons/WhatsApp.svg" class="w-[5.125rem] md:w-[6.375rem]"
                            :hide-error="true" tabindex="4" @blur="validatePhone" />
                        <FormNumberIconField id="area" placeholder="Área" v-model="formData.area"
                            class="w-[3.25rem] md:w-16" :hide-error="true" tabindex="5" @blur="validatePhone" />
                        <FormNumberIconField id="numero" v-model="formData.numero" placeholder="Número"
                            autocomplete="tel-local" class="w-[6.8rem] md:w-40" :hide-error="true"
                            :max="999999999999999" tabindex="6" @blur="validatePhone" />
                    </div>

                    <div class="min-h-4">
                        <FormError v-if="errors.whatsapp">
                            {{ errors.whatsapp }}
                        </FormError>
                    </div>
                </div>
            </FormFieldsContainer>

            <FormFieldsContainer>
                <div class="md:w-1/2 flex flex-col gap-1 md:gap-2">
                    <p class="text-sm md:text-base text-secondary font-bold">Cantidad de pasajeros</p>
                    <div class="flex flex-col md:flex-row gap-3 md:gap-8">
                        <FormCounterField id="adultos" v-model="formData.adultos" :error="errors.adultos"
                            suffix="Mayores" :min="1" tabindex="7" />

                        <FormCounterField id="menores" v-model="formData.menores" :error="errors.menores" label=""
                            suffix="Menores de 12 años" :min="0" tabindex="8" />
                    </div>
                </div>

                <div class="md:w-1/2 flex flex-col gap-1 md:gap-2">
                    <p class="text-sm md:text-base text-secondary font-bold">¿Necesitas ticket aéreo?</p>

                    <FormRadioField id="ticketAereo" v-model="formData.ticketAereo" :error="errors.ticketAereo"
                        label="Ticket aereo" :options="[
                            { label: 'Sí', value: true },
                            { label: 'No', value: false }
                        ]" tabindex="9" @blur="validateTicketAereo" />
                </div>
            </FormFieldsContainer>

            <FormTextareaField id="pregunta" v-model="formData.pregunta" :error="errors.pregunta" label="Tu pregunta"
                :show-label="true" placeholder="Escribe tu pregunta aquí..." :rows="3" :maxlength="500"
                min-height="80px" tabindex="10" @blur="validatePregunta" />

            <div class="flex flex-col md:flex-row-reverse md:justify-start gap-2 md:gap-4">
                <ButtonPrimary type="submit" :disabled="isSubmitting" tabindex="11">
                    {{ isSubmitting ? 'ENVIANDO...' : 'ENVIAR' }}
                </ButtonPrimary>
                <ButtonPrimary type="button" @click="$emit('close')" tabindex="12"
                    class="!bg-light !text-secondary border-2 border-secondary !py-[0.875rem]">
                    CERRAR
                </ButtonPrimary>
            </div>
        </form>
    </div>

    <div v-if="showSuccessModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-5">
        <div
            class="w-full max-w-72 md:max-w-[33.75rem] flex flex-col items-center gap-3 text-center relative bg-gradient-to-r from-secondary to-violet-light rounded-[18px] md:rounded-[36px] text-light p-4 md:p-6">
            <button @click="closeSuccessModal"
                class="w-6 h-6 flex items-center justify-center absolute top-4 right-4 bg-light rounded-full">
                <Icon name="material-symbols:close" class="w-5 h-5 text-primary" />
            </button>

            <NuxtImg src="/images/icons/Check.svg" alt="Check" />

            <div class="flex flex-col gap-2">
                <p class="font-bold md:text-xl">
                    Gracias por contactarte con nosotros
                </p>
                <p class="text-xs md:text-sm font-semibold">
                    Nuestro equipo de Expertos se pondrá en contacto en breve.
                </p>
            </div>
        </div>
    </div>
</template>

<script setup>
const props = defineProps({
    producto: {
        type: Object,
        default: null
    },
    preloadProductInfo: {
        type: Boolean,
        default: true
    }
})

const emit = defineEmits(['close', 'submit'])

const formData = reactive({
    nombre: '',
    email: '',
    prefijo: '',
    area: '',
    numero: '',
    pais: '',
    adultos: 1,
    menores: 0,
    ticketAereo: null,
    pregunta: ''
})

const errors = reactive({
    nombre: null,
    email: null,
    whatsapp: null,
    pais: null,
    adultos: null,
    menores: null,
    ticketAereo: null,
    pregunta: null
})

const isSubmitting = ref(false)
const showSuccessModal = ref(false)

const prefijosPaises = {
    'Argentina': '+54',
    'Chile': '+56',
    'Colombia': '+57',
    'España': '+34',
    'Estados Unidos': '+1',
    'México': '+52',
    'Perú': '+51',
    'Brasil': '+55',
    'Uruguay': '+598',
    'Paraguay': '+595',
    'Bolivia': '+591',
    'Ecuador': '+593',
    'Venezuela': '+58',
    'Costa Rica': '+506',
    'Panamá': '+507',
    'Guatemala': '+502',
    'Honduras': '+504',
    'Nicaragua': '+505',
    'El Salvador': '+503',
    'República Dominicana': '+1',
    'Puerto Rico': '+1',
    'Cuba': '+53'
}

const paises = [
    'Argentina', 'Colombia', 'España', 'Estados Unidos', 'México',
    'Perú', 'Brasil', 'Uruguay', 'Paraguay', 'Bolivia', 'Ecuador',
    'Venezuela', 'Costa Rica', 'Panamá', 'Guatemala', 'Honduras',
    'Nicaragua', 'El Salvador', 'República Dominicana', 'Puerto Rico',
    'Cuba', 'Otro', 'Chile', 'Chipre'
]

const paisesOrdenados = computed(() => {
    const paisesSinOtro = paises.filter(pais => pais !== 'Otro').sort()
    return [...paisesSinOtro, 'Otro']
})

watch(() => formData.pais, (nuevoPais) => {
    if (nuevoPais && prefijosPaises[nuevoPais]) {
        formData.prefijo = prefijosPaises[nuevoPais]
    } else {
        formData.prefijo = ''
    }
})

const validateNombre = () => {
    if (!formData.nombre.trim()) {
        errors.nombre = 'Ingresa tu nombre'
        return false
    }

    const lettersOnlyRegex = /^[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ\s]+$/
    if (!lettersOnlyRegex.test(formData.nombre)) {
        errors.nombre = 'El nombre solo puede contener letras'
        return false
    }

    const soloLetras = formData.nombre.replace(/\s/g, '')

    if (soloLetras.length < 2) {
        errors.nombre = 'El nombre debe tener al menos 2 letras'
        return false
    }

    if (soloLetras.length > 25) {
        errors.nombre = 'El nombre no puede tener más de 25 letras'
        return false
    }

    errors.nombre = null
    return true
}

const validateEmail = () => {
    if (!formData.email.trim()) {
        errors.email = 'Ingresa tu correo electrónico'
        return false
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(formData.email)) {
        errors.email = 'Ingresa un correo electrónico válido'
        return false
    }
    errors.email = null
    return true
}

const validatePais = () => {
    if (!formData.pais) {
        errors.pais = 'Selecciona tu país de residencia'
        return false
    }
    errors.pais = null
    return true
}

const validatePhone = () => {
    errors.whatsapp = null

    if (!formData.numero) {
        return true
    }

    if (!formData.prefijo || !formData.prefijo.toString().trim()) {
        errors.whatsapp = 'El prefijo es obligatorio'
        return false
    }

    if (!formData.area || !formData.area.toString().trim()) {
        errors.whatsapp = 'El código de área es obligatorio'
        return false
    }

    if (formData.numero.toString().length < 6) {
        errors.whatsapp = 'El número debe tener al menos 6 dígitos'
        return false
    }

    if (formData.numero.toString().length > 15) {
        errors.whatsapp = 'El número no puede tener más de 15 dígitos'
        return false
    }

    return true
}

const validateTicketAereo = () => {
    if (formData.ticketAereo === null) {
        errors.ticketAereo = 'Selecciona una opción'
        return false
    }
    errors.ticketAereo = null
    return true
}

const validatePregunta = () => {
    errors.pregunta = null
    return true
}

const validateForm = () => {
    const isNombreValid = validateNombre()
    const isEmailValid = validateEmail()
    const isPaisValid = validatePais()
    const isPhoneValid = validatePhone()
    const isTicketValid = validateTicketAereo()

    let isAdultosValid = true
    if (formData.adultos < 1) {
        errors.adultos = 'Debe haber al menos 1 adulto'
        isAdultosValid = false
    } else {
        errors.adultos = null
    }

    return isNombreValid && isEmailValid && isPaisValid && isPhoneValid && isTicketValid && isAdultosValid
}

const resetForm = () => {
    Object.keys(formData).forEach(key => {
        if (key === 'adultos') formData[key] = 1
        else if (key === 'menores') formData[key] = 0
        else if (key === 'ticketAereo') formData[key] = null
        else formData[key] = ''
    })
    Object.keys(errors).forEach(key => errors[key] = null)
}

const closeSuccessModal = () => {
    showSuccessModal.value = false

    const submitData = {
        ...formData,
        telefono: formData.numero ? `${formData.prefijo} ${formData.area} ${formData.numero}` : null,
        producto: props.producto ? {
            id: props.producto.id,
            nombre: props.producto.nombre,
            url: props.producto.url
        } : null,
        fecha: new Date().toISOString()
    }

    emit('submit', submitData)

    resetForm()
    emit('close')
}

const submitForm = async () => {
    if (!validateForm()) {
        return
    }

    isSubmitting.value = true

    try {
        showSuccessModal.value = true
    } catch (error) {
        console.error(error)
    } finally {
        isSubmitting.value = false
    }
}

watch(() => props.producto, (newProducto) => {
    if (newProducto && props.preloadProductInfo && !formData.pregunta) {
        formData.pregunta = `Hola, me interesa conocer más sobre "${newProducto.nombre}". ¿Podrían brindarme más información?`
    }
}, { immediate: true })
</script>
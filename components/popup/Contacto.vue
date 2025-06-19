<template>
    <div class="max-w-72 rounded-[18px] mx-auto">
        <div
            class="flex flex-col items-center gap-3 relative bg-gradient-to-r from-secondary to-violet-light rounded-t-[18px] p-4 pb-6">
            <button @click="$emit('close')"
                class="w-6 h-6 flex justify-center items-center absolute top-4 right-4 bg-light rounded-full hover:bg-gray-100 transition-colors">
                <Icon name="material-symbols:close" class="text-primary" />
            </button>
            <NuxtImg src="/images/contacto/Expertos.png" alt="" class="h-12" />
            <div class="flex flex-col items-center text-center gap-2">
                <p class="text-light font-bold text-sm">
                    Déjanos tu consulta
                    <span v-if="producto">sobre {{ producto.nombre }}</span>
                </p>
                <p class="text-xs font-semibold text-light">
                    Ponte en contacto con nosotros sobre cualquiera de los tours. Nuestros expertos se comunicarán a la
                    brevedad.
                </p>
            </div>
        </div>
        <!-- TODO: Hacer responsive -->

        <form @submit.prevent="submitForm" class="relative z-[1] flex flex-col gap-2 bg-light rounded-[18px] p-4 -mt-3">
            <FormTextIconField id="nombre" v-model="formData.nombre" :error="errors.nombre" label="Nombre completo"
                :show-label="true" placeholder="Ingresa aquí tu nombre" icon="material-symbols:person-outline"
                autocomplete="name" :required="true" />

            <FormEmailIconField id="email" v-model="formData.email" :error="errors.email" label="Correo electrónico"
                :show-label="true" placeholder="Ingresa aquí tu correo" icon="material-symbols:mail-outline"
                type="email" />
            <FormLabel for="numero">Número de Whatsapp (opcional)</FormLabel>
            <div class="flex gap-[0.375rem]">
                <FormNumberIconField id="prefijo" v-model="formData.prefijo" :error="errors.prefijo" label="Prefijo"
                    placeholder="Prefijo" personalizedIcon="/images/icons/WhatsApp.svg" class="!w-[5.125rem]" />
                <FormNumberIconField id="area" placeholder="Área" v-model="formData.area" :error="errors.area"
                    class="!w-[3.25rem]" />
                <FormNumberIconField id="numero" v-model="formData.numero" placeholder="Número" :error="errors.numero"
                    autocomplete="tel-local" class="!w-[6.25rem]" />
            </div>

            <FormSelectIconField id="pais" v-model="formData.pais" :error="errors.pais" label="Selecciona tu país"
                :show-label="true" placeholder="Selecciona tu país" icon="material-symbols:public" :options="paises"
                :required="true" />

            <div class="flex flex-col gap-3">
                <p class="text-sm text-secondary font-bold">Cantidad de pasajeros</p>
                <FormCounterField id="adultos" v-model="formData.adultos" :error="errors.adultos" suffix="Mayores"
                    :min="1" />

                <FormCounterField id="menores" v-model="formData.menores" :error="errors.menores" label=""
                    suffix="Menores de 12 años" :min="0" />
            </div>
            <div>
                <p class="text-sm text-secondary font-bold">¿Necesitas ticket aéreo?</p>
            </div>
            <FormRadioField id="ticketAereo" v-model="formData.ticketAereo" :error="errors.ticketAereo" label="Ticket aereo"
                :options="[
                    { label: 'Sí', value: true },
                    { label: 'No', value: false }
                ]" />

            <FormTextareaField id="pregunta" v-model="formData.pregunta" :error="errors.pregunta" label="Tu pregunta" :show-label="true"
                placeholder="Escribe tu pregunta aquí..." :rows="3" :maxlength="500" min-height="80px" />

            <div class="flex flex-col gap-2 pt-4 pb-2">
                <button type="submit" :disabled="isSubmitting"
                    class="w-full py-3 px-6 bg-primary text-white font-semibold text-sm rounded-full hover:bg-primary/90 transition-colors disabled:opacity-50">
                    {{ isSubmitting ? 'ENVIANDO...' : 'ENVIAR' }}
                </button>

                <button type="button" @click="$emit('close')"
                    class="w-full py-3 px-6 bg-transparent border-2 border-gray-300 text-gray-600 font-semibold text-sm rounded-full hover:bg-gray-50 transition-colors">
                    CERRAR
                </button>
            </div>
        </form>
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
    prefijo: '+54',
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
    prefijo: null,
    area: null,
    numero: null,
    pais: null,
    adultos: null,
    menores: null,
    ticketAereo: null,
    pregunta: null
})

const isSubmitting = ref(false)

const prefijosPaises = [
    { label: '+54 (Argentina)', value: '+54' },
    { label: '+1 (Estados Unidos)', value: '+1' },
    { label: '+34 (España)', value: '+34' },
    { label: '+52 (México)', value: '+52' },
    { label: '+56 (Chile)', value: '+56' },
    { label: '+57 (Colombia)', value: '+57' },
    { label: '+58 (Venezuela)', value: '+58' },
    { label: '+51 (Perú)', value: '+51' },
    { label: '+55 (Brasil)', value: '+55' }
]

const paises = [
    'Argentina', 'Chile', 'Colombia', 'España', 'Estados Unidos', 'México',
    'Perú', 'Brasil', 'Uruguay', 'Paraguay', 'Bolivia', 'Ecuador',
    'Venezuela', 'Costa Rica', 'Panamá', 'Guatemala', 'Honduras',
    'Nicaragua', 'El Salvador', 'República Dominicana', 'Puerto Rico',
    'Cuba', 'Otro'
]

const validateForm = () => {
    Object.keys(errors).forEach(key => {
        errors[key] = null
    })

    let isValid = true

    if (!formData.nombre.trim()) {
        errors.nombre = 'Ingresa tu nombre'
        isValid = false
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!formData.email.trim()) {
        errors.email = 'Ingresa tu correo electrónico'
        isValid = false
    } else if (!emailRegex.test(formData.email)) {
        errors.email = 'Ingresa un correo electrónico válido'
        isValid = false
    }

    if (!formData.pais) {
        errors.pais = 'Selecciona tu país de residencia'
        isValid = false
    }

    if (formData.numero && formData.numero.toString().length < 6) {
        errors.numero = 'Ingresa un número válido'
        isValid = false
    }

    if (formData.numero && !formData.area.trim()) {
        errors.area = 'Ingresa el código de área'
        isValid = false
    }

    if (formData.adultos < 1) {
        errors.adultos = 'Debe haber al menos 1 adulto'
        isValid = false
    }

    if (formData.ticketAereo === null) {
        errors.ticketAereo = 'Selecciona una opción'
        isValid = false
    }

    return isValid
}

const submitForm = async () => {
    if (!validateForm()) return

    isSubmitting.value = true

    try {
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

    } catch (error) {
        console.error('Error al enviar formulario:', error)
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
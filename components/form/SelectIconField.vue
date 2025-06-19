<template>
    <div class="w-full flex flex-col gap-1 md:gap-2">
        <FormLabel v-if="showLabel && label" :for="id">{{ label }}</FormLabel>

        <div class="relative">
            <Icon :name="icon"
                class="w-4 md:w-5 h-4 md:h-5 absolute left-3 top-1/2 z-10 transform -translate-y-1/2 text-gray-dark" />

            <button :id="id" type="button" @click="toggleDropdown" @blur="handleBlur" @keydown="handleKeydown"
                :disabled="disabled" :class="[
                    'w-full bg-light border border-secondary rounded-[9px] text-gray-dark font-semibold text-xs md:text-sm p-3 focus:outline-none transition-all duration-300 text-left',
                    icon ? 'pl-10 pr-10' : 'pl-3 pr-10',
                    disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer hover:border-gray-400',
                    error ? 'border-error' : ''
                ]" :aria-expanded="isOpen" :aria-haspopup="true" :aria-required="required">
                <span class="text-gray-dark">
                    {{ selectedOption ? getOptionLabel(selectedOption) : placeholder }}
                </span>

                <span class="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                    <svg :class="[
                        'w-5 h-5 shadow-1 rounded-full text-primary transition-transform duration-300',
                        isOpen ? 'rotate-180' : 'rotate-0'
                    ]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                    </svg>
                </span>
            </button>

            <Transition enter-active-class="transition duration-200 ease-out"
                enter-from-class="transform scale-95 opacity-0" enter-to-class="transform scale-100 opacity-100"
                leave-active-class="transition duration-150 ease-in" leave-from-class="transform scale-100 opacity-100"
                leave-to-class="transform scale-95 opacity-0">
                <div v-if="isOpen"
                    class="absolute z-50 w-full mt-1 bg-white border border-gray-300 rounded-[9px] shadow-lg max-h-60 overflow-auto"
                    @click.stop>
                    <button v-for="(option, index) in options" :key="getOptionValue(option)" type="button"
                        @click="selectOption(option)" :disabled="option.disabled" :class="[
                            'w-full text-left text-xs md:text-sm font-semibold transition-colors duration-300 px-4 py-3',
                            option.disabled ? 'text-gray-400 cursor-not-allowed' : 'text-gray-dark hover:bg-violet-light/10',
                            getOptionValue(option) === modelValue ? 'bg-violet-light/10' : '',
                            focusedIndex === index ? 'bg-gray-100' : ''
                        ]">
                        {{ getOptionLabel(option) }}
                    </button>
                </div>
            </Transition>
        </div>

        <div class="w-full min-h-4">
            <FormError v-if="error">
                {{ error }}
            </FormError>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        id: {
            type: String,
            required: true
        },
        error: {
            type: String,
            default: null
        },
        label: {
            type: String,
            default: ''
        },
        showLabel: {
            type: Boolean,
            default: false
        },
        modelValue: {
            type: [String, Number],
            default: ''
        },
        placeholder: {
            type: String,
            default: 'Selecciona una opción'
        },
        icon: {
            type: String,
            required: true
        },
        options: {
            type: Array,
            required: true
        },
        valueKey: {
            type: String,
            default: 'value'
        },
        labelKey: {
            type: String,
            default: 'label'
        },
        required: {
            type: Boolean,
            default: false
        },
        disabled: {
            type: Boolean,
            default: false
        }
    },
    emits: ['update:modelValue', 'blur', 'change'],
    data() {
        return {
            isOpen: false,
            focusedIndex: -1
        }
    },
    computed: {
        selectedOption() {
            // Encuentra la opción seleccionada basada en el modelValue
            return this.options.find(option =>
                this.getOptionValue(option) === this.modelValue
            )
        }
    },
    mounted() {
        // Cerrar dropdown al hacer click fuera
        document.addEventListener('click', this.handleClickOutside)
    },
    beforeUnmount() {
        document.removeEventListener('click', this.handleClickOutside)
    },
    methods: {
        toggleDropdown() {
            if (this.disabled) return
            this.isOpen = !this.isOpen
            this.focusedIndex = -1
        },

        selectOption(option) {
            if (option.disabled) return

            const value = this.getOptionValue(option)
            this.isOpen = false
            this.focusedIndex = -1

            // Emitir eventos igual que el select original
            this.$emit('update:modelValue', value)
            this.$emit('change', value)
        },

        handleBlur(event) {
            // Cerrar dropdown solo si el foco sale del componente completamente
            setTimeout(() => {
                if (!this.$el.contains(document.activeElement)) {
                    this.isOpen = false
                    this.focusedIndex = -1
                    this.$emit('blur', event)
                }
            }, 100)
        },

        handleKeydown(event) {
            // Navegación con teclado para accesibilidad
            const availableOptions = this.options.filter(option => !option.disabled)

            switch (event.key) {
                case 'Enter':
                case ' ':
                    event.preventDefault()
                    if (!this.isOpen) {
                        this.isOpen = true
                    } else if (this.focusedIndex >= 0) {
                        this.selectOption(availableOptions[this.focusedIndex])
                    }
                    break

                case 'Escape':
                    this.isOpen = false
                    this.focusedIndex = -1
                    break

                case 'ArrowDown':
                    event.preventDefault()
                    if (!this.isOpen) {
                        this.isOpen = true
                    } else {
                        this.focusedIndex = Math.min(this.focusedIndex + 1, availableOptions.length - 1)
                    }
                    break

                case 'ArrowUp':
                    event.preventDefault()
                    if (this.isOpen) {
                        this.focusedIndex = Math.max(this.focusedIndex - 1, 0)
                    }
                    break
            }
        },

        handleClickOutside(event) {
            if (!this.$el.contains(event.target)) {
                this.isOpen = false
                this.focusedIndex = -1
            }
        },

        getOptionValue(option) {
            return typeof option === 'object' ? option[this.valueKey] : option
        },

        getOptionLabel(option) {
            return typeof option === 'object' ? option[this.labelKey] : option
        }
    }
}
</script>
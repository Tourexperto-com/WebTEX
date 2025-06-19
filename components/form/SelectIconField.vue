<template>
    <div class="flex flex-col gap-1 md:gap-2">
        <FormLabel v-if="showLabel && label" :for="id">{{ label }}</FormLabel>

        <div class="relative">
            <Icon :name="icon"
                class="w-4 md:w-5 h-4 md:h-5 absolute left-3 top-1/2 z-10 transform -translate-y-1/2 text-gray-dark" />

            <input :id="id" ref="searchInput" type="text" v-model="searchQuery" @click="openDropdown"
                @focus="openDropdown" @blur="handleBlur" @keydown="handleKeydown" @input="handleInput"
                :disabled="disabled" :placeholder="placeholder" :readonly="!searchable" :class="[
                    'w-full bg-light border border-secondary rounded-[9px] text-left text-gray-dark font-semibold text-xs placeholder:text-gray-dark placeholder:text-xs md:placeholder:text-sm md:text-sm focus:outline-none transition-all duration-300 p-3',
                    icon ? 'pl-10 pr-10' : 'pl-3 pr-10',
                    disabled ? 'opacity-50 cursor-not-allowed' : searchable ? 'cursor-text' : 'cursor-pointer',
                    error ? 'border-error' : '',
                    !searchable ? 'caret-transparent' : ''
                ]" :aria-expanded="isOpen" :aria-haspopup="true" :aria-required="required" autocomplete="off" />

            <span class="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <svg :class="[
                    'w-5 h-5 shadow-1 rounded-full text-primary transition-transform duration-300',
                    isOpen ? 'rotate-180' : 'rotate-0'
                ]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                </svg>
            </span>

            <Transition enter-active-class="transition duration-200 ease-out"
                enter-from-class="transform scale-95 opacity-0" enter-to-class="transform scale-100 opacity-100"
                leave-active-class="transition duration-150 ease-in" leave-from-class="transform scale-100 opacity-100"
                leave-to-class="transform scale-95 opacity-0">
                <div v-if="isOpen && filteredOptions.length > 0"
                    class="absolute z-50 w-full mt-1 bg-white border border-gray-300 rounded-[9px] shadow-lg max-h-60 overflow-auto"
                    @mousedown.prevent>
                    <button v-for="(option, index) in filteredOptions" :key="getOptionValue(option)" type="button"
                        @click="selectOption(option)" :disabled="option.disabled" :class="[
                            'w-full text-left text-xs md:text-sm font-semibold transition-colors duration-300 px-4 py-3',
                            option.disabled ? 'text-gray-400 cursor-not-allowed' : 'text-gray-dark hover:bg-violet-light/10',
                            getOptionValue(option) === modelValue ? 'bg-violet-light/10' : '',
                            focusedIndex === index ? 'bg-gray-100' : ''
                        ]">
                        {{ getOptionLabel(option) }}
                    </button>
                </div>

                <div v-else-if="isOpen && searchQuery && filteredOptions.length === 0"
                    class="absolute z-50 w-full mt-1 bg-white border border-gray-300 rounded-[9px] shadow-lg px-4 py-3">
                    <p class="text-xs md:text-sm text-gray-dark font-semibold">
                        No se encontraron resultados para "{{ searchQuery }}"
                    </p>
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
        },
        searchable: {
            type: Boolean,
            default: true // Nuevo prop para habilitar/deshabilitar búsqueda
        }
    },
    emits: ['update:modelValue', 'blur', 'change'],
    data() {
        return {
            isOpen: false,
            focusedIndex: -1,
            searchQuery: '' // Query de búsqueda
        }
    },
    computed: {
        selectedOption() {
            return this.options.find(option =>
                this.getOptionValue(option) === this.modelValue
            )
        },

        filteredOptions() {
            if (!this.searchable || !this.searchQuery.trim()) {
                return this.options
            }

            // Filtrar opciones basado en el texto de búsqueda
            const query = this.searchQuery.toLowerCase().trim()
            return this.options.filter(option => {
                const label = this.getOptionLabel(option).toLowerCase()
                return label.includes(query)
            })
        }
    },
    watch: {
        // Actualizar el texto del input cuando cambia el modelValue externamente
        modelValue: {
            handler(newValue) {
                if (newValue && this.selectedOption) {
                    this.searchQuery = this.getOptionLabel(this.selectedOption)
                } else {
                    this.searchQuery = ''
                }
            },
            immediate: true
        }
    },
    mounted() {
        document.addEventListener('click', this.handleClickOutside)
    },
    beforeUnmount() {
        document.removeEventListener('click', this.handleClickOutside)
    },
    methods: {
        openDropdown() {
            if (this.disabled) return
            this.isOpen = true
            this.focusedIndex = -1
        },

        selectOption(option) {
            if (option.disabled) return

            const value = this.getOptionValue(option)
            const label = this.getOptionLabel(option)

            // Actualizar el valor y el texto de búsqueda
            this.searchQuery = label
            this.isOpen = false
            this.focusedIndex = -1

            // Emitir eventos
            this.$emit('update:modelValue', value)
            this.$emit('change', value)
        },

        handleInput() {
            // Al escribir, abrir dropdown y resetear índice de foco
            if (this.searchable) {
                this.isOpen = true
                this.focusedIndex = -1

                // Si está buscando, limpiar la selección actual
                if (this.searchQuery !== this.getOptionLabel(this.selectedOption)) {
                    this.$emit('update:modelValue', '')
                }
            }
        },

        handleBlur(event) {
            setTimeout(() => {
                if (!this.$el.contains(document.activeElement)) {
                    this.isOpen = false
                    this.focusedIndex = -1

                    // Si no hay selección válida, restaurar el texto original o limpiar
                    if (!this.selectedOption || this.searchQuery !== this.getOptionLabel(this.selectedOption)) {
                        if (this.selectedOption) {
                            this.searchQuery = this.getOptionLabel(this.selectedOption)
                        } else {
                            this.searchQuery = ''
                        }
                    }

                    this.$emit('blur', event)
                }
            }, 150)
        },

        handleKeydown(event) {
            const availableOptions = this.filteredOptions.filter(option => !option.disabled)

            switch (event.key) {
                case 'Enter':
                    event.preventDefault()
                    if (this.isOpen && this.focusedIndex >= 0 && availableOptions[this.focusedIndex]) {
                        this.selectOption(availableOptions[this.focusedIndex])
                    } else if (!this.isOpen) {
                        this.openDropdown()
                    }
                    break

                case 'Escape':
                    this.isOpen = false
                    this.focusedIndex = -1
                    this.$refs.searchInput.blur()
                    break

                case 'ArrowDown':
                    event.preventDefault()
                    if (!this.isOpen) {
                        this.openDropdown()
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

                case 'Tab':
                    // Permitir que Tab funcione normalmente, pero cerrar dropdown
                    this.isOpen = false
                    this.focusedIndex = -1
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
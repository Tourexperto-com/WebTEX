<template>
    <div class="w-full flex flex-col gap-1 md:gap-2">
        <FormLabel v-if="showLabel && label">{{ label }}</FormLabel>

        <div class="flex gap-4 flex-wrap">
            <label v-for="option in options" :key="getOptionValue(option)"
                class="flex items-center gap-2 cursor-pointer" :class="{ 'opacity-50': disabled }">
                <div class="relative">
                    <input :id="`${id}-${getOptionValue(option)}`" type="radio" :name="name || id"
                        :value="getOptionValue(option)" :checked="modelValue === getOptionValue(option)"
                        @change="handleChange" :disabled="disabled || option.disabled" class="sr-only" />
                    <div class="w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all duration-200"
                        :class="[
                            modelValue === getOptionValue(option)
                                ? 'border-primary bg-primary'
                                : 'border-gray-400 bg-light hover:border-primary',
                            (disabled || option.disabled) ? 'cursor-not-allowed' : 'cursor-pointer'
                        ]">
                        <div v-if="modelValue === getOptionValue(option)" class="w-2 h-2 rounded-full bg-light"></div>
                    </div>
                </div>
                <span class="text-gray-dark font-semibold text-xs md:text-sm select-none"
                    :class="{ 'cursor-not-allowed': disabled || option.disabled }">
                    {{ getOptionLabel(option) }}
                </span>
            </label>
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
            type: [String, Number, Boolean],
            default: null
        },
        name: {
            type: String,
            default: null
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
    emits: ['update:modelValue', 'change'],
    methods: {
        handleChange(event) {
            const value = event.target.value
            let convertedValue = value
            if (value === 'true') convertedValue = true
            if (value === 'false') convertedValue = false
            if (!isNaN(value) && value !== '') convertedValue = Number(value)

            this.$emit('update:modelValue', convertedValue)
            this.$emit('change', convertedValue)
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
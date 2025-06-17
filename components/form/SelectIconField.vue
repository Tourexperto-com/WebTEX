<template>
    <div class="w-full flex flex-col gap-2">
        <FormLabel v-if="showLabel && label" :for="id">{{ label }}</FormLabel>

        <div class="relative">
            <Icon :name="icon" class="w-5 h-5 absolute left-3 top-1/2 z-10 transform -translate-y-1/2 text-gray-dark" />
            <select :id="id" :value="modelValue"
                class="w-full bg-light border border-secondary rounded-[9px] text-gray-dark font-semibold text-xs placeholder:gray-dark placeholder:text-xs placeholder:font-semibold p-3 focus:outline-none focus:none"
                :class="icon ? 'pl-8' : 'pl-3'" @change="handleChange" @blur="$emit('blur')" :required="required"
                :disabled="disabled">
                <option value="" disabled>{{ placeholder }}</option>
                <option v-for="option in options" :key="getOptionValue(option)" :value="getOptionValue(option)"
                    :disabled="option.disabled">
                    {{ getOptionLabel(option) }}
                </option>
            </select>
        </div>

        <FormError v-if="error">
            {{ error }}
        </FormError>
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
    methods: {
        handleChange(event) {
            const value = event.target.value
            this.$emit('update:modelValue', value)
            this.$emit('change', value)
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
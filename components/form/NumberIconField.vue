<template>
    <div class="w-full flex flex-col gap-2">
        <div class="relative">
            <Icon v-if="icon" :name="icon"
                class="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
            <NuxtImg v-if="personalizedIcon" :src="personalizedIcon" alt="Icon"
                class="w-3 h-3 absolute left-3 top-1/2 transform -translate-y-1/2" />
            <label :for="id" class="sr-only">{{ label }}</label>
            <input :id="id" type="number" :value="modelValue"
                class="w-full bg-light border border-secondary rounded-[9px] text-gray-dark font-semibold text-xs placeholder:gray-dark placeholder:text-xs placeholder:font-semibold p-3 focus:outline-none focus:none"
                :class="icon || personalizedIcon ? 'pl-8' : 'pl-3'" @input="handleInput" :placeholder="placeholder"
                :autocomplete="autocomplete" @blur="$emit('blur')" :required="required" :disabled="disabled" :min="min"
                :max="max" :step="step" />
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
        modelValue: {
            type: [String, Number],
            default: ''
        },
        placeholder: {
            type: String,
            default: ''
        },
        icon: {
            type: String,
            default: null
        },
        personalizedIcon: {
            type: String,
            default: null
        },
        autocomplete: {
            type: String,
            default: 'off'
        },
        required: {
            type: Boolean,
            default: false
        },
        disabled: {
            type: Boolean,
            default: false
        },
        min: {
            type: Number,
            default: null
        },
        max: {
            type: Number,
            default: null
        },
        step: {
            type: Number,
            default: 1
        }
    },
    emits: ['update:modelValue', 'blur'],
    methods: {
        handleInput(event) {
            const value = event.target.value
            const numberValue = value === '' ? '' : Number(value)
            this.$emit('update:modelValue', numberValue)
        }
    }
}
</script>
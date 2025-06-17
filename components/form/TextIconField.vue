<template>
    <div class="w-full flex flex-col gap-1">
        <FormLabel v-if="showLabel" :for="id">{{ label }}</FormLabel>
        <label v-else :for="id" class="sr-only">{{ label }}</label>

        <div class="relative">
            <Icon v-if="icon" :name="icon"
                class="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-dark" />
            <input :id="id" :type="type" :value="modelValue"
                class="w-full bg-light border border-secondary rounded-[9px] text-gray-dark font-semibold text-xs placeholder:gray-dark placeholder:text-xs placeholder:font-semibold p-3 focus:outline-none focus:none"
                :class="icon ? 'pl-8' : 'pl-3'" @input="$emit('update:modelValue', $event.target.value)"
                :placeholder="placeholder" :autocomplete="autocomplete" @blur="$emit('blur')" :required="required"
                :disabled="disabled" />
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
            type: String,
            default: ''
        },
        placeholder: {
            type: String,
            default: ''
        },
        type: {
            type: String,
            default: 'text'
        },
        icon: {
            type: String,
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
        }
    },
    emits: ['update:modelValue', 'blur']
}
</script>
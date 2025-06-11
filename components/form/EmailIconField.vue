<template>
    <div class="w-full flex flex-col gap-2">
        <div class="relative">
            <Icon :name="icon" class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-5 h-5" />
            <label :for="id" class="sr-only">{{ label }}</label>
            <input :id="id" :type="type" :value="modelValue"
                class="w-full bg-light text-gray-dark text-xs placeholder:gray-dark placeholder:text-xs rounded-full py-3 pl-9 pr-4 focus:outline-none focus:border-transparent"
                @input="$emit('update:modelValue', $event.target.value)" :placeholder="placeholder"
                :autocomplete="id" />
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
            type: String,
            default: ''
        },
        placeholder: {
            type: String,
            default: ''
        },
        type: {
            type: String,
            default: 'email'
        },
        icon: {
            type: String,
            required: true
        }
    },
    emits: ['update:modelValue']
}
</script>
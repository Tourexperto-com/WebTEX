<template>
    <div class="w-full flex flex-col gap-2">
        <div v-if="showButton" class="hidden lg:block relative">
            <Icon :name="icon" class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-5 h-5 z-10" />
            <label :for="id" class="sr-only">{{ label }}</label>
            <input :id="id" :type="type" :value="modelValue"
                class="w-full h-12 bg-light text-gray-dark font-semibold text-sm placeholder:gray-dark placeholder:text-xs placeholder:font-semibold rounded-full p-3 pl-10 focus:outline-none focus:border-transparent"
                @input="$emit('update:modelValue', $event.target.value)" :placeholder="placeholder" :autocomplete="id"
                @blur="$emit('blur')" @keydown.enter="handleEnterKey" />
            <ButtonPrimary @click="$emit('button-click')" class="absolute right-1 top-1/2 !text-sm transform -translate-y-1/2 !py-3 px-6">{{
                buttonText }}</ButtonPrimary>
        </div>

        <div :class="showButton ? 'lg:hidden' : ''" class="relative">
            <Icon :name="icon" class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-5 h-5" />
            <label :for="showButton ? `${id}-mobile` : id" class="sr-only">{{ label }}</label>
            <input :id="showButton ? `${id}-mobile` : id" :type="type" :value="modelValue"
                class="w-full bg-light text-gray-dark font-semibold text-xs placeholder:gray-dark placeholder:text-xs placeholder:font-semibold rounded-full py-3 pl-9 pr-4 focus:outline-none focus:border-transparent"
                @input="$emit('update:modelValue', $event.target.value)" :placeholder="placeholder" :autocomplete="id"
                @blur="$emit('blur')" @keydown.enter="handleEnterKey" />
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
        },
        showButton: {
            type: Boolean,
            default: false
        },
        buttonText: {
            type: String,
            default: 'Enviar'
        },
        buttonClass: {
            type: String,
            default: 'bg-primary text-white hover:bg-primary/90'
        },
        submitOnEnter: {
            type: Boolean,
            default: false
        }
    },
    emits: ['update:modelValue', 'blur', 'button-click', 'submit'],
    methods: {
        handleEnterKey(event) {
            if (this.showButton && this.submitOnEnter) {
                event.preventDefault()
                this.$emit('button-click')
            }
        }
    }
}
</script>
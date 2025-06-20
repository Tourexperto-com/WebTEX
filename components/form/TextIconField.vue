<template>
    <div class="flex flex-col gap-1 md:gap-2">
        <FormLabel v-if="showLabel" :for="id">{{ label }}</FormLabel>
        <label v-else :for="id" class="sr-only">{{ label }}</label>

        <div class="relative">
            <Icon v-if="icon" :name="icon"
                class="w-4 md:w-5 h-4 md:h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-dark" />
            <NuxtImg v-if="personalizedIcon" :src="personalizedIcon" alt="Icon"
                class="w-3 md:w-4 h-3 md:h-4 absolute left-3 top-1/2 transform -translate-y-1/2" />
            <input :id="id" :type="type" :value="modelValue"
                class="w-full bg-light border border-secondary rounded-[9px] text-gray-dark font-semibold text-xs md:text-sm placeholder:text-gray-dark placeholder:text-xs md:placeholder:text-sm placeholder:font-semibold p-3 focus:outline-none focus:none"
                :class="icon || personalizedIcon ? 'pl-8 md:pl-9' : 'pl-3'"
                @input="$emit('update:modelValue', $event.target.value)" :placeholder="placeholder"
                :autocomplete="autocomplete" @blur="$emit('blur')" :required="required" :disabled="disabled" />
        </div>

        <div v-if="!hideError" class="w-full min-h-4">
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
        hideError: {
            type: Boolean,
            default: false
        }
    },
    emits: ['update:modelValue', 'blur']
}
</script>
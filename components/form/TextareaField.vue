<template>
    <div class="flex flex-col gap-1 md:gap-2">
        <FormLabel v-if="showLabel && label" :for="id">{{ label }}</FormLabel>
        <label v-else-if="label" :for="id" class="sr-only">{{ label }}</label>

        <div class="relative">
            <textarea :id="id" :value="modelValue"
                class="w-full bg-light border border-secondary rounded-[9px] text-gray-dark font-semibold text-xs md:text-sm placeholder:text-gray-dark placeholder:text-xs md:placeholder:text-sm placeholder:font-semibold p-3 focus:outline-none focus:none resize-none"
                @input="handleInput" :placeholder="placeholder" @blur="$emit('blur')" :required="required"
                :disabled="disabled" :rows="rows" :maxlength="maxlength" :style="{ minHeight: minHeight }" />
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
            type: String,
            default: ''
        },
        placeholder: {
            type: String,
            default: ''
        },
        required: {
            type: Boolean,
            default: false
        },
        disabled: {
            type: Boolean,
            default: false
        },
        rows: {
            type: Number,
            default: 4
        },
        maxlength: {
            type: Number,
            default: null
        },
        minHeight: {
            type: String,
            default: '100px'
        },
        showCounter: {
            type: Boolean,
            default: true
        },
        autoResize: {
            type: Boolean,
            default: false
        }
    },
    emits: ['update:modelValue', 'blur'],
    computed: {
        characterCount() {
            return this.modelValue ? this.modelValue.length : 0
        }
    },
    methods: {
        handleInput(event) {
            const value = event.target.value
            this.$emit('update:modelValue', value)

            if (this.autoResize) {
                this.adjustHeight(event.target)
            }
        },
        adjustHeight(textarea) {
            textarea.style.height = 'auto'
            textarea.style.height = textarea.scrollHeight + 'px'
        }
    },
    mounted() {
        if (this.autoResize && this.modelValue) {
            this.$nextTick(() => {
                const textarea = this.$el.querySelector('textarea')
                if (textarea) {
                    this.adjustHeight(textarea)
                }
            })
        }
    }
}
</script>
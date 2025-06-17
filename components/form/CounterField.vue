<template>
    <div class="w-full flex flex-col gap-2">
        <div class="flex flex-col gap-2">
            <FormLabel v-if="showLabel && label">{{ label }}</FormLabel>
            <div class="flex items-center gap-3">
                <button type="button" @click="decrement" :disabled="disabled || modelValue <= min"
                    class="w-6 h-6 flex items-center justify-center bg-primary border border-primary text-light rounded-full focus:outline-none">
                    <Icon name="material-symbols:remove" class="w-4 h-4" />
                </button>

                <div class="min-w-[30px] border border-black/30 rounded-[6px] text-center py-2 px-1">
                    <span class="text-secondary font-semibold">{{ displayValue }}</span>
                </div>

                <button type="button" @click="increment" :disabled="disabled || (max !== null && modelValue >= max)"
                    class="w-6 h-6 flex items-center justify-center bg-primary border border-primary text-light rounded-full focus:outline-none">
                    <Icon name="material-symbols:add" class="w-4 h-4" />
                </button>
                <label :for="id" v-if="suffix" class="text-secondary text-xs font-semibold">{{ suffix }}</label>
            </div>
        </div>

        <input :id="id" type="hidden" :value="modelValue" :name="name || id" />

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
            type: Number,
            default: 0
        },
        name: {
            type: String,
            default: null
        },
        min: {
            type: Number,
            default: 0
        },
        max: {
            type: Number,
            default: null
        },
        step: {
            type: Number,
            default: 1
        },
        disabled: {
            type: Boolean,
            default: false
        },
        suffix: {
            type: String,
            default: ''
        }
    },
    emits: ['update:modelValue', 'change'],
    computed: {
        displayValue() {
            return this.suffix ? `${this.modelValue}` : this.modelValue
        }
    },
    methods: {
        increment() {
            if (this.disabled || (this.max !== null && this.modelValue >= this.max)) return

            const newValue = this.modelValue + this.step
            const finalValue = this.max !== null ? Math.min(newValue, this.max) : newValue

            this.$emit('update:modelValue', finalValue)
            this.$emit('change', finalValue)
        },
        decrement() {
            if (this.disabled || this.modelValue <= this.min) return

            const newValue = this.modelValue - this.step
            const finalValue = Math.max(newValue, this.min)

            this.$emit('update:modelValue', finalValue)
            this.$emit('change', finalValue)
        }
    }
}
</script>
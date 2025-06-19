<template>
    <div class="w-full flex items-center gap-1">
        <Icon name="material-symbols:error-circle-rounded-outline-sharp" class="text-error" />
        <p class="text-error text-xs">
            <slot />
        </p>
    </div>
</template>
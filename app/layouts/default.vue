<script setup lang="ts">
import { ScrollArea } from "@/components/ui/scroll-area";

// 全局状态
const globalLoading = ref(false);
const notificationRef = ref();

// 暴露全局方法
provide("globalLoading", globalLoading);
provide("notification", notificationRef);
</script>

<template>
    <div class="app-layout">
        <NuxtLoadingIndicator />
        <BaseHeader />
        <ScrollArea class="app-content">
            <div class="content-wrapper">
                <slot />
            </div>
            <BaseFooter />
        </ScrollArea>
    </div>
</template>

<style scoped>
@import "tailwindcss" reference;

.app-layout {
    min-height: 100vh;
    background: linear-gradient(
        135deg,
        hsl(var(--background)) 0%,
        hsl(var(--muted)) 100%
    );
}

.dark .app-layout {
    background: linear-gradient(
        135deg,
        oklch(0.12 0 0) 0%,
        oklch(0.18 0 0) 50%,
        oklch(0.15 0 0) 100%
    );
}

.app-content {
    height: calc(100vh - 64px);
}

.content-wrapper {
    max-width: 80rem;
    margin: 0 auto;
    animation: fadeIn 0.3s ease-in;
}

@keyframes fadeIn {
    from {
        opacity: 0;
        transform: translateY(10px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}
</style>

<script setup lang="ts">
import { Sun, Moon, Monitor } from "lucide-vue-next";

const colorMode = useColorMode();

const themeOptions = [
    { value: "light", label: "浅色", icon: Sun },
    { value: "dark", label: "暗色", icon: Moon },
    { value: "system", label: "跟随系统", icon: Monitor },
];

const currentTheme = computed(() => {
    const theme = themeOptions.find((t) => t.value === colorMode.preference);
    return theme || themeOptions[1]; // 默认返回暗色主题
});

const setTheme = (theme: string) => {
    colorMode.preference = theme;
};
</script>

<template>
    <DropdownMenu>
        <DropdownMenuTrigger as-child>
            <Button variant="ghost" size="icon" class="theme-toggle-btn">
                <component
                    :is="currentTheme.icon"
                    class="h-5 w-5 transition-transform hover:rotate-12"
                />
            </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" class="w-40">
            <DropdownMenuLabel>选择主题</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem
                v-for="theme in themeOptions"
                :key="theme.value"
                @click="setTheme(theme.value)"
                class="cursor-pointer"
            >
                <component :is="theme.icon" class="mr-2 h-4 w-4" />
                <span>{{ theme.label }}</span>
                <span
                    v-if="colorMode.preference === theme.value"
                    class="ml-auto text-primary"
                >
                    ✓
                </span>
            </DropdownMenuItem>
        </DropdownMenuContent>
    </DropdownMenu>
</template>

<style scoped>
.theme-toggle-btn {
    border-radius: 0.5rem;
    background: rgba(255, 255, 255, 0.5);
    backdrop-filter: blur(4px);
    transition: all 0.3s;
}

.theme-toggle-btn:hover {
    background: hsl(var(--accent));
    transform: scale(1.05);
}
</style>

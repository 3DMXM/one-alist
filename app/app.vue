<script setup lang="ts">
const colorMode = useColorMode();

// 确保在挂载时应用正确的主题
onMounted(() => {
    // 默认使用暗色主题
    if (!colorMode.preference) {
        colorMode.preference = "dark";
    }
});
</script>

<template>
    <NuxtLayout>
        <NuxtPage v-slot="{ Component }">
            <keep-alive>
                <component :is="Component" />
            </keep-alive>
        </NuxtPage>
    </NuxtLayout>
</template>

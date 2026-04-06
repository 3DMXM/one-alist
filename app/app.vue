<script setup lang="ts">
const colorMode = useColorMode();

// 确保在挂载时应用正确的主题
onMounted(() => {
    // 默认使用暗色主题
    if (!colorMode.preference) {
        colorMode.preference = "dark";
    }
});

(window as any).dataLayer = (window as any).dataLayer || [];
function gtag(...args:any[]) {
    (window as any).dataLayer.push(args);
}
gtag("js", new Date()), gtag("config", "G-L04H04RSS7",{
    "content_group":"Gloss-Mod-Manager"
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

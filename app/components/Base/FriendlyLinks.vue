<script setup lang="ts">
type FriendLink = {
    name: string;
    url: string;
};

const links = ref<FriendLink[]>([]);
const pending = ref(true);
const failed = ref(false);

async function loadLinks() {
    try {
        const response = await fetch("https://api.aoe.top/api/friendly/links");
        if (!response.ok) {
            throw new Error(`Failed to load links: ${response.status}`);
        }

        const data = await response.json();
        links.value = Array.isArray(data) ? data : [];
    } catch (error) {
        console.error(error);
        failed.value = true;
    } finally {
        pending.value = false;
    }
}

onMounted(loadLinks);
</script>

<template>
    <section class="friendly-links-panel">
        <p class="friendly-links-title">友情链接</p>
        <div v-if="pending" class="friendly-links-state">友链加载中...</div>
        <div v-else-if="failed" class="friendly-links-state">
            友链加载失败，请稍后重试。
        </div>
        <div v-else class="friendly-links-list">
            <a
                v-for="link in links"
                :key="link.url"
                :href="link.url"
                target="_blank"
                rel="noopener noreferrer"
                class="friendly-links-pill">
                {{ link.name }}
            </a>
        </div>
    </section>
</template>

<style scoped>
.friendly-links-panel {
    max-width: 24rem;
}

.friendly-links-title {
    margin: 0;
    font-size: 12px;
    font-weight: 600;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: hsl(var(--muted-foreground));
}

.friendly-links-list {
    display: flex;
    flex-wrap: wrap;
    gap: 0.3rem 0.5rem;
    margin-top: 0.45rem;
}

.friendly-links-pill,
.friendly-links-state {
    display: inline-flex;
    align-items: center;
    padding: 0.2rem 0.4rem;
    border-radius: 9999px;
    border: 0;
    background: transparent;
    color: hsl(var(--muted-foreground));
    font-size: 12px;
    line-height: 1.4;
    text-decoration: none;
    transition: color 0.2s ease, opacity 0.2s ease;
}

.friendly-links-pill:hover {
    color: hsl(var(--primary));
}

.friendly-links-state {
    width: fit-content;
    margin-top: 0.45rem;
}
</style>

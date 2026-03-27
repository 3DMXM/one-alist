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
        <p class="friendly-links-copy">实时同步最新友链，让私有云底部继续串起更多站点。</p>
        <div v-if="pending" class="friendly-links-state">友链加载中...</div>
        <div v-else-if="failed" class="friendly-links-state">友链加载失败，请稍后重试。</div>
        <div v-else class="friendly-links-list">
            <a
                v-for="link in links"
                :key="link.url"
                :href="link.url"
                target="_blank"
                rel="noopener noreferrer"
                class="friendly-links-pill"
            >
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
    font-size: 0.85rem;
    font-weight: 600;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: hsl(var(--primary));
}

.friendly-links-copy {
    margin-top: 0.5rem;
    font-size: 0.75rem;
    line-height: 1.6;
    color: hsl(var(--muted-foreground));
}

.friendly-links-list {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    margin-top: 0.85rem;
}

.friendly-links-pill,
.friendly-links-state {
    display: inline-flex;
    align-items: center;
    padding: 0.5rem 0.85rem;
    border-radius: 9999px;
    border: 1px solid hsl(var(--border));
    background: hsl(var(--card));
    color: hsl(var(--foreground));
    font-size: 0.78rem;
    text-decoration: none;
    transition: transform 0.2s ease, border-color 0.2s ease, color 0.2s ease;
}

.friendly-links-pill:hover {
    transform: translateY(-2px);
    border-color: hsl(var(--primary));
    color: hsl(var(--primary));
}

.friendly-links-state {
    width: fit-content;
    margin-top: 0.85rem;
}
</style>
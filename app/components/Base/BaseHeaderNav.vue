<script lang="ts" setup>
import { ExternalLink, Star } from "lucide-vue-next";

const main = useMain();

// 检测当前活跃链接
const isActive = (url: string) => {
    if (typeof window === "undefined") return false;
    return window.location.pathname === url;
};
</script>

<template>
    <nav class="header-nav">
        <div class="nav-wrapper">
            <Button
                v-for="item in main.navUrl"
                :key="item.url"
                variant="ghost"
                size="sm"
                class="nav-chip"
                :class="{ 'nav-chip-active': isActive(item.url) }"
                as-child
            >
                <a :href="item.url" :target="item.target ? '_blank' : '_self'">
                    <span class="nav-text">{{ item.title }}</span>
                    <ExternalLink
                        v-if="item.target"
                        class="h-3 w-3 opacity-60"
                    />
                </a>
            </Button>
        </div>
    </nav>
</template>

<script lang="ts">
export default {
    name: "DefaultHeaderNav",
};
</script>

<style lang="less" scoped>
.header-nav {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
}

.nav-wrapper {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    background: linear-gradient(
        135deg,
        rgba(255, 255, 255, 0.1) 0%,
        rgba(255, 255, 255, 0.05) 100%
    );
    backdrop-filter: blur(12px);
    padding: 0.5rem 1rem;
    border-radius: 2rem;
    border: 1px solid rgba(255, 255, 255, 0.15);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    position: relative;
    overflow: hidden;

    &::before {
        content: "";
        position: absolute;
        top: 0;
        left: -100%;
        width: 100%;
        height: 100%;
        background: linear-gradient(
            90deg,
            transparent,
            rgba(255, 255, 255, 0.1),
            transparent
        );
        animation: shimmer 3s infinite;
    }
}

@keyframes shimmer {
    0% {
        left: -100%;
    }
    100% {
        left: 100%;
    }
}

.nav-chip {
    border-radius: 1.5rem;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    position: relative;
    overflow: hidden;
    background: transparent;

    &::after {
        content: "";
        position: absolute;
        bottom: 0;
        left: 50%;
        transform: translateX(-50%) scaleX(0);
        width: 80%;
        height: 2px;
        background: hsl(var(--primary));
        transition: transform 0.3s;
    }

    &:hover {
        background: rgba(255, 255, 255, 0.12);
        transform: translateY(-2px);

        &::after {
            transform: translateX(-50%) scaleX(1);
        }
    }

    &-active {
        background: rgba(255, 255, 255, 0.15);
        box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.2);

        &::after {
            transform: translateX(-50%) scaleX(1);
        }
    }

    a {
        color: inherit;
        text-decoration: none;
        display: flex;
        align-items: center;
        gap: 0.5rem;
        padding: 0 0.25rem;
    }
}

.nav-icon {
    display: flex;
    align-items: center;
    font-size: 1.1rem;
}

.nav-text {
    font-weight: 500;
    font-size: 0.875rem;
}

.nav-badge {
    display: flex;
    align-items: center;
    gap: 0.25rem;
    padding: 0.25rem 0.625rem;
    background: linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%);
    color: #78350f;
    border-radius: 1rem;
    font-size: 0.75rem;
    font-weight: 700;
    box-shadow: 0 2px 8px rgba(251, 191, 36, 0.3);
    animation: pulse-badge 2s infinite;
}

@keyframes pulse-badge {
    0%,
    100% {
        transform: scale(1);
        box-shadow: 0 2px 8px rgba(251, 191, 36, 0.3);
    }
    50% {
        transform: scale(1.05);
        box-shadow: 0 4px 12px rgba(251, 191, 36, 0.5);
    }
}

/* 响应式设计 */
@media (max-width: 768px) {
    .nav-wrapper {
        padding: 0.375rem 0.75rem;
        gap: 0.25rem;
    }

    .nav-text {
        display: none;
    }

    .nav-icon {
        font-size: 1rem;
    }

    .nav-badge {
        padding: 0.25rem 0.5rem;
    }
}

/* 暗色主题 */
.dark {
    .nav-wrapper {
        background: linear-gradient(
            135deg,
            rgba(255, 255, 255, 0.08) 0%,
            rgba(255, 255, 255, 0.04) 100%
        );
        border-color: rgba(255, 255, 255, 0.12);
        box-shadow: 0 4px 16px rgba(0, 0, 0, 0.3);
    }

    .nav-chip {
        &:hover {
            background: rgba(255, 255, 255, 0.1);
        }

        &-active {
            background: rgba(255, 255, 255, 0.12);
        }
    }
}
</style>

<script lang="ts" setup>
import {
    Menu,
    Search,
    Cloud,
    ExternalLink,
    Home,
    HardDrive,
    Sparkles,
    ChevronRight,
} from "lucide-vue-next";

const main = useMain();
const searchOpen = ref(false);
const route = useRoute();

// 当前路径信息
const currentPath = computed(() => {
    return (route.params.path as string) || "首页";
});
</script>
<template>
    <!-- 顶部导航栏 -->
    <header class="modern-header">
        <div class="header-content">
            <!-- 侧边栏按钮 -->
            <Sheet>
                <SheetTrigger as-child>
                    <Button
                        variant="ghost"
                        size="icon"
                        class="menu-btn"
                        @click="main.drawer = !main.drawer"
                    >
                        <Menu class="h-5 w-5" />
                    </Button>
                </SheetTrigger>
                <SheetContent side="left" class="modern-drawer">
                    <SheetHeader>
                        <SheetTitle class="drawer-brand">
                            <div class="brand-logo">
                                <Cloud class="h-6 w-6 text-primary" />
                                <Sparkles
                                    class="h-3 w-3 text-yellow-500 absolute -top-1 -right-1 animate-pulse"
                                />
                            </div>
                        </SheetTitle>
                    </SheetHeader>

                    <div class="drawer-nav">
                        <div class="nav-section">
                            <nav class="space-y-1">
                                <Button
                                    v-for="item in main.navUrl"
                                    :key="item.url"
                                    variant="ghost"
                                    class="nav-item w-full justify-start"
                                    :as-child="true"
                                >
                                    <a
                                        :href="item.url"
                                        :target="
                                            item.target ? '_blank' : '_self'
                                        "
                                        class="flex items-center gap-3"
                                    >
                                        <span class="flex-1">{{
                                            item.title
                                        }}</span>
                                        <ExternalLink
                                            v-if="item.target"
                                            class="h-4 w-4 opacity-50"
                                        />
                                        <ChevronRight
                                            v-else
                                            class="h-4 w-4 opacity-50"
                                        />
                                    </a>
                                </Button>
                            </nav>
                        </div>

                        <!-- 快速操作 -->
                        <div class="nav-section mt-6">
                            <p class="nav-section-title">快速操作</p>
                            <div class="quick-actions">
                                <Button
                                    variant="link"
                                    size="sm"
                                    class="quick-action-btn"
                                >
                                    <Home class="h-4 w-4 mr-2" />
                                    返回首页
                                </Button>
                            </div>
                        </div>
                    </div>
                </SheetContent>
            </Sheet>

            <!-- 品牌 Logo -->
            <div class="brand-section">
                <div class="brand-logo-main">
                    <Cloud class="h-7 w-7 text-primary brand-icon" />
                    <div class="status-indicator"></div>
                </div>
                <div class="brand-info">
                    <h1 class="brand-title">私有云网盘</h1>
                </div>
            </div>
        </div>

        <!-- 右侧操作区 -->
        <div class="header-actions">
            <!-- 搜索按钮 -->
            <TooltipProvider>
                <Tooltip>
                    <TooltipTrigger as-child>
                        <Button
                            variant="ghost"
                            size="icon"
                            class="action-btn search-btn"
                            @click="searchOpen = true"
                        >
                            <Search class="h-5 w-5" />
                        </Button>
                    </TooltipTrigger>
                    <TooltipContent side="bottom">
                        <p class="flex items-center gap-2">
                            搜索
                            <kbd
                                class="px-2 py-1 text-xs bg-muted rounded border"
                            >
                                Ctrl+K
                            </kbd>
                        </p>
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>

            <!-- 主题切换 -->
            <ThemeToggle />
        </div>
    </header>

    <!-- 二级导航栏 -->
    <nav class="secondary-header" v-if="!main.drawer">
        <div class="nav-container">
            <BaseHeaderNav />
        </div>
    </nav>

    <!-- 搜索命令面板 -->
    <SearchCommand v-model:open="searchOpen" />
</template>
<script lang="ts">
export default {
    name: "DefaultHeader",
};
</script>
<style lang="less" scoped>
.modern-header {
    background: linear-gradient(
        135deg,
        rgba(255, 255, 255, 0.08) 0%,
        rgba(255, 255, 255, 0.04) 100%
    );
    backdrop-filter: blur(24px) saturate(180%);
    border-bottom: 1px solid rgba(255, 255, 255, 0.12);
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 1.5rem;
    height: 64px;
    position: sticky;
    top: 0;
    z-index: 50;
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
}

.header-content {
    display: flex;
    align-items: center;
    gap: 16px;
}

.menu-btn {
    background: rgba(255, 255, 255, 0.1);
    border-radius: 10px;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);

    &:hover {
        background: rgba(255, 255, 255, 0.18);
        transform: scale(1.05);
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    }
}

.brand-section {
    display: flex;
    align-items: center;
    gap: 12px;
}

.brand-logo-main {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
}

.brand-icon {
    filter: drop-shadow(0 2px 6px rgba(0, 0, 0, 0.3));
    animation: float 3s ease-in-out infinite;
}

.status-indicator {
    position: absolute;
    bottom: -2px;
    right: -2px;
    width: 8px;
    height: 8px;
    background: #10b981;
    border: 2px solid hsl(var(--background));
    border-radius: 50%;
    animation: pulse-dot 2s infinite;
}

@keyframes float {
    0%,
    100% {
        transform: translateY(0px);
    }
    50% {
        transform: translateY(-5px);
    }
}

@keyframes pulse-dot {
    0%,
    100% {
        opacity: 1;
        transform: scale(1);
    }
    50% {
        opacity: 0.7;
        transform: scale(1.1);
    }
}

.brand-info {
    display: flex;
    flex-direction: column;
    gap: 2px;
}

.brand-title {
    font-size: 1.25rem;
    font-weight: 700;
    margin: 0;
    background: linear-gradient(
        135deg,
        hsl(var(--foreground)) 0%,
        hsl(var(--primary)) 100%
    );
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    letter-spacing: -0.02em;
    line-height: 1.2;
}

.brand-subtitle {
    font-size: 0.75rem;
    color: hsl(var(--muted-foreground));
    margin: 0;
    font-weight: 500;
}

.header-actions {
    display: flex;
    align-items: center;
    gap: 6px;
}

.action-btn {
    background: rgba(255, 255, 255, 0.08);
    border-radius: 10px;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    position: relative;

    &:hover {
        background: rgba(255, 255, 255, 0.15);
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    }
}

.search-btn {
    &::after {
        content: "K";
        position: absolute;
        top: 2px;
        right: 2px;
        font-size: 0.625rem;
        background: hsl(var(--primary));
        color: hsl(var(--primary-foreground));
        padding: 1px 3px;
        border-radius: 3px;
        font-weight: 600;
        opacity: 0;
        transition: opacity 0.2s;
    }

    &:hover::after {
        opacity: 1;
    }
}

.secondary-header {
    background: linear-gradient(
        135deg,
        rgba(255, 255, 255, 0.04) 0%,
        rgba(255, 255, 255, 0.02) 100%
    );
    backdrop-filter: blur(12px);
    border-bottom: 1px solid rgba(255, 255, 255, 0.08);
    height: 48px;
    display: flex;
    align-items: center;
}

.nav-container {
    max-width: 1200px;
    margin: 0 auto;
    width: 100%;
    padding: 0 1rem;
}

/* 侧边栏样式 */
.modern-drawer {
    background: linear-gradient(
        135deg,
        rgba(20, 20, 20, 0.98) 0%,
        rgba(30, 30, 30, 0.95) 100%
    );
    backdrop-filter: blur(24px);
    border-right: 1px solid rgba(255, 255, 255, 0.12);
    display: flex;
    flex-direction: column;
}

.drawer-brand {
    display: flex;
    align-items: flex-start;
    gap: 12px;
    color: hsl(var(--foreground));
}

.brand-logo {
    position: relative;
}

.drawer-title {
    font-size: 1.25rem;
    font-weight: 700;
    background: linear-gradient(135deg, #fff 0%, hsl(var(--primary)) 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
}

.drawer-nav {
    flex: 1;
    overflow-y: auto;
    padding: 1rem 0;
}

.nav-section {
    margin-bottom: 1.5rem;
}

.nav-section-title {
    font-size: 0.75rem;
    font-weight: 600;
    color: hsl(var(--muted-foreground));
    text-transform: uppercase;
    letter-spacing: 0.05em;
    margin-bottom: 0.5rem;
    padding: 0 0.75rem;
}

.nav-item {
    margin: 2px 0;
    border-radius: 10px;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    color: hsl(var(--foreground));
    position: relative;
    overflow: hidden;

    &::before {
        content: "";
        position: absolute;
        left: 0;
        top: 0;
        height: 100%;
        width: 3px;
        background: hsl(var(--primary));
        transform: scaleY(0);
        transition: transform 0.3s;
    }

    &:hover {
        background: rgba(255, 255, 255, 0.1);
        transform: translateX(4px);

        &::before {
            transform: scaleY(1);
        }
    }

    a {
        color: inherit;
        text-decoration: none;
    }
}

.nav-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 24px;
    height: 24px;
}

.quick-actions {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    padding: 0 0.75rem;
}

.quick-action-btn {
    justify-content: flex-start;
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(255, 255, 255, 0.1);
    transition: all 0.2s;

    &:hover {
        background: rgba(255, 255, 255, 0.1);
        border-color: rgba(255, 255, 255, 0.2);
        transform: translateX(2px);
    }
}

.drawer-footer {
    margin-top: auto;
    padding: 1rem;
    border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.storage-info {
    width: 100%;
}

/* 响应式设计 */
@media (max-width: 768px) {
    .brand-title {
        font-size: 1rem;
    }

    .brand-subtitle {
        display: none;
    }

    .brand-info {
        gap: 0;
    }

    .header-actions {
        gap: 4px;
    }

    .modern-header {
        padding: 0 1rem;
    }

    .search-btn::after {
        display: none;
    }
}

/* 暗色主题适配 */
.dark {
    .modern-header {
        background: linear-gradient(
            135deg,
            rgba(255, 255, 255, 0.06) 0%,
            rgba(255, 255, 255, 0.03) 100%
        );
        border-bottom-color: rgba(255, 255, 255, 0.12);
        box-shadow: 0 2px 16px rgba(0, 0, 0, 0.3);
    }

    .secondary-header {
        background: linear-gradient(
            135deg,
            rgba(255, 255, 255, 0.03) 0%,
            rgba(255, 255, 255, 0.01) 100%
        );
        border-bottom-color: rgba(255, 255, 255, 0.06);
    }

    .modern-drawer {
        background: linear-gradient(
            135deg,
            rgba(15, 15, 15, 0.98) 0%,
            rgba(25, 25, 25, 0.96) 100%
        );
        border-right-color: rgba(255, 255, 255, 0.1);
    }

    .menu-btn,
    .action-btn {
        background: rgba(255, 255, 255, 0.06);

        &:hover {
            background: rgba(255, 255, 255, 0.12);
        }
    }

    .status-indicator {
        border-color: rgba(15, 15, 15, 0.98);
    }
}
</style>

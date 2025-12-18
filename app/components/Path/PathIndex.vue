<script lang="ts" setup>
import {
    Cloud,
    File,
    Layers,
    FolderOpen,
    RefreshCw,
    FileText,
} from "lucide-vue-next";

const files = useFiles();
const route = useRoute();

const showReadme = computed(() => {
    return files.fileList.some((file) => file.name === "README.md");
});

const path = computed(() => {
    return (route.params.path as string) || "/";
});

// 分页相关状态
const itemsPerPage = ref(20);
const currentPage = ref(1);

// 计算分页后的文件列表
const paginatedFiles = computed(() => {
    const start = (currentPage.value - 1) * itemsPerPage.value;
    const end = start + itemsPerPage.value;
    return files.fileList.slice(start, end);
});

// 总页数
const totalPages = computed(() => {
    return Math.ceil(files.fileList.length / itemsPerPage.value);
});

// 监听路由变化，重置分页
watch(
    () => files.fileList,
    () => {
        currentPage.value = 1;
    },
    { deep: true }
);

watch(
    path,
    () => {
        files.getFileList(path.value);
    },
    {
        immediate: true,
    }
);

// 页面切换处理
function handlePageChange(page: number) {
    currentPage.value = page;
    // 滚动到顶部
    const container = document.querySelector(".path-index-container");
    if (container) {
        container.scrollTo({ top: 0, behavior: "smooth" });
    }
}

document.title = path.value;

async function getSiteName() {
    const data = await $fetch<{ code: number; data: string }>(
        "/api/getSiteName",
        {
            method: "POST",
        }
    );
    document.title = `${path.value} - ${data.data}`;
}

getSiteName();
</script>
<template>
    <div class="path-index-container">
        <Income :key="$route.path" class="mb-4"></Income>
        <!-- 面包屑导航 -->
        <Breadcrumb class="breadcrumb-card">
            <CardTitle class="breadcrumb-title">
                <PathBreadcrumbs></PathBreadcrumbs>
            </CardTitle>
        </Breadcrumb>

        <!-- 文件统计信息 -->
        <Card class="stats-card mt-4 pt-2 pb-2" v-if="!files.loading">
            <CardContent>
                <div class="flex items-center gap-4">
                    <Badge variant="outline" class="mr-2">
                        <File class="mr-1 h-4 w-4"></File>
                        {{ files.fileList.length }} 项目
                    </Badge>
                    <Badge variant="outline" v-if="totalPages > 1">
                        <Layers class="mr-1 h-4 w-4"></Layers>
                        第 {{ currentPage }} 页，共 {{ totalPages }} 页
                    </Badge>
                    <div class="ml-auto">
                        <Select v-model="itemsPerPage">
                            <SelectTrigger class="w-32">
                                <SelectValue placeholder="每页显示" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem :value="10">10</SelectItem>
                                <SelectItem :value="20">20</SelectItem>
                                <SelectItem :value="50">50</SelectItem>
                                <SelectItem :value="100">100</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>
            </CardContent>
        </Card>

        <!-- 主内容区域 -->
        <Card class="main-card mt-4">
            <Income :key="$route.path" class="mb-4"></Income>
            <!-- 加载状态 -->
            <CardContent v-if="files.loading" class="loading-container">
                <div class="loading-content">
                    <div class="loading-skeleton-wrapper">
                        <Skeleton class="h-12 w-12 rounded-full mb-4" />
                        <Skeleton class="h-4 w-48 mb-2" />
                        <Skeleton class="h-3 w-32" />
                    </div>
                    <div class="mt-6 space-y-3 w-full max-w-md">
                        <Skeleton
                            v-for="i in 5"
                            :key="i"
                            class="h-16 w-full rounded-lg"
                        />
                    </div>
                </div>
            </CardContent>

            <!-- 文件列表 -->
            <CardContent
                v-else-if="files.fileList.length > 0"
                class="file-list-container"
            >
                <!-- 文件网格视图 -->
                <div class="files-grid">
                    <TransitionGroup
                        name="file-item"
                        tag="div"
                        class="files-transition-group"
                    >
                        <PathItemFiles
                            v-for="item in paginatedFiles"
                            :key="item.name"
                            :item="item"
                            class="file-item-wrapper"
                        ></PathItemFiles>
                    </TransitionGroup>
                </div>

                <!-- 分页控件 -->
                <div class="pagination-container" v-if="totalPages > 1">
                    <div class="flex items-center justify-center gap-2">
                        <Button
                            variant="outline"
                            size="sm"
                            @click="handlePageChange(currentPage - 1)"
                            :disabled="currentPage <= 1"
                        >
                            上一页
                        </Button>
                        <span class="text-sm text-muted-foreground">
                            第 {{ currentPage }} 页，共 {{ totalPages }} 页
                        </span>
                        <Button
                            variant="outline"
                            size="sm"
                            @click="handlePageChange(currentPage + 1)"
                            :disabled="currentPage >= totalPages"
                        >
                            下一页
                        </Button>
                    </div>
                </div>
            </CardContent>

            <!-- 空状态 -->
            <CardContent v-else class="empty-container">
                <Empty>
                    <EmptyHeader>
                        <FolderOpen
                            class="h-12 w-12 text-muted-foreground"
                        ></FolderOpen>
                        <EmptyTitle>文件夹为空</EmptyTitle>
                        <EmptyDescription
                            >当前文件夹中没有任何文件或文件夹</EmptyDescription
                        >
                    </EmptyHeader>
                    <EmptyContent>
                        <Button
                            @click="
                                files.getFileList($route.params.path as string)
                            "
                        >
                            <RefreshCw class="mr-2 h-4 w-4"></RefreshCw>
                            刷新
                        </Button>
                    </EmptyContent>
                </Empty>
            </CardContent>
        </Card>

        <!-- README 展示 -->
        <Card class="readme-card mt-4" v-if="showReadme && !files.loading">
            <CardHeader>
                <CardTitle class="readme-title">
                    <FileText class="mr-2 h-5 w-5 text-info"></FileText>
                    README.md
                </CardTitle>
            </CardHeader>
            <CardContent>
                <PathReadme></PathReadme>
            </CardContent>
        </Card>
        <Income :key="$route.path" class="mb-4"></Income>
    </div>
</template>
<script lang="ts">
export default {
    name: "PathIndex",
};
</script>
<style lang="less" scoped>
.path-index-container {
    width: 100%;
}

.breadcrumb-card {
    background: linear-gradient(
        135deg,
        rgba(255, 255, 255, 0.05) 0%,
        rgba(255, 255, 255, 0.02) 100%
    );
    backdrop-filter: blur(15px);
    border: 1px solid rgba(255, 255, 255, 0.1);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    transition: all 0.3s ease;

    &:hover {
        border-color: rgba(255, 255, 255, 0.15);
        box-shadow: 0 6px 16px rgba(0, 0, 0, 0.15);
    }
}

.breadcrumb-title {
    padding: 16px 20px;
    font-weight: 600;
    color: hsl(var(--foreground));
    display: flex;
    align-items: center;
}

.stats-card {
    background: linear-gradient(
        135deg,
        rgba(255, 255, 255, 0.06) 0%,
        rgba(255, 255, 255, 0.03) 100%
    );
    backdrop-filter: blur(12px);
    border: 1px solid rgba(255, 255, 255, 0.12);
    transition: all 0.3s ease;
}

.main-card {
    background: linear-gradient(
        135deg,
        rgba(255, 255, 255, 0.04) 0%,
        rgba(255, 255, 255, 0.02) 100%
    );
    backdrop-filter: blur(20px);
    border: 1px solid rgba(255, 255, 255, 0.12);
    min-height: 400px;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.12);
}

.loading-container {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 400px;
}

.loading-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    width: 100%;
}

.loading-skeleton-wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.file-list-container {
    padding: 20px;
}

.files-grid {
    margin-bottom: 24px;
}

.files-transition-group {
    display: grid;
    gap: 8px;
    grid-template-columns: 1fr;
}

.file-item-wrapper {
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

/* 文件项动画 */
.file-item-enter-active,
.file-item-leave-active {
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.file-item-enter-from {
    opacity: 0;
    transform: translateY(20px) scale(0.95);
}

.file-item-leave-to {
    opacity: 0;
    transform: translateY(-20px) scale(0.95);
}

.file-item-move {
    transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.pagination-container {
    display: flex;
    justify-content: center;
    margin-top: 32px;
    padding-top: 24px;
    border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.empty-container {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 300px;
}

.empty-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    max-width: 400px;
    margin: 0 auto;
}

.readme-card {
    background: linear-gradient(
        135deg,
        rgba(255, 255, 255, 0.05) 0%,
        rgba(255, 255, 255, 0.02) 100%
    );
    backdrop-filter: blur(12px);
    border: 1px solid rgba(255, 255, 255, 0.1);
}

.readme-title {
    padding: 16px 20px;
    font-weight: 600;
    color: hsl(var(--foreground));
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    display: flex;
    align-items: center;
}

/* 响应式设计 */
@media (min-width: 768px) {
    .files-transition-group {
        grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
        gap: 12px;
    }
}

@media (min-width: 1200px) {
    .files-transition-group {
        grid-template-columns: 1fr;
        gap: 8px;
    }
}

/* 暗色主题优化 */
.dark {
    .breadcrumb-card,
    .stats-card,
    .main-card,
    .readme-card {
        background: linear-gradient(
            135deg,
            rgba(255, 255, 255, 0.08) 0%,
            rgba(255, 255, 255, 0.04) 100%
        );
        border-color: rgba(255, 255, 255, 0.15);
    }

    .main-card {
        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
    }
}
</style>

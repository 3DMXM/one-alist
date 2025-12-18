<script setup lang="ts">
import { Search, File, Folder, Clock, TrendingUp } from "lucide-vue-next";
import { computed } from "vue";

const open = defineModel<boolean>("open", { default: false });
const files = useFiles();
const router = useRouter();

// 搜索关键词
const searchQuery = ref("");

// 最近访问的文件（可以从localStorage获取）
const recentFiles = ref<IFiles[]>([]);

// 过滤文件列表
const filteredFiles = computed(() => {
    if (!searchQuery.value) {
        return recentFiles.value.slice(0, 5);
    }

    return files.fileList
        .filter((file) =>
            file.name.toLowerCase().includes(searchQuery.value.toLowerCase())
        )
        .slice(0, 8);
});

// 快速导航
const quickLinks = [
    { name: "首页", path: "/", icon: "🏠" },
    { name: "文档", path: "/documents", icon: "📄" },
    { name: "图片", path: "/images", icon: "🖼️" },
    { name: "视频", path: "/videos", icon: "🎬" },
];

const handleSelect = (file: IFiles) => {
    if (file.is_dir) {
        router.push(`/${file.name}`);
    } else {
        // 处理文件选择
        console.log("Selected file:", file.name);
    }
    open.value = false;
};

const handleQuickLink = (path: string) => {
    router.push(path);
    open.value = false;
};

// 监听快捷键
onMounted(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
        if ((e.metaKey || e.ctrlKey) && e.key === "k") {
            e.preventDefault();
            open.value = !open.value;
        }
    };

    window.addEventListener("keydown", handleKeyDown);

    onUnmounted(() => {
        window.removeEventListener("keydown", handleKeyDown);
    });
});
</script>

<template>
    <CommandDialog v-model:open="open">
        <CommandInput v-model="searchQuery" placeholder="搜索文件和文件夹..." />
        <CommandList>
            <CommandEmpty>未找到相关结果</CommandEmpty>

            <!-- 快速链接 -->
            <CommandGroup heading="快速导航" v-if="!searchQuery">
                <CommandItem
                    v-for="link in quickLinks"
                    :key="link.path"
                    :value="link.name"
                    @select="handleQuickLink(link.path)"
                >
                    <span class="mr-2 text-lg">{{ link.icon }}</span>
                    <span>{{ link.name }}</span>
                </CommandItem>
            </CommandGroup>

            <!-- 最近访问 -->
            <CommandGroup
                heading="最近访问"
                v-if="!searchQuery && recentFiles.length > 0"
            >
                <CommandItem
                    v-for="file in recentFiles"
                    :key="file.name"
                    :value="file.name"
                    @select="handleSelect(file)"
                >
                    <component
                        :is="file.is_dir ? Folder : File"
                        class="mr-2 h-4 w-4"
                    />
                    <span>{{ file.name }}</span>
                    <CommandShortcut>
                        <Clock class="h-3 w-3" />
                    </CommandShortcut>
                </CommandItem>
            </CommandGroup>

            <!-- 搜索结果 -->
            <CommandGroup heading="搜索结果" v-if="searchQuery">
                <CommandItem
                    v-for="file in filteredFiles"
                    :key="file.name"
                    :value="file.name"
                    @select="handleSelect(file)"
                >
                    <component
                        :is="file.is_dir ? Folder : File"
                        class="mr-2 h-4 w-4"
                    />
                    <span>{{ file.name }}</span>
                    <CommandShortcut v-if="file.is_dir">
                        文件夹
                    </CommandShortcut>
                </CommandItem>
            </CommandGroup>
        </CommandList>
    </CommandDialog>
</template>

<style scoped>
/* 命令面板样式已由 shadcn-vue 提供 */
</style>

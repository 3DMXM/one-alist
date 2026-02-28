<script lang="ts" setup>
import { join } from "path-browserify";
import axios from "axios";
import {
    Folder,
    File,
    Image,
    Video,
    Music,
    Archive,
    FileText,
    Code,
    Package,
    AppWindow,
    Terminal,
    Smartphone,
    Disc,
    Box,
} from "lucide-vue-next";

const props = defineProps<{
    item: IFiles;
}>();

const route = useRoute();
const router = useRouter();
const main = useMain();

const path = computed(() => {
    let path = "";
    if (typeof route.params.path == "string") {
        path = route.params.path;
    } else if (typeof route.params.path === "object") {
        path = (route.params.path as string[]).join("/");
    }
    return path;
});
const isLoading = ref(false);
const isHovered = ref(false);
const isFavorite = ref(false);

// 获取文件类型图标和颜色
const fileInfo = computed(() => {
    const fileName = props.item.name.toLowerCase();
    const suffix = fileName.split(".").pop();

    if (props.item.is_dir) {
        return {
            icon: Folder,
            color: "amber",
            type: "文件夹",
        };
    }

    // 图片文件
    if (
        ["bmp", "jpg", "jpeg", "png", "gif", "webp", "svg"].includes(
            suffix || "",
        )
    ) {
        return {
            icon: Image,
            color: "green",
            type: "图片",
        };
    }

    // 视频文件
    if (
        [
            "mp4",
            "mkv",
            "webm",
            "avi",
            "mpg",
            "mpeg",
            "rm",
            "rmvb",
            "mov",
            "wmv",
            "asf",
            "flv",
        ].includes(suffix || "")
    ) {
        return {
            icon: Video,
            color: "red",
            type: "视频",
        };
    }

    // 音频文件
    if (["ogg", "mp3", "wav", "flac", "aac", "m4a"].includes(suffix || "")) {
        return {
            icon: Music,
            color: "purple",
            type: "音频",
        };
    }

    // 安装包与系统文件
    if (["exe", "msi"].includes(suffix || "")) {
        return { icon: AppWindow, color: "blue", type: "Windows 程序" };
    }
    if (["dmg", "pkg"].includes(suffix || "")) {
        return { icon: Disc, color: "grey", type: "Mac 磁盘映像" };
    }
    if (["deb", "rpm", "appimage"].includes(suffix || "")) {
        return { icon: Box, color: "orange", type: "Linux 程序包" };
    }
    if (
        fileName.endsWith(".tar.gz") ||
        ["tar", "gz", "tgz"].includes(suffix || "")
    ) {
        return { icon: Package, color: "orange", type: "压缩包/源码" };
    }
    if (["apk"].includes(suffix || "")) {
        return { icon: Smartphone, color: "green", type: "Android 应用" };
    }
    if (["bat", "cmd", "sh", "bin"].includes(suffix || "")) {
        return { icon: Terminal, color: "grey", type: "脚本/可执行文件" };
    }

    // 压缩文件
    if (["zip", "rar", "7z", "bz2", "xz", "iso"].includes(suffix || "")) {
        return {
            icon: Archive,
            color: "orange",
            type: "压缩包",
        };
    }

    // 文档文件
    if (
        ["doc", "docx", "xls", "xlsx", "ppt", "pptx", "pdf"].includes(
            suffix || "",
        )
    ) {
        return {
            icon: FileText,
            color: "blue",
            type: "文档",
        };
    }

    // 代码文件
    if (
        [
            "js",
            "ts",
            "vue",
            "html",
            "css",
            "scss",
            "less",
            "py",
            "java",
            "cpp",
            "c",
            "php",
            "go",
            "rs",
        ].includes(suffix || "")
    ) {
        return {
            icon: Code,
            color: "indigo",
            type: "代码",
        };
    }

    // 文本文件
    if (
        [
            "txt",
            "md",
            "json",
            "xml",
            "yml",
            "yaml",
            "ini",
            "cfg",
            "conf",
        ].includes(suffix || "")
    ) {
        return {
            icon: FileText,
            color: "grey",
            type: "文本",
        };
    }

    return {
        icon: File,
        color: "grey",
        type: "文件",
    };
});

const to = computed(() => {
    console.log([path.value, props.item.name]);

    let url = join(path.value, props.item.name);
    return url;
});

async function click() {
    if (isLoading.value) return;

    isLoading.value = true;
    console.log(to.value);

    try {
        if (props.item.is_dir) {
            await router.push(`/${to.value}`);
        } else {
            const { data } = await axios.post(`/api/getFileContent`, {
                path: to.value,
            });

            if (data.code == 200) {
                window.open(data.data.raw_url);
            } else {
                console.error(data.message || "获取文件失败");
            }
        }
    } catch (error) {
        console.error("操作失败，请重试");
    } finally {
        isLoading.value = false;
    }
}

// 格式化文件大小
const formattedSize = computed(() => {
    if (props.item.is_dir) return "-";
    return main.formatSize(props.item.size);
});

// 格式化修改时间
const formattedTime = computed(() => {
    return main.formatTime(props.item.modified);
});
</script>
<template>
    <div
        class="file-list-item"
        :class="{
            'file-list-item--loading': isLoading,
            'file-list-item--dir': item.is_dir,
        }"
        @click="click"
        @mouseenter="isHovered = true"
        @mouseleave="isHovered = false"
    >
        <!-- 文件图标 -->
        <div class="file-icon-wrapper">
            <component
                :is="fileInfo.icon"
                class="file-icon"
                :class="`icon-${fileInfo.color}`"
            />
            <div v-if="isLoading" class="loading-spinner"></div>
        </div>

        <!-- 文件名 -->
        <div class="file-name-col">
            <span class="file-name">{{ item.name }}</span>
        </div>

        <!-- 文件类型 -->
        <div class="file-type-col">
            {{ fileInfo.type }}
        </div>

        <!-- 文件大小 -->
        <div class="file-size-col">
            {{ formattedSize }}
        </div>

        <!-- 修改时间 -->
        <div class="file-time-col">
            {{ formattedTime }}
        </div>
    </div>
</template>
<script lang="ts">
export default {
    name: "PathItemFiles",
};
</script>
<style lang="less" scoped>
// Windows 资源管理器风格
.file-list-item {
    display: grid;
    grid-template-columns: 24px 1fr 100px 80px 140px;
    gap: 8px;
    align-items: center;
    padding: 10px 8px;
    // min-height: 40px;
    // border: 1px solid transparent;
    background: transparent;
    transition: background-color 0.1s ease;
    position: relative;
    cursor: pointer;
    user-select: none;

    // 斑马纹效果
    &:nth-child(even) {
        background: rgba(0, 0, 0, 0.02);
    }

    &:hover {
        background: rgba(0, 120, 215, 0.1) !important;
        border-color: rgba(0, 120, 215, 0.3);
    }

    &.selected {
        background: rgba(0, 120, 215, 0.15) !important;
        border-color: rgba(0, 120, 215, 0.4);
    }

    &--loading {
        opacity: 0.5;
        pointer-events: none;
    }

    // 响应式
    @media (max-width: 1024px) {
        grid-template-columns: 24px 1fr 80px 140px;
        .file-type-col {
            display: none;
        }
    }

    @media (max-width: 768px) {
        grid-template-columns: 40px 1fr auto;
        grid-template-rows: auto auto;
        gap: 4px 12px;
        padding: 12px 16px;

        .file-icon-wrapper {
            grid-column: 1;
            grid-row: 1 / 3;
            width: 40px;
            height: 40px;
            background: rgba(128, 128, 128, 0.1);
            border-radius: 8px;

            .file-icon {
                width: 24px;
                height: 24px;
            }

            .loading-spinner {
                width: 16px;
                height: 16px;
            }
        }

        .file-name-col {
            grid-column: 2 / 4;
            grid-row: 1;
            align-self: end;

            .file-name {
                font-size: 15px;
                font-weight: 500;
            }
        }

        .file-type-col {
            display: none;
        }

        .file-time-col {
            grid-column: 2;
            grid-row: 2;
            align-self: start;
            font-size: 12px;
            color: hsl(var(--muted-foreground));
            display: block;
        }

        .file-size-col {
            grid-column: 3;
            grid-row: 2;
            align-self: start;
            font-size: 12px;
            color: hsl(var(--muted-foreground));
            text-align: right;
            display: block;
        }
    }
}

.file-checkbox {
    display: flex;
    align-items: center;
    justify-content: center;

    .checkbox {
        width: 16px;
        height: 16px;
        cursor: pointer;
        opacity: 0;
        transition: opacity 0.1s;
    }

    .file-list-item:hover &,
    .file-list-item.selected & {
        .checkbox {
            opacity: 1;
        }
    }
}

.file-icon-wrapper {
    width: 20px;
    height: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    flex-shrink: 0;

    .file-icon {
        width: 16px;
        height: 16px;

        // 文件类型颜色 - Windows 风格
        &.icon-amber {
            color: #ffb900;
        }

        &.icon-green {
            color: #107c10;
        }

        &.icon-red {
            color: #e81123;
        }

        &.icon-purple {
            color: #881798;
        }

        &.icon-orange {
            color: #ff8c00;
        }

        &.icon-blue {
            color: #0078d4;
        }

        &.icon-indigo {
            color: #5c2d91;
        }

        &.icon-grey {
            color: #737373;
        }
    }

    .loading-spinner {
        position: absolute;
        width: 12px;
        height: 12px;
        border: 2px solid rgba(0, 120, 215, 0.3);
        border-top-color: #0078d4;
        border-radius: 50%;
        animation: spin 0.8s linear infinite;
    }
}

@keyframes spin {
    to {
        transform: rotate(360deg);
    }
}

.file-name-col {
    min-width: 0;
    overflow: hidden;

    .file-name {
        display: block;
        font-size: 13px;
        font-weight: 400;
        color: hsl(var(--foreground));
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        line-height: 1.4;
    }
}

.file-type-col {
    font-size: 12px;
    color: hsl(var(--muted-foreground));
    white-space: nowrap;
}

.file-size-col {
    font-size: 12px;
    color: hsl(var(--muted-foreground));
    text-align: right;
    font-variant-numeric: tabular-nums;
}

.file-time-col {
    font-size: 12px;
    color: hsl(var(--muted-foreground));
    white-space: nowrap;
}

.file-actions {
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0;
    transition: opacity 0.1s;

    .file-list-item:hover & {
        opacity: 1;
    }

    .action-btn {
        width: 24px;
        height: 24px;
        padding: 0;
        border: 1px solid transparent;
        background: transparent;
        border-radius: 2px;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        color: hsl(var(--foreground));
        transition: all 0.1s;

        &:hover {
            background: rgba(0, 0, 0, 0.05);
            border-color: rgba(0, 0, 0, 0.1);
        }

        &:active {
            background: rgba(0, 0, 0, 0.1);
        }
    }
}

/* Dark theme - Windows 风格 */
.dark {
    .file-list-item {
        &:nth-child(even) {
            background: rgba(255, 255, 255, 0.02);
        }

        &:hover {
            background: rgba(255, 255, 255, 0.08) !important;
            border-color: rgba(255, 255, 255, 0.15);
        }

        &.selected {
            background: rgba(0, 120, 215, 0.25) !important;
            border-color: rgba(0, 120, 215, 0.5);
        }
    }

    .file-icon {
        // Dark theme 图标颜色调整
        &.icon-amber {
            color: #fce100;
        }

        &.icon-green {
            color: #10893e;
        }

        &.icon-red {
            color: #f7630c;
        }

        &.icon-purple {
            color: #b146c2;
        }

        &.icon-blue {
            color: #0098d4;
        }
    }

    .file-actions .action-btn {
        &:hover {
            background: rgba(255, 255, 255, 0.08);
            border-color: rgba(255, 255, 255, 0.15);
        }

        &:active {
            background: rgba(255, 255, 255, 0.12);
        }
    }
}
</style>

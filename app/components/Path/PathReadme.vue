<script lang="ts" setup>
import { join } from "path-browserify";
import axios from "axios";
import { marked } from "marked";
import "github-markdown-css/github-markdown.css";
import "highlight.js/styles/github-dark.css";

const files = useFiles();
const route = useRoute();

const md = ref("");
const path = computed(() => {
    let path = "";
    if (typeof route.params.path == "string") {
        path = route.params.path;
    } else if (typeof route.params.path === "object") {
        path = (route.params.path as string[]).join("/");
    }
    return path;
});

async function getReadme() {
    // 判断 files.fileList 是否包含 README.md
    if (files.fileList.some((file) => file.name === "README.md")) {
        let readme = join(path.value, "README.md");
        // 获取 README.md 文件内容
        const { data } = await axios.post(`/api/getFileContent`, {
            path: readme,
        });
        if (data.code == 200) {
            fetch(data.data.raw_url)
                .then((res) => res.text())
                .then((text) => {
                    md.value = text;
                });
        }
    }
}

const html = computed(() => marked(md.value));

watch(
    path,
    () => {
        getReadme();
    },
    { immediate: true }
);

onMounted(() => {
    // 将markdown-body下的 a 标签的 target 属性设置为 _blank
    nextTick(() => {
        document.querySelectorAll(".markdown-body a").forEach((item: any) => {
            item.target = "_blank";
        });
    });
});
</script>
<template>
    <div>
        <Income :key="$route.path"></Income>
        <div class="markdown-body" v-html="html"></div>
    </div>
</template>
<script lang="ts">
export default {
    name: "PathReadme",
};
</script>
<style lang="less" scoped>
:deep(.markdown-body) {
    background-color: transparent;
    min-height: auto;
    color: hsl(var(--foreground));
    padding: 0 20px;

    a {
        color: #42b883;
        text-decoration: none;

        &:hover {
            color: #33a06f;
        }
    }
}
</style>

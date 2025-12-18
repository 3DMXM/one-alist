<script lang="ts" setup>
import { Home, ChevronRight } from "lucide-vue-next";

const route = useRoute();

const routes = computed(() => {
    console.log(route.params.path);
    let path: string[] = [];
    if (typeof route.params.path == "string") {
        path = [route.params.path];
    } else if (typeof route.params.path === "object") {
        path = route.params.path;
    }
    return [
        { label: "Home", path: "/", icon: Home },
        ...path.map((item, index) => {
            return {
                label: item,
                path: "/" + path.slice(0, index + 1).join("/"),
                icon: undefined as any,
            };
        }),
    ];
});
</script>
<template>
    <Breadcrumb>
        <BreadcrumbList>
            <BreadcrumbItem v-for="(item, index) in routes" :key="item.path">
                <BreadcrumbLink
                    v-if="item.icon"
                    as-child
                    :class="{ 'font-semibold': index === routes.length - 1 }"
                >
                    <NuxtLink :to="item.path" class="flex items-center gap-2">
                        <component :is="item.icon" class="h-4 w-4" />
                        <span>{{ item.label }}</span>
                    </NuxtLink>
                </BreadcrumbLink>
                <BreadcrumbLink
                    v-else
                    as-child
                    :class="{ 'font-semibold': index === routes.length - 1 }"
                >
                    <NuxtLink :to="item.path">
                        {{ item.label }}
                    </NuxtLink>
                </BreadcrumbLink>
                <BreadcrumbSeparator v-if="index < routes.length - 1">
                    <ChevronRight class="h-4 w-4" />
                </BreadcrumbSeparator>
            </BreadcrumbItem>
        </BreadcrumbList>
    </Breadcrumb>
</template>
<script lang="ts">
export default {
    name: "PathBreadcrumbs",
};
</script>
<style lang="less" scoped></style>

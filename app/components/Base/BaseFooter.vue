<script setup lang="ts">
import { Github, Mail, Heart } from "lucide-vue-next";

const year = new Date().getFullYear();
</script>

<template>
    <footer class="modern-footer">
        <Separator class="mb-6" />
        <div class="footer-content">
            <div class="footer-info">
                <p class="footer-text mb-2">
                    <Heart
                        class="inline h-4 w-4 text-red-500 animate-pulse mr-1"
                    />
                    私有云网盘 @2020-{{ year }}
                </p>
                <p class="footer-text text-xs">
                    如果网盘中有包含侵犯您权利的内容, 请联系邮箱
                    <a href="mailto:xm@aoe.top" class="footer-link">
                        xm@aoe.top
                    </a>
                </p>
                <p class="footer-text text-xs mt-1">
                    COPYRIGHT 2020-{{ year }} WWW.AOE.TOP ALL RIGHT RESERVED
                    <a
                        href="https://beian.miit.gov.cn/"
                        target="_blank"
                        rel="noopener noreferrer"
                        class="footer-link ml-2"
                    >
                        湘ICP备2021011453号-1
                    </a>
                </p>
            </div>

            <div class="footer-actions">
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger as-child>
                            <Button
                                variant="ghost"
                                size="icon"
                                class="footer-icon-btn"
                                as-child
                            >
                                <a
                                    href="https://github.com/3DMXM/one-alist"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <Github class="h-5 w-5" />
                                </a>
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>访问 GitHub</p>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>

                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger as-child>
                            <Button
                                variant="ghost"
                                size="icon"
                                class="footer-icon-btn"
                                as-child
                            >
                                <a href="mailto:xm@aoe.top">
                                    <Mail class="h-5 w-5" />
                                </a>
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>联系我们</p>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            </div>
        </div>
    </footer>
</template>

<style scoped>
.modern-footer {
    width: 100%;
    margin-top: 3rem;
    padding: 0 1rem;
    background: transparent;
}

.footer-content {
    max-width: 80rem;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
    padding: 1.5rem 0;
}

@media (min-width: 768px) {
    .footer-content {
        flex-direction: row;
        align-items: flex-start;
    }
}

.footer-info {
    text-align: center;
}

@media (min-width: 768px) {
    .footer-info {
        text-align: left;
    }
}

.footer-text {
    font-size: 0.875rem;
    color: hsl(var(--muted-foreground));
}

.footer-link {
    color: hsl(var(--primary));
    text-decoration-line: none;
    text-underline-offset: 4px;
    transition: color 0.2s;
}

.footer-link:hover {
    color: hsl(var(--primary) / 0.8);
    text-decoration-line: underline;
}

.footer-actions {
    display: flex;
    align-items: center;
    gap: 0.5rem;
}

.footer-icon-btn {
    border-radius: 9999px;
    transition: all 0.3s;
}

.footer-icon-btn:hover {
    background: hsl(var(--accent));
    color: hsl(var(--accent-foreground));
    transform: scale(1.1);
}
</style>

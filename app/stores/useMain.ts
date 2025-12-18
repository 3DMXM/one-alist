import axios from "axios";

export const useMain = defineStore("main", {
    state: () => ({
        lazy_img: "https://mod.3dmgame.com/assets/image/lazy_img.webp",
        drawer: null as boolean | null, // 左侧菜单栏
        navUrl: [
            { title: "首页", url: "/", icon: "mdi-home", target: false },
            {
                title: "网盘",
                url: "https://pan.aoe.top",
                icon: "mdi-cloud-download-outline",
                target: true,
            },
            {
                title: "游戏",
                url: "https://game.aoe.top",
                icon: "mdi-controller",
                target: true,
            },
            {
                title: "博客",
                url: "https://blog.aoe.top",
                icon: "mdi-post-outline",
                target: true,
            },
            {
                title: "赞助",
                url: "https://cloud.aoe.top/shop",
                icon: "mdi-currency-cny",
                target: true,
            },
        ],
    }),
    actions: {
        // 格式化数字
        get_number(num?: number) {
            let numStr = "";
            if (num) {
                if (num > 9999999) {
                    numStr = Number((num / 10000000).toFixed(1)) + "kw";
                } else if (num > 9999) {
                    numStr = Number((num / 10000).toFixed(1)) + "w";
                } else if (num > 999) {
                    numStr = Number((num / 1000).toFixed(1)) + "k";
                } else {
                    numStr = num.toString();
                }
            }
            return numStr;
        },
        // 生成随机字符串
        randomString(len: number, special = false) {
            len = len || 32;
            var chars = "ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678";
            if (special) chars + "!@#$%^&*()_+-={}[]:\";'<>?,./|\\";
            var maxPos = chars.length;
            var pwd = "";
            for (let i = 0; i < len; i++) {
                pwd += chars.charAt(Math.floor(Math.random() * maxPos));
            }
            return pwd;
        },

        // 格式化大小
        formatSize(size: number) {
            if (!size) {
                return "-";
            }

            if (size < 1024) {
                return size + "B";
            } else if (size < 1024 * 1024) {
                return (size / 1024).toFixed(2) + "KB";
            } else if (size < 1024 * 1024 * 1024) {
                return (size / 1024 / 1024).toFixed(2) + "MB";
            } else {
                return (size / 1024 / 1024 / 1024).toFixed(2) + "GB";
            }
        },
        // 格式化时间
        formatTime(time: string) {
            let date = new Date(time);
            let year = date.getFullYear();
            let month = date.getMonth() + 1;
            let day = date.getDate();
            let hour = date.getHours();
            let minute = date.getMinutes();
            let second = date.getSeconds();
            return (
                year +
                "-" +
                month +
                "-" +
                day +
                " " +
                hour +
                ":" +
                minute +
                ":" +
                second
            );
        },
    },
});

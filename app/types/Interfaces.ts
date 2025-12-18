export {};

declare global {
    interface INavList {
        id: number;
        nav_title: string;
        nav_link_url: string;
        nav_target: number;
        nav_icon: string;
        nav_new: 0 | 1;
    }

    interface IFiles {
        name: string;
        size: number;
        is_dir: boolean;
        modified: string;
        created: string;
        sign: string;
        thumb: string;
        type: number;
        hashinfo: string;
        hash_info: null;
    }
}

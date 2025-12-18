import { join } from "path";
import { TokenUtils } from "../utils/TokenUtils";

export default defineEventHandler(async (event) => {
    const body = await readBody(event);
    let { path, page, per_page } = body;

    const { host, alist_token, ROOT_PATH, refreshToken } = TokenUtils;

    const filePath = join(ROOT_PATH, ...path);

    const storageKey = `fileList_${filePath.replaceAll(
        "/",
        "_"
    )}_page${page}_perpage${per_page}`;

    const data = await StorageUtils.StorageGetByKey(
        storageKey,
        async () => {
            const url = `${host}/api/fs/list`;

            const response = await fetch(url, {
                method: "POST",
                headers: {
                    Authorization: alist_token,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ path: filePath, page, per_page }),
            });
            const data = await response.json();

            if (data.code != 200) {
                console.log(`TOken 已过期`);

                const newToken = await refreshToken();
                const retryResponse = await fetch(url, {
                    method: "POST",
                    headers: {
                        Authorization: newToken,
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ path: filePath, page, per_page }),
                });
                const retryData = await retryResponse.json();
                return retryData;
            }

            return data;
        },
        StorageUtils.cacheTimeShort
    );

    return data;
});

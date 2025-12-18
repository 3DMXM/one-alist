import { join } from "path";

export default defineEventHandler(async (event) => {
    const body = await readBody(event);
    let { path } = body;

    const { host, alist_token, ROOT_PATH, refreshToken } = TokenUtils;

    path = join(ROOT_PATH, path);

    const storageKey = `fileContent_${path.replaceAll("/", "_")}`;

    const data = await StorageUtils.StorageGetByKey(storageKey, async () => {
        try {
            const url = `${host}/api/fs/get`;
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    Authorization: alist_token,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ path }),
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
                    body: JSON.stringify({ path }),
                });
                const retryData = await retryResponse.json();
                return retryData;
            }
            return data;
        } catch (error: any) {
            return undefined;
        }
    });

    return data;
});

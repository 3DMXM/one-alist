export class TokenUtils {
    public static alist_token = process.env.alist_token || "";
    public static ROOT_PATH = process.env.ROOT_PATH || "/";
    public static host = "https://alist.aoe.top";

    public static async refreshToken() {
        const url = `${TokenUtils.host}/api/auth/login`;

        const username = process.env.USERNAME;
        const password = process.env.PASSWORD;

        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ username, password }),
        });
        const data = await response.json();

        if (data.code == 200) {
            TokenUtils.alist_token = data.data.token;
        }
        return TokenUtils.alist_token;
    }
}

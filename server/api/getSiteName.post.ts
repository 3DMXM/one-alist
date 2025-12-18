export default defineEventHandler(async (event) => {
    const name = process.env.SITE_NAME || "私有云网盘";
    return { code: 200, data: name };
});

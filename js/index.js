export default {
    async fetch(request, env) {
        const url = new URL(request.url);
        const path = url.pathname.toLowerCase(); // 大文字で打たれても小文字に統一して判定する

        // /pon-design や /music-school から始まる、または完全に一致するアクセスをすべて捕まえる
        if (
            path === '/pon-design' ||
            path.startsWith('/pon-design/') ||
            path === '/music-school' ||
            path.startsWith('/music-school/')
        ) {
            // Workerの処理を完全にバイパスし、DNSに登録したConoHa WINGへ直接通信を届ける
            return fetch(request);
        }

        // それ以外（トップページやポートフォリオのCSS・画像）はPagesから返す
        return env.ASSETS.fetch(request);
    }
};
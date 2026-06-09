export default {
    async fetch(request, env) {
        const url = new URL(request.url);
        const path = url.pathname.toLowerCase();

        // 1. 特定のパス（WordPressなど）はConoHa WINGへ直接流す
        if (
            path === '/pon-design' ||
            path.startsWith('/pon-design/') ||
            path === '/music-school' ||
            path.startsWith('/music-school/')
        ) {
            return fetch(request);
        }

        // 2. robots.txtの要求には、ここで直接クリーンなテキストを返す（SEOエラー解消）
        if (path === '/robots.txt') {
            return new Response('User-agent: *\nAllow: /', {
                headers: { 'content-type': 'text/plain;charset=UTF-8' }
            });
        }

        // 3. それ以外（トップページやCSS・フォント等）をPagesから引っ張ってくる
        const pagesUrl = new URL(request.url);

        // ★ここを、あとで作成するPagesのドメイン（例: keita-portfolio.pages.dev など）に書き換えます
        pagesUrl.hostname = 'keita-portfolio.pages.dev';

        return fetch(pagesUrl.toString(), request);
    }
};
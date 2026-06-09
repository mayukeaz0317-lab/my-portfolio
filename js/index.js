export default {
    async fetch(request, env) {
        // すべてのアクセスを、余計なことをせずにそのままConoHa WING（DNSに登録されたIP）へ横流しする
        return fetch(request);
    }
};
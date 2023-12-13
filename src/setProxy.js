import {APIURL} from "./config"
const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
    app.use(
        '/ws-stomp',
        createProxyMiddleware({
            target: `${APIURL}`,  // 실제 백엔드 서버 주소
            ws: true,  // WebSocket 프록시를 활성화
            changeOrigin: true,  // 필요에 따라 변경
        })
    );
};

const express = require("express");
const httpProxy = require("http-proxy");

const app = express();
const proxy = httpProxy.createProxyServer();

// 프록시 미들웨어
app.use((req, res) => {
  // 프록시 대상 URL
  const targetUrl = "https://www.youtube.com/";

  // 요청을 대상 서버로 프록시
  proxy.web(req, res, { target: targetUrl });
});

// 에러 핸들링
proxy.on("error", (err, req, res) => {
  console.error("Proxy Error:", err);
  res.status(500).send("Proxy Error");
});

// 프록시 서버 시작
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Proxy server is running on port ${PORT}`);
});

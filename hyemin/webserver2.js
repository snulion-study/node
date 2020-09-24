const http = require("http");
//require("http") 함수는 이 애플리케이션을 위해 http모듈이 필요하다는 뜻

const hostname = "127.0.0.1";
const port = 1337;

http
  .createServer((req, res) => {
    //server라는 객체를 리턴한다
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end("Hello World\n");
  })
  .listen(port, hostname, () => {
    //server라는 객체의 listen 메서드 호출
    console.log(`Server running at http://${hostname}:${port}/`);
  });

let server = http.createServer(function (req, res) {
  res.writeHead(200, { "Content-Type": "text/plain" });
  res.end("Hello World\n");
});
server.listen(port, hostname, function () {
  console.log(`Server running at http://${hostname}:${port}/`);
});

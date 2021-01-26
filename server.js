// const fetch = require("node-fetch");

// router.get("/", (req, res) => {
//   fetch(
//     "https://www.bokjiro.go.kr/openapi/rest/gvmtWelSvc?crtiKey=qt%2BHSez0GjoTYvzN9D49cDlbHcVmSSxlKAUmIrLEqtHhnJBf6URyeHVJYuTIP13Hm148dCo3U7qu0QeSF%2FXoZw%3D%3D&callTp=L&pageNum=1&numOfRows=100&lifeArray=004&charTrgterArray=006&trgterIndvdlArray=001&desireArray=7000000"
//   )
//     .then((response) => response.json())
//     .then((json) => {
//       res.send(json);
//     })
//     .catch(() => {
//       res.send(JSON.stringify({ message: "System Error" }));
//     });
// });

var http = require("http"); // 서버 만드는 모듈 불러오기
var fs = require("fs");
var app = http.createServer(function (request, response) {
  var url = request.url;
  if (request.url == "/") {
    url = "/index.html"; // 실행할 url
  }
  if (request.url == "/favicon.ico") {
    return response.writeHead(404);
  }
  response.writeHead(200);
  response.end(fs.readFileSync(__dirname + url));
});
app.listen(8080);

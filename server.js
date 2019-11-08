var http = require("http");
var fs = require("fs");
var url = require("url");
var port = process.env.PORT || 8888;
var server = http.createServer(function(request, response) {
  var temp = url.parse(request.url, true);
  var path = temp.pathname;
  var query = temp.query;
  var method = request.method;

  /******** 从这里开始看，上面不要看 ************/

  if (path === "/") {
    // 如果用户请求的是/路径
    var string = fs.readFileSync("./index.html", "utf8");
    var amount = fs.readFileSync("./db", "utf8");
    // amount等于db内的值
    string = string.replace("&&&amount&&&", amount);
    // 将html里的&&&amount&&&替换为amount
    response.setHeader("Content-Type", "text/css; charset=utf-8");
    response.write(string);
  } else if (path === "/style.css") {
    var string = fs.readFileSync("./style.css", "utf8");
    response.setHeader("Content-Type", "text/css");
    response.write(string);
    response.end();
  } else if (path === "/main.js") {
    var string = fs.readFileSync("./style.css", "utf8");
    response.setHeader("Content-Type", "application/javascript");
    response.write(string);
    response.end();
  } else if (path === "/pay") {
    // 如果访问的路径是pay，则运行下面代码
    var amount = fs.readFileSync("./db", "utf8");
    // 读取db中的数值
    var newAmount = amount - 1;
    // 将这个数值减一
    fs.writeFileSync("./db", newAmount);
    // 再将减一之后的数值重新存储进db
    // fs.writeFileSync用法：fs.writeFileSync('路径',数值，编码(可不写))
    response.setHeader("Content-Type", "application/javascript");
    response.statusCode = 200;
    // 相应状态码为200
    response.write(`
    ${query.callback}.call(undefined,'success')
    `);
    response.end();
  } else {
    response.statusCode = 400;
    response.setHeader("Content-Type", "text/html;charset=utf-8");
    response.write("找不到对应路径，你需要自行修改 server.js");
    response.end();
  }

  /******** 代码结束，下面不要看 ************/
  console.log(menthod + "" + request.url);
});

server.listen(port);
console.log(
  "监听 " +
    port +
    " 成功\n请用在空中转体720度然后用电饭煲打开 http://localhost:" +
    port
);

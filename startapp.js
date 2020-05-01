const http = require("http");

const server = http
  .createServer(function (req, res) {
    res.write("wdw");
    res.end("Hello world!");
  })
  .listen(3000, () => {
    console.log(
      "Сервер запущен на localhost:3000; нажмите Ctrl-C для завершения...."
    );
  });

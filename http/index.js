const http = require("node:http");

const server = http.createServer((req, res) => {
  console.log({ req });
  console.log({ res });

  if (req.url === "/" && req.method === "GET") {
    return res.end("Home");
  }

  if (req.url === "/register" && req.method === "POST") {
     return res.end("Registration successfully");
   }

//   res.statusCode = 404;
//   res.end("Not Found");
});

server.listen(8080, () => {
  console.log("Server started on port 8080");
});

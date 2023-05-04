const app = require('./app')

app.listen(3000, () => {
  console.log("Server running. Use our API on port: 3000")
})


// const http = require('http');

// const server = http.createServer((req, res) => {
//     const { url } =  req;
//     console.log(url);

//     res.statusCode = 200;
//     res.setHeader("Content-Type", "text/plain");
//     res.end("Hello World\n");
// });

// server.listen(3000, () => {
//     console.log("Server running at: http://127.0.0.1:3000");
// });
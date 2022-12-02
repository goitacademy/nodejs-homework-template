const app = require('./app')

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Server running. Use our API on port: 3000")
})
.on("error", function (err) {
    process.once("SIGUSR2", function () {
      process.kill(process.pid, "SIGUSR2");
    });
    process.on("SIGINT", function () {
      // this is only called on ctrl+c, not restart
      process.kill(process.pid, "SIGINT");
    });
  });


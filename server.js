const app1 = require("./app");

const { PORT = 3000 } = process.env;

app1.listen(PORT, () => {
  console.log("Server running. Use our API on port: 3000");
});

// console.log(process.env);

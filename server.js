const app = require("./app");
const dotenv = require("dotenv");

dotenv.config({
  path:
    process.env.NODE_ENV === "development"
      ? "./envs/dev.env"
      : "./envs/prod.env",
});

console.log(process.env.NODE_ENV);

const port = process.env.PORT ?? 4000;

app.listen(port, () => {
  console.log(`Server running. Use our API on port: ${port}`);
});

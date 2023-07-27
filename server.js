const app = require("./app");

const dotenv = require("dotenv");
dotenv.config({
  path:
    process.env.NODE_ENV === "production"
      ? "./environments/production.env"
      : "./environments/development.env",
});

const port = process.env.PORT;

app.listen(port, () => {
  console.log(`Server running. Use our API on port: ${port}`);
});

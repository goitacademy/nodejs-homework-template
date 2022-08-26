const app = require("./app");

const { PORT = 3000 } = process.env;

app.listen(PORT, (err) => {
  if (err) {
    console.error("Error at server lunch: ", err);
  }
  console.log(`Server running. Use our API on port: ${PORT}`);
});

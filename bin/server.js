const app = require("../app");

const PORT = process.env.PORT || 3000;

app.listen(PORT, (err) => {
  if (err) console.error("Error at a server launch:", err);
  console.log(`Server works at port ${PORT}!`);
});

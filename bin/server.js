const app = require("../app");

const app = require("../app");
const db = require("../model/db");


const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
  console.log(`Server running. Use our API on port: ${PORT}`)
})

db.then(() => {
  app.listen(PORT, () => {
    console.log(`Server running. Use our API on port: ${PORT}`);
  });
}).catch((err) => {
  console.log(err.message);
  process.exit(1);
});
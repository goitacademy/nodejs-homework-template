<<<<<<< Updated upstream
const app = require('../app')
=======
const app = require("../app");
const db = require("../model/db");
>>>>>>> Stashed changes

const PORT = process.env.PORT || 3000

<<<<<<< Updated upstream
app.listen(PORT, () => {
  console.log(`Server running. Use our API on port: ${PORT}`)
})
=======
db.then(() => {
  app.listen(PORT, () => {
    console.log(`Server running. Use our API on port: ${PORT}`);
  });
}).catch((err) => {
  console.log(err.message);
  process.exit(1);
});
>>>>>>> Stashed changes

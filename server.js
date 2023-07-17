const mongoose = require("mongoose");

const app = require("./app");

mongoose.connect(
    "mongodb+srv://Vol4enak:4Wt8ss7xLegGvtzS@nodejs-db.peu48kx.mongodb.net/Contact-book"
  )

  .then(() => {
    app.listen(3001, () => {
      console.log("Database connection successful");
    });
  })
  .catch((err) => {
    console.log(err.message);
    process.exit(1);
  });

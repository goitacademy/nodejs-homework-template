const app = require("./app");
const { connect } = require("mongoose");

//Mongodb project password: 5jHYaWBQHrsbTiO2

console.log(process.env);

const DB_HOST =
  "mongodb+srv://OlehKozub:5jHYaWBQHrsbTiO2@cluster0.6zr4dnp.mongodb.net/contacts-db?retryWrites=true&w=majority";
connect(DB_HOST)
  .then(() =>
    app.listen(3000, () => {
      console.log("Server running. Use our API on port: 3000");
    })
  )
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });

const app = require("./app");
const { connect } = require("mongoose");

//Mongodb project password: 5jHYaWBQHrsbTiO2

connect(process.env.DB_HOST)
  .then(() =>
    app.listen(3000, () => {
      console.log("Server running. Use our API on port: 3000");
    })
  )
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });

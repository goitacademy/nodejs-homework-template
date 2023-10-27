const app = require("./app");
const { connect } = require("mongoose");

//Mongodb project password: 5jHYaWBQHrsbTiO2
const { DB_HOST, PORT = 3000 } = process.env;

connect(DB_HOST)
  .then(() =>
    app.listen(PORT, () => {
      console.log(`Server running. Use our API on port: ${PORT}`);
    })
  )
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });

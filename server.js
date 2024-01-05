const app = require("./app");
const mongoose = require("mongoose");
const { envsConfig } = require("./configs");

// mongodb + srv://Olena:3144223@cluster0.ic2uyyp.mongodb.net/?retryWrites=true&w=majority

mongoose
  .connect(envsConfig.dbHost)
  .then(() => {
    app.listen(envsConfig.port, () => {
      console.log(`Server running. Use our API on port: ${envsConfig.port}`);
    });
  })
  .catch(() => {
    console.log("Connection error");
    process.exit(1);
  });

// app.listen(3000, () => {
//   console.log("Server running. Use our API on port: 3000");
// });

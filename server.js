const mongoose = require("mongoose");
const app = require('./app')


mongoose.connect(process.env.DB_HOST).then(() => {

  app.listen(process.env.PORT, () => {
    console.log("Database connection successful")
  });

})
  .catch((err) => {

  console.log(err.message);
    process.exit(1);
    
})

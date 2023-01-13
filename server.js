const app = require('./app')
const mongoose = require('mongoose');
const { required } = require('joi');
const{Db_HOST}=required("./config")
mongoose.connect(Db_HOST)
  .then(() =>
    app.listen(3000, () => console.log(`Database connection successful on PORT :3000`))
  )
.catch((error) => {
    console.log(error.message);
    process.exit(1);
  });

// app.listen(3000, () => {
//   console.log("Server running. Use our API on port: 3000")
// })

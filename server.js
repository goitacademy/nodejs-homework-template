const mongoose = require('mongoose');
const app = require('./app');


const DB_HOST = "mongodb+srv://contacts-dev:2XckrelecQrpKvk5@cluster0.hcshvkb.mongodb.net/?retryWrites=true&w=majority";


mongoose.set("strictQuery", true);
mongoose.connect(DB_HOST)
  .then(() => {
    app.listen(3000);
    console.log("Server running. Use our API on port: 3000");
  })
  .catch(error => console.log(error.message));

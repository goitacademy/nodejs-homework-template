const mongoose = require("mongoose"); 
const app = require('./app');

require('dotenv').config();
const PORT = process.env.PORT;
const MONGO_URL = process.env.MONGO_URL;

mongoose.set("strictQuery", true);

const start = async () => {
  mongoose.connect(MONGO_URL,)
  .then(() => {
    console.log('Database connection successful');
    app.listen(PORT, (err) => {  
      err ? console.log("Error at server launch", err) :
      console.log("Server running. Use our API on port: 3000");
    }
);    
  })

};

start();
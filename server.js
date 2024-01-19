const app = require('./app')
const mongoose = require("mongoose");
const DB_HOST = "mongodb+srv://jackm:6UpkeCkVjpzWmBdA@cluster0.p9x2mdu.mongodb.net/?retryWrites=true&w=majority";


//6UpkeCkVjpzWmBdA
console.log(process.env.DB_HOST);
 mongoose
  .connect(process.env.DB_HOST)
  .then(() => {
 
    app.listen(3000, () => {
      console.log("Server running. Use our API on port: 3000");
    });
  })
  .catch(() => {
   
    console.log("Connection error");
    process.exit(1);
  });
  
  


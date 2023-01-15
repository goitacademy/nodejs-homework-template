require("dotenv").config();
const {app }= require("./src/app");
const { connectMongo } = require("./src/db/connection");

const PORT = process.env.PORT || 3000;

async function start() {
  try {
   connectMongo();
    
    app.listen(PORT, () => {
      console.log(`Server is listening on port ${PORT}`);
    });

  } catch (error) {
    console.error("Error at server launch", error.message);
  }
 }
 
start();
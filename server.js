import mongoose from "mongoose";
import app from "./app.js";

const { DB_HOST, PORT = 3000 } = process.env;

mongoose.set('strictQuery', true);

mongoose.connect(DB_HOST)
  .then(() => { 
    app.listen(PORT, () => { 
      console.log(`Database connection successful. Use our API on port: ${PORT}`);
		});
	})
	.catch(error => {
    console.log(`Server not running. Error message: ${error.message}`);
    process.exit(1);
	});

// import dotenv from "dotenv";

// import process from "node:process";

// process.on("exit", code => {
//   console.log(`About to exit with code: ${code}`);
// });

// dotenv.config()






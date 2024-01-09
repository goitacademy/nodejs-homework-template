<<<<<<< Updated upstream
import mongoose from "mongoose";
import app from "./app.js";

// k5T8sJWmjDh7EMvo
const { DB_HOST, PORT = 3000 } = process.env;

mongoose
  .connect(DB_HOST)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running.Use our API on port:${PORT}`);
    });
  })
  .catch(error => {
    console.log(error.message);
    process.exit(1);
  });

=======
import mongoose from 'mongoose';

const app = require('./app')
// Db60e2sXCl6BZZpZ
app.listen(3000, () => {
  console.log("Server running. Use our API on port: 3000")
})
>>>>>>> Stashed changes

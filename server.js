import mongoose from "mongoose";
import app from "./app.js";

const PORT = process.env.PORT || 3001;
const { DB_HOST } = process.env;

mongoose.connect(DB_HOST, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Database connection successful. Server running on ${PORT} PORT`);
    });
  })
  .catch((error) => {
    console.error('Error connecting to the database:', error);
    process.exit(1);
  });


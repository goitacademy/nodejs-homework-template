import mongoose from 'mongoose';

import { app } from "./app.js"

const { DB_HOST, PORT = 3000} = process.env;

mongoose.connect(DB_HOST)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running. Use our API on port: ${PORT}`)
    })
  })
  .catch(err => {
    console.log(err.message);
    process.exit(1)
  })



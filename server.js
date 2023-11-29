import mongoose from 'mongoose';

import { app } from "./app.js"

const DB_HOST = 'mongodb+srv://Sasha-hw-03:DtvxG9E9wHJLzJX8@cluster0.tsifo9g.mongodb.net/my-contacts?retryWrites=true&w=majority'
// DtvxG9E9wHJLzJX8
mongoose.connect(DB_HOST)
  .then(() => {
    app.listen(3000, () => {
      console.log("Server running. Use our API on port: 3000")
    })
  })
  .catch(err => {
    console.log(err.message);
    process.exit(1)
  })



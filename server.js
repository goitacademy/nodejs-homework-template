
import mongoose from 'mongoose'

import app  from './app.js'

const DB_HOST = "mongodb+srv://Valentun:qWLtn4MZ0fW5j9Kn@cluster0.x2miff7.mongodb.net/db-contacts?retryWrites=true&w=majority"

mongoose.connect(DB_HOST).then(()=>
{
  app.listen(3000, () => {
    console.log("Server running. Use our API on port: 3000")
  })

}
).catch((err)=>{
  console.log(err.message);
  process.exit(1)
})


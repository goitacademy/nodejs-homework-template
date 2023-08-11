import mongoose from 'mongoose';

import app from './app.js'

const DB_HOST="mongodb+srv://Orest:1sky1TK2wxvtBDmp@atlascluster.cuopqrv.mongodb.net/db-contact?retryWrites=true&w=majority"

mongoose.connect(DB_HOST)
  .then(() => {
  app.listen(3000, () => {
  console.log("Server running. Use our API on port: 3000")
})
  })
.catch(error=> console.log(error.message))


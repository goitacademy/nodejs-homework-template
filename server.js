const mongoose = require('mongoose')
const app = require('./app')



mongoose.connect(process.env.DB_URL)
  .then(() => app.listen(3000), console.log("Database connection successful"))
  .catch(err => { 
    err.message,
    process.exit(1)
  })



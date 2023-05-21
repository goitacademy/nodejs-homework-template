const app = require('./app')
const mongoose = require('mongoose')

const DB_HOST='mongodb+srv://anton:S1PtLmtSUtE3n7NU@cluster0.edy05dy.mongodb.net/my_contacts?retryWrites=true&w=majority'
mongoose.connect(DB_HOST).then(() => {

  app.listen(3000, ()=>{console.log("Database connection successful")}) 
}
).catch(error=>{
  console.log(error.message);
  process.exit(1)
})

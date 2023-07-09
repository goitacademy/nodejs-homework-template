const app = require('./app')
const mongoose = require("mongoose")
const dbHost = 'mongodb+srv://oleg:zhuk2012@cluster0.ojamrqw.mongodb.net/contacts_reader?retryWrites=true&w=majority'
mongoose.set('strictQuery', true)


mongoose.connect(dbHost)
.then(()=>{
  console.log("Database connection successful")
})
.catch(error=>{
  console.log(error.message);
  process.exit(1)
})


app.listen(3000, () => {
  console.log("Server running. Use our API on port: 3000")
})

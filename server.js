import  app  from './app.js'
import mongoose from 'mongoose'

// C2NIe0XGgd7KxQbS

const {DB_HOST, PORT} = process.env

// const DB_HOST = 'mongodb+srv://Eugeniy:C2NIe0XGgd7KxQbS@cluster0.xcfwnfo.mongodb.net/db-contacts?retryWrites=true&w=majority'
mongoose.connect(DB_HOST)
.then(() => {app.listen(3000, () => {
  console.log(`Server running. Use our API on port: ${PORT}`)
})
})
.catch((err)=> {
console.log(err.message);
process.exit(1);
})


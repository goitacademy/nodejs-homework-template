
const mongoose = require("mongoose");
const app = require('./app')


const DB_HOST = "mongodb+srv://Anna1:KcEqXC5zx2tzbF3T@cluster0.mippplm.mongodb.net/contacts_reader?retryWrites=true&w=majority"

mongoose.connect(DB_HOST)
.then(()=>app.listen(3000))
.catch(error => console.log(error.message));

// require("dotenv").config();
// const PORT = process.env.PORT || 3000;
// app.listen(PORT , () => {
//   console.log(`Server running. Use our API on port: ${PORT}`)
// })

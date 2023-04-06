const mongoose = require('mongoose');

const app = require('./app')
const DB_HOST = "mongodb+srv://Artem:FGCMRJhY0Omj8qG0@cluster0.1uz7aty.mongodb.net/contacts_directory?retryWrites=true&w=majority"
mongoose.connect(DB_HOST)
  .then(()=>app.listen(3000, () => {
  console.log("Server running. Use our API on port: 3000")
  }))
.catch(error=>console.log(error.message))
// Artem  - логин
// FGCMRJhY0Omj8qG0  - пароль


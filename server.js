const mongoose = require("mongoose")

const app = require('./app')

const DB_HOST = "mongodb+srv://nfedoriv:KIPX3CCtzHGanx5u@cluster0.wqtq2lb.mongodb.net/contacts_reader?retryWrites=true&w=majority"

mongoose.connect(DB_HOST)
.then(()=> app.listen(3000))
  .catch(error => {
    console.log(error.message);
    process.exit(1);
  })

// app.listen(3000, () => {
//   console.log("Server running. Use our API on port: 3000")
// })

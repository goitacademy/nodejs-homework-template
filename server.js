const app = require('./app')
const mongoose = require('mongoose');
const start = () => {
  app.listen(3000, () => {
  console.log("Server running. Use our API on port: 3000")
})

mongoose.connect('mongodb+srv://kirilpolozhenets:1@mycluster.3zkaon9.mongodb.net/')
    .then(()=>console.log("DB connected"))
    .catch((err)=>console.log('DB connection ERROR',err));
}

start();


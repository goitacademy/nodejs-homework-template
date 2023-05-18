const app = require('./app')
const mongoose = require('mongoose')
const connectToBase = 'mongodb+srv://mazurfacker:UKl39FTb9topkEUl@mazurfacker.awka0v2.mongodb.net/contacts?retryWrites=true&w=majority'
mongoose.connect(connectToBase)
  .then(() => {
  app.listen(3000)
  }).catch(err => {
    console.log(err.message)
    process.exit(1)
})


// UKl39FTb9topkEUlnpm i mongoose
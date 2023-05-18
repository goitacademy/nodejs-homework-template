const app = require('./app')
const mongoose = require('mongoose')
const {conectToBase } = process.env
mongoose.connect(conectToBase)
  .then(() => {
  app.listen(3000)
  }).catch(err => {
    console.log(err.message)
    process.exit(1)
})


// UKl39FTb9topkEUlnpm i mongoose
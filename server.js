require('dotenv').config();

const getConection = require('./mongoose/mongoose')
const app = require('./app')




app.listen(4005, async() => {
  await getConection()
  console.log("Server running. Use our API on port: 4005")
})

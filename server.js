require('dotenv').config();
const PORT =process.env.PORT
const getConection = require('./mongoose/mongoose')
const app = require('./app')



app.listen(PORT, async() => {
  await getConection()
  console.log("Server running. Use our API on port: 4042")
})

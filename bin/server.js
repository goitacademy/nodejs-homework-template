const app = require("../app")
const mongoose = require("mongoose")
require("dotenv").config()

const { DB_HOST, PORT = 3000 } = process.env
mongoose
  .connect(DB_HOST, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(async () =>
    app.listen(PORT, () => {
      console.log(`Server running. Use our API on port: ${PORT}`)
    })
  )
  .catch((error) => console.log(error))

// const PORT = process.env.PORT || 3000

// app.listen(PORT, () => {
//   console.log(`Server running. Use our API on port: ${PORT}`)
// })

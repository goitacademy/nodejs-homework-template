const app = require('../app')
const mongoose = require("mongoose")
const PORT = process.env.PORT || 3000
const DB_URL = "mongodb+srv://root:root@cluster0.2jy6m.mongodb.net/db_contacts?retryWrites=true&w=majority"

async function startApp() {
  try {
    await mongoose.connect(DB_URL, { useUnifiedTopology: true, useNewUrlParser: true })
    console.log("Database connection successful");
    app.listen(PORT, () => {
      console.log(`Server running. Use our API on port: ${PORT}`)
    })
  } catch (e) {
    console.log(e);
    process.exit(1)
  }
}

startApp()


const app = require('./app')
require('dotenv').config();

app.listen(3000, () => {
  console.log("Server running. Use our API on port: 3000")
})

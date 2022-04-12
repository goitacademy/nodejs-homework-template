const app = require('./app')
const db = require('./models/db')
db.then((result) => {
  console.log('Connection to DB')
app.listen(3000, () => {
  console.log("Server running. Use our API on port: 3000")
})
}).catch(console.error)

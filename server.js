const app = require('./app')
const PORT = process.env.PORT || 3000;
console.log(PORT)
app.listen(3000, () => {
  console.log("Server running. Use our API on port: 3000")
})

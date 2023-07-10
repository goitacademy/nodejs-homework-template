const app = require('./app')

app.listen(process.env.PORT, () => {
  console.log("Server running. Use our API on port: 3000")
})

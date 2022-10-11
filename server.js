const app = require('./app')

const PORT = 8080;

app.listen(PORT, (error) => {
  if (error) console.error(error.message);
  else console.log(`http://localhost:${PORT}/\nServer running. Use our API on port: ${PORT}`)
})

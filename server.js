const app = require('./src/app')

//  прописываем имя действующего порта
app.listen(3000, () => {
  console.log("Server running. Use our API on port: 3000")
})

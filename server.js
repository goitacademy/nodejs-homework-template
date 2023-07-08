const app = require('./app')

// const PORT = 5003
// app.listen(PORT, ()=>{
//   console.log("Server running. Good job!!! Use our API on port: 5000")
// })

app.listen(3003, () => {
  console.log("Server running. Good job! Use our API on port: 3000")
}) 

console.log(__dirname)
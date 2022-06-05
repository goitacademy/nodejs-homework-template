const app = require('./app')
const {connectMango}=require('./db/connection')
const {errorHandler}=require('./helpers/apiHelpers')
app.use(errorHandler)

const start =async()=>{
  await connectMango()
 app.listen(3000, () => {
    console.log("Server running. Use our API on port: 3000")
  })
}
start();
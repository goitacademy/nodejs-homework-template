const app = require('./app')
const mongoose = require('mongoose');
require('dotenv').config()


const {DB_HOST:urlDb}=process.env
const connection = mongoose.connect(urlDb)

// connection.then(()=>{
//   console.log('DB connected!')
// }).catch((err)=>{
//   console.log(err)
//   process.exit(1)
// })

const startServer = async ()=>{
  try{
    await connection
    app.listen(3000, () => {
      console.log("Server running. Use our API on port: 3000")
    })
    console.log('DB connected!')
  }catch(err){
    console.log(err)
    process.exit(1)
  }
}




startServer()


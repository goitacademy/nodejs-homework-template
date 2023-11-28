require("dotenv").config()

const mongoose = require("mongoose")
 
const app = require('./app')

const DB_HOST = process.env["DB_HOST"]

console.log(process.env["DB_HOST"])

// console.log(process.env)

// const client = new MongoClient(DB_HOST)

// async function run() {  
//   try {
//     await client.connect()
//     const contacts_reader = client.db("contacts_reader")
//     const collections = await contacts_reader.listCollections().toArray()
//     console.log(collections)
//   } catch (error) { 
//     console.log(error)
//   } finally {
//     await client.close()
//   }
// }

// run().catch()

mongoose.connect(DB_HOST)
  .then(() => {
    app.listen(3000, () => {
      console.log("Server running. Use our API on port: 3000")
    })
    console.log('success')
  })
  .catch(error =>{
    console.log(error.message)
    process.exit(1)
  })
  // .finally(() => { mongoose.disconnect() })
  
// const {MongoClient} = require("mongodb")

// const app = require('./app')

// const DB_HOST = "mongodb+srv://Denis:R$$Xr$2P*AkrfU4@cluster0.oaexovo.mongodb.net/contacts_reader?retryWrites=true&w=majority"

// const client = new MongoClient(DB_HOST)

// async function run() {  
//   try {
//     await client.connect()
//     const contacts_reader = client.db("contacts_reader")
//     const collections = await contacts_reader.listCollections().toArray()
//     console.log(collections)
//   } catch (error) { 
//     console.log(error)
//   } finally {
//     await client.close()
//   }
// }

// run().catch()

// // mongoose.connect(DB_HOST)
// //   .then(() => {
//     app.listen(3000, () => {
//       console.log("Server running. Use our API on port: 3000")
//     })
//   // })
//   // .catch(error =>{
//   //   console.log(error.message)
//   //   process.exit(1)
//   // })

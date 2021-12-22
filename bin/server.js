import app from '../app'
// import connectMongo from '../db/connection'

const PORT = process.env.PORT || 3000

// const start = async () => {
//   await connectMongo()
//   // const contacts = await dbContacts.find({}).toArray()
//   // console.log(contacts)

app.listen(PORT, () => {
  console.log(`Server running. Use our API on port: ${PORT}`)
})
// }

// start()

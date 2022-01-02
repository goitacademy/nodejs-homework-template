import pkg from 'mongoose'
const { connect, connection } = pkg

// const uri = process.env.URI_DB
const uri = "mongodb+srv://olehs_user:54321user12345@cluster0.tx26z.mongodb.net/phonebook"
console.log(process.env.URI_DB)

const db = connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

connection.on('connected', () => {
  console.log("Database connection successful")
})

connection.on('err', (err) => {
  console.log(`Connection error: ${err.message}`)
})

connection.on('disconnected', () => {
  console.log('Disconnected from Database')
})

process.on('SIGINT', async () => {
  connection.close()
  console.log('Connection Database closed')
  process.exit(1)
})

export default db
const app = require('./app')
const mogoose = require ('mongoose')

const DB_HOST = "mongodb+srv://Anna:A2X2Qc1MCAYBW0U0@cluster0.ah1cs3o.mongodb.net/contacts_reader?retryWrites=true&w=majority";

mogoose.set('strictQuery', true)

mogoose.connect(DB_HOST)
 .then(() => {
  app.listen(3000)
 })
 .catch(error => {
  console.log(error.message);
  process.exit(1);
 })

app.listen(3000, () => {
  console.log("Server running. Use our API on port: 3000")
})

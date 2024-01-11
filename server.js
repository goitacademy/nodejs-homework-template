const app = require('./app')
const { listContacts, getContactById } = require('./models/contacts')

app.listen(3000, () => {
  console.log("Server running. Use our API on port: 3000")
})

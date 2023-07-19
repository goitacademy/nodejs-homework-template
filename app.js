const express = require('express')
const logger = require('morgan')
const cors = require('cors')
const contactsRouter = require('./routes/api/contacts')

const app = express()

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short'

app.use(logger(formatsLogger))
app.use(cors())
app.use(express.json())

app.use('/api/contacts', contactsRouter)

app.use((req, res) => {
  res.status(404).json({ message: 'Not found' })
})

app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({message,})
})


module.exports = app

















// // const contactsFunction = require("./models/contacts")

// const contacts = require("./models/contacts.json")

 
// app.get("/models/contacts", (req, res) => {
//   // res.send(contacts);
//   res.status(200).json(contacts);
//  });
// app.get("/contacts", (request, response) => {
//    response.send("<h2>Contact my my my<h2/>")
  
// })
// app.get("/models/api/contacts", async (req, res) => {
//   const allContacts = await contactsFunction.listContacts();
//   res.status(200).json(allContacts);
// });
// app.get("/models/api/contacts/:id", async (req, res) => {
//   const { id } = req.params;
//   const contactID = await contactsFunction.getContactById(id);
//   contactID ? res.status(200).json(contactID) : res.status(404).json({ message: 'Not found id' })
// });
// app.post("/models/api/contacts/", async (req, res) => {
//   const { name, email, phone } = req.body;
//   const newContact = await contactsFunction.addContact( { name, email, phone });
//   newContact ? res.status(201).json(newContact) : res.status(400).json({ message: '"message": "missing required name field"' })
// });
// app.delete("/models/api/contacts/:id", async (req, res) => {
//   const { id } = req.params;
//   const contactID = await contactsFunction.removeContact(id);
//   contactID ? res.status(200).json({"message": "contact deleted"}) : res.status(404).json({ message: 'Not found' })
// });
// app.put("/models/api/contacts/:id", async (req, res) => {
//   const { id } = req.params;
//   const { name, email, phone } = req.body;
//   const contactID = await contactsFunction.updateContact(id, {name, email, phone});
//   contactID ? res.status(200).json({"message": "contact updated"}) : res.status(404).json({ message: 'Not found' })
// });
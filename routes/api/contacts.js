const express = require('express')
const router = express.Router()
const fs = require('fs/promises')
const path = require("path");
const contactsPath = path.join(__dirname, "/models/contacts.json");
const contacts = JSON.parse(fs.readFile(contactsPath, "utf8"))
const allContactsFunc = require('/models/contacts')
// const contacts = 
//     fs.readFileSync('./db/contacts.json', { encoding: 'utf-8' }),
// );

router.get('/', async (req, res, next) => {
  const contactsList = contacts.listContacts();
  res.json({
    status: 'success',
    code: 200,
    data: {
      contactsList,
    },
  });
  
})

router.get('/:contactId', async (req, res, next) => {
const { contactId } = req.params;
  const contactById = allContactsFunc.getContactById(contactId)
  if (getId) {
    return res.json({
    status: 'success',
    code: 200,
    data: { contactById },
    })
  }
   else {
     res.status(401).json({
    status: "Not found",
    code: 401,
  }); 
    }
})

router.post('/', async (req, res, next) => {
  const { name, email, phone } = req.body;
  const addContact = allContactsFunc.addContact(body)
  if (!name || !email || !phone) {
    return res.status(400).json({
    status:  "missing required name field",
    code: 400,
  }); 
  }
  else {
    return res.status(201).json({
    status: 'success',
      code: 201,
    data: { addContact },
  }); 
  }
})

router.delete('/:contactId', async (req, res, next) => {
  const { contactId } = req.params;
  const removeContact = allContactsFunc.removeContactById(contactId);
  
  if (deleteId) {
    return res.json({
    status: 'success',
    code: 200,
    data: { removeContact },
    })
  }
   else {
     res.status(401).json({
    status: "Not found",
    code: 401,
  }); 
    }

})

router.put('/:contactId', async (req, res, next) => {
  const { contactId } = req.params;
  const { name, email, phone } = req.body;
  const update = allContactsFunc.updateContact(contactId);
  if (!update) {
  return res.status(404).json({
            message: ERROR_MESSAGES.NOT_FOUND,
        });
}
if (!name || !email || !phone) {
    return res.status(400).json({
      status: { "message": "Not found" },
    code: 400,
  }); 
  }
  else {
    return res.status(201).json({
    status: 'success',
      code: 201,
    data: { update },
  }); 
  }
   
})

module.exports = router

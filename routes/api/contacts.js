const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact
} = require("../../controllers/contactController");

const express = require('express');
const router = express.Router();


router.get("/", listContacts);  
router.get("/:contactId", getContactById);
router.post("/", addContact);
router.delete("/:contactId", removeContact);
router.put("/:contactId",updateContact);

module.exports = router;













// const express = require('express')
// const router = express.Router()

// const {listContacts, getContactById,removeContact, addContact, updateContact} = require('../../models/contacts');

// //Buscar todos los contactos
// router.get('/', async (req, res, next) => {
//   const allContacts = await listContacts();
//   res.json(allContacts)
// })

// //Buscar contacto por id
// router.get('/:contactId', async (req, res, next) => {
//   const id = req.params.contactId
//   const findContact = await getContactById(id);
//   if (!findContact){
//     return res.status(404).json({ message: "Not found" });
//   }
//   res.json(findContact)
// })

// //Adicionar contacto
// router.post('/', async (req, res, next) => {
//   const newContact = await addContact(req.body);
//   res.status(201).json(newContact);
// })

// //Borrar contacto por id
// router.delete('/:contactId', async (req, res, next) => {
//   const id = req.params.contactId
//   const deleteContact = await removeContact(id);
//   res.json(deleteContact)
// })

// //Actualizar contacto por id
// router.put('/:contactId', async (req, res, next) => {
//   const id = req.params.contactId;
//   const newContact = await updateContact(id, req.body);
//   res.json(newContact)
// })

// module.exports = router

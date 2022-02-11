const express = require("express");
const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} = require("../../models/contacts");

const {
  addContactValid,
  validatePatch,
} = require("../../middlewares/validationMiddleware");

const router = express.Router();

router.get("/", async (req, res, next) =>{
const contacts = await listContacts()
if(!contacts) {
 return res.status(404).json({ message: "contacts not found" })}
res.status(200).json({contacts})
});

router.get("/:contactId", async (req, res, next) =>{
const id = req.params.contactId
const contacts = await getContactById(id)
if(!contacts.length) {
  return res.status(404).json({ message: "not found" })}
res.status(200).json({contacts})
});

router.delete("/:contactId", async (req, res, next) => {
  const id = req.params.contactId
  const contacts = await removeContact(id)
  if(!contacts.length) 
  {
  return  res.json({ message: "Not found" });
  }
  res.status(200).json({ message: "contact deleted" })
})


router.post("/", addContactValid, 
addContact
//  async (req, res, next) => {
//   const { name, email, phone } = req.body;
//   const newContact = await addContact()
//   if( name && email && phone) {
//     return res.json({ newContact});
//   }
//   res.status(400).json({ message: "missing required name field" })}
  
);

router.put("/:contactId", validatePatch, updateContact);

module.exports = router;

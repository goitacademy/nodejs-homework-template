const express = require("express");
const router = express.Router()
const contactsController = require('../../controller/contacts')

router.get("/", contactsController.get);

router.get("/:contactId", contactsController.getById);

router.post("/", contactsController.add);

router.delete("/:contactId", contactsController.remove);

router.put("/:contactId", contactsController.updateContact);

router.patch("/:contactId/favorite", contactsController.updateFavorite);

// router.get("/:contactId", async (req, res, next) => {
//   const {contactId} = req.params;
//   await getContactById(contactId).then(contact =>
//     res.json(contact)
//   ).catch(error => console.log(error.message))
// });

// router.post("/", async (req, res, next) => {
//   const body = schema.validate(req.body);
//   if(body.error) {
//     res.json({message: body.error.message, status: "error", code: 400})
//   } else {
//   await addContact(body).then(contact => 
//     res.json(contact)
//   ).catch(error => console.log(error.message))}
// });

// router.delete("/:contactId", async (req, res, next) => {
//   const { contactId } = req.params;
//   await removeContact(contactId).then(
//     message => res.json(message)
//   ).catch(error => console.log(error.message))
// });

// router.put("/:contactId", async (req, res, next) => {
//   const { contactId } = req.params;
//   const body = schema.validate(req.body);
//   if(body.error) {
//     res.json({message: body.error.message, status: "error", code: 400})
//   } else {
//   await updateContact(contactId, body.value).then(contact => 
//     res.json(contact)
//   ).catch(error => console.log(error.message))}
// });

module.exports = router;

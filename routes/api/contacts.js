const express = require("express");
const ContactControllers = require("../../controllers/contact");
const router = express.Router();
const jsonParser = express.json()
// const Joi = require("joi");


// const {
//   listContacts,
//   getContactById,
//   removeContact,
//   addContact,
//   updateContact,
// } = require("../../models/contacts");

// const contactSchema = Joi.object({
//   name: Joi.string().required(),
//   email: Joi.string().email().required(),
//   phone: Joi.string().required(),
// });

router.get("/", ContactControllers.getContacts);

router.get("/:contactId", ContactControllers.getContact);


// => {
//   const contact = await getContactById(req.params.contactId);
//   if (!contact) {
//     return res.status(404).json({ message: "Not found" });
//   }
//   res.json(contact);
// });


router.post("/", jsonParser, ContactControllers.createContact)
// router.post("/", async (req, res, next) => {
//   const { error } = contactSchema.validate(req.body);
//   if (error) {
//     return res
//       .status(400)
//       .json({ message: "Validation error", details: error.details });
//   }
//   const newContact = await addContact(req.body);
//   res.status(201).json(newContact);
// });


router.delete("/:contactId", ContactControllers.deleteContact)
// router.delete("/:contactId", async (req, res, next) => {
//   const result = await removeContact(req.params.contactId);
//   if (!result) {
//     return res.status(404).json({ message: "Not found" });
//   }
//   res.json({ message: "Contact deleted" });
// });


router.put("/:contactId", jsonParser, ContactControllers.updateContact)
// router.put("/:contactId", async (req, res, next) => {
//   const { error } = contactSchema.validate(req.body);
//   if (error) {
//     return res
//       .status(400)
//       .json({ message: "Validation error", details: error.details });
//   }

//   const updatedContact = await updateContact(req.params.contactId, req.body);
//   if (!updatedContact) {
//     return res.status(404).json({ message: "Not found" });
//   }
//   res.json(updatedContact);
// });

router.patch('/:contactId/favorite', ContactControllers.updateStatusContact)

module.exports = router;

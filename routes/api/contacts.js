const express = require("express");
const router = express.Router();
const ctrlContact = require("../../controller/contacts");

router.get("/", ctrlContact.get);

router.get("/:id", ctrlContact.getById);

router.post("/", ctrlContact.create);

router.put("/:id", ctrlContact.update);

router.patch("/:id/status", ctrlContact.updateFavorite);

// router.delete("/:id", ctrlContact.remove);

// router.get("/", async (req, res, next) => {
//   try {
//     const contactsList = await listContacts();
//     res.json({ status: "success", code: 200, data: contactsList });
//   } catch (error) {
//     next(error);
//   }
// });

// router.get("/:contactId", async (req, res, next) => {
//   try {
//     const contactId = req.params.contactId;
//     const contact = await getContactById(contactId);

//     if (contact.length > 0) {
//       res.json({ status: "success", code: 200, data: contact });
//     } else {
//       res.status(404).json({
//         status: `Contact ${req.params.contactId} not found`,
//         code: 404,
//       });
//     }
//   } catch (error) {
//     next(error);
//   }
// });

// router.post("/", async (req, res, next) => {
//   const { name, email, phone } = req.body;
//   try {
//     const { error } = schema.validate({ name, email, phone });

//     if (!error) {
//       await addContact(req.body);
//       res.json({ status: "success", code: 201, data: "Contact added" });
//     } else {
//       res.status(400).json({
//         status: error.details,
//         code: 400,
//       });
//     }
//   } catch (error) {
//     next(error);
//   }
// });

// router.delete("/:contactId", async (req, res, next) => {
//   const contactId = req.params.contactId;
//   try {
//     const isRemoved = await removeContact(contactId);
//     console.log(isRemoved);
//     if (isRemoved) {
//       res.json({
//         message: `Contact with ID ${req.params.contactId} was succesfully removed`,
//       });
//     } else {
//       res.status(404).json({
//         status: "Not found",
//         code: 400,
//       });
//     }
//   } catch (error) {
//     next(error);
//   }
// });

// router.put("/:contactId", async (req, res, next) => {
//   const { name, email, phone } = req.body;

//   try {
//     const { error } = schema.validate({ name, email, phone });
//     if (!error) {
//       await updateContact(req.params.contactId, req.body);
//       res.json({
//         message: `Contact with ID ${req.params.contactId} was succesfully updated`,
//       });
//     } else {
//       res.status(400).json({
//         status: error.details,
//         code: 400,
//       });
//     }
//   } catch (error) {
//     next(error);
//   }
// });

module.exports = router;

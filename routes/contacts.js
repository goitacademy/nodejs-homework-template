const express = require("express");
const router = express.Router();
const contactsController = require("../controllers/contactsController");

router.get("/", async (req, res, next) => {
  res.render("index", { description: "Please use the following path to manage contacts: /api/contacts" });
});

router.get("/api/contacts/", contactsController.listContacts);

router.get("/api/contacts/:contactId", contactsController.getContactById);

router.delete("/api/contacts/:contactId", contactsController.removeContact);

router.post("/api/contacts/", contactsController.addContact);

router.put("/api/contacts/:contactId", contactsController.updateContact);

// -------------------------testing---------------------------
// router.get("/:contactId/:nextId/:lastId", async (req, res, next) => {
//   res.json({
//     contactId: ` Ты ввёл -  ${req.params.contactId}`,
//     nextId: ` Ты ввёл - ${req.params.nextId}`,
//     lastId: ` Ты ввёл -  ${req.params.lastId}`,
//   });
// });
// -----------------------------------------------------------

module.exports = router;

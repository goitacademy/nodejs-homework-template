/* ----------------- ROUTING ------------------- */

const express = require("express");
const router = express.Router();
const contactsController = require("../controllers/");

router.get("/", async (req, res, next) => {
  res.render("index", { description: "Please use the following path to manage contacts: /api/contacts" });
});

const subDomain = "/api/contacts/";
router.get(subDomain, contactsController.listContacts);

router.get(`${subDomain}:contactId`, contactsController.getContactById);

router.delete(`${subDomain}:contactId`, contactsController.removeContact);

router.post(`${subDomain}`, contactsController.addContact);

router.put(`${subDomain}:contactId`, contactsController.updateContact);

router.patch(`${subDomain}:contactId/favorite`, contactsController.updateFavoriteContact);

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

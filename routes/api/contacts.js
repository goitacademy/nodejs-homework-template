const express = require("express");

const contactsService = require("../../models/contacts");
const contactsControllers = require("../../controllers/contacts");
const { validateBody } = require("../../decorators");
const { contactsSchema } = require("../../validators");

const router = express.Router();

router.get("/", async (req, res, next) => {
  const data = await contactsService.listContacts();
  res.json(data);
});
router.post(
  "/",
  validateBody(contactsSchema.createContactsSchema),
  contactsControllers.addContact
);

router.get("/:id", contactsControllers.getContactById);
router.delete("/:id", contactsControllers.removeContact);
router.put(
  "/:id",
  validateBody(contactsSchema.createContactsSchema),
  contactsControllers.updateContact
);

module.exports = router;

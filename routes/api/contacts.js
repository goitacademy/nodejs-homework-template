const express = require("express");
const router = express.Router();
const {
  listContacts,
  getContactById,
  addContact,
  updateContact,
  removeContact,
} = require("../../controllers/contacts");
const {
  contactSchema,
  updateContactSchema,
} = require("../../helpers/validation");

router.get("/", listContacts);
router.get("/:id", getContactById);

router.post(
  "/",
  (req, res, next) => {
    const { body } = req;
    const { error } = contactSchema.validate(body);
    if (error) {
      res.status(400).json({ message: error.details[0].message });
    } else {
      next();
    }
  },
  addContact
);

router.put(
  "/:id",
  (req, res, next) => {
    const { body } = req;
    const { error } = updateContactSchema.validate(body);
    if (error) {
      res.status(400).json({ message: error.details[0].message });
    } else {
      next();
    }
  },
  updateContact
);

router.delete("/:id", removeContact);

module.exports = router;

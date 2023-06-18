const express = require("express");
const {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContacts,
  updateStatusContact,
} = require("../../models/contacts");

const {
  validateId,
  validator,
  favoriteValidate,
} = require("../../utils/validator");

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const contacts = await listContacts();
    res.json(contacts);
  } catch (error) {
    next(error);
  }
});

router.get("/:contactId", validateId, async (req, res, next) => {
  try {
    const contact = await getContactById(req.params.contactId);
    res.json(contact);
  } catch (error) {
    next(error);
  }
});

router.post("/", validator, async (req, res, next) => {
  try {
    const newContact = await addContact(req.body);
    res.json(newContact);
  } catch (error) {
    next(error);
  }
});

router.delete("/:contactId", validateId, async (req, res, next) => {
  try {
    const message = await removeContact(req.params.contactId);
    if (message) res.json(message);
  } catch (error) {
    next(error);
  }
});

router.put("/:contactId", validateId, validator, async (req, res, next) => {
  try {
    const contacts = await updateContacts(req.params.contactId, req.body);
    res.json(contacts);
  } catch (error) {
    next(error);
  }
});

router.patch(
  "/:contactId/favorite",
  validateId,
  favoriteValidate,
  async (req, res, next) => {
    try {
      if (!req.body) {
        res.status(400).json({ message: "missing field favorite" });
      } else {
        const contact = await updateStatusContact(
          req.params.contactId,
          req.body
        );
        res.json(contact);
      }
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;

const express = require("express");
const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateFavorite,
} = require("../../models/contacts/contacts");
const authenticate = require("../../middlewares/authMiddlewar");
const { schemas } = require("../../models/contacts/contactsSchema");

const router = express.Router();

router.get("/", authenticate, async (req, res, next) => {
  try {
    const list = await listContacts(req);
    res.json(list);
  } catch (error) {
    next(error);
  }
});

router.get("/:contactId", authenticate, async (req, res, next) => {
  try {
    const contact = await getContactById(req, res);
    res.json(contact);
  } catch (error) {
    next(error);
  }
});

router.post("/", authenticate, async (req, res, next) => {
  try {
    const { error } = schemas.addSchema.validate(req.body);
    if (error) {
      res
        .status(400)
        .json({ message: "Missing required name field.", er: `${error}` });
    } else {
      const newContact = await addContact(req, res);
      res.status(201).json(newContact);
    }
  } catch (error) {
    next(error);
  }
});

router.delete("/:contactId", authenticate, async (req, res, next) => {
  try {
    const message = await removeContact(req, res);
    res.json(message);
  } catch (error) {
    next(error);
  }
});

router.put("/:contactId", authenticate, async (req, res, next) => {
  try {
    const { error } = schemas.addSchema.validate(req.body);

    if (error) {
      res.status(400).json({ message: "Missing required name field." });
    } else {
      const updatedContact = await updateContact(req, res);
      res.json(updatedContact);
    }
  } catch (error) {
    next(error);
  }
});

router.patch("/:contactId/favorite", authenticate, async (req, res, next) => {
  try {
    const { error } = schemas.updateFavoriteSchema.validate(req.body);
    if (error) {
      res.status(400).json({ message: "Missing field favorite." });
    } else {
      const updateContact = await updateFavorite(req, res);
      res.json(updateContact);
    }
  } catch (error) {
    next(error);
  }
});

module.exports = router;

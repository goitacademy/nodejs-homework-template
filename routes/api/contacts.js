const express = require("express");
const {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
  updateStatusContact,
} = require("../../service/contactsController");
const schema = require("../../service/Schemas/joiSchema");

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const contacts = await listContacts();
    res.status(200).json(contacts);
  } catch (error) {
    next(error);
  }
});

router.get("/:contactId", async (req, res, next) => {
  try {
    const contact = (await getContactById(req.params.contactId)) || null;
    if (!contact) {
      return res.status(404).json({ message: "Not found" });
    }
    res.status(200).json(contact);
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  const body = req.body;
  const validation = schema.validate(body);
  if (validation.error) {
    res.status(400).json({ message: validation.error.details[0].message });
  } else {
    try {
      const contact = await addContact(body);
      res.status(201).json(contact);
    } catch (error) {
      next(error);
    }
  }
});

router.delete("/:contactId", async (req, res, next) => {
  const contactId = req.params.contactId;

  try {
    const contact = await removeContact(contactId);
    if (!contact) {
      res.status(404).json({ message: "Not found" });
    } else res.status(200).json({ message: "contact deleted" });
  } catch (error) {
    next(error);
  }
});

router.put("/:contactId", async (req, res, next) => {
  const contactId = req.params.contactId;
  const body = req.body;
  const validation = schema.validate(body);

  if (validation.error) {
    res.status(400).json({ message: validation.error.details[0].message });
  } else {
    try {
      const contact = await updateContact(contactId, body);
      if (!contact) {
        return res.status(404).json({ message: "Not found" });
      } else res.status(200).json(contact);
    } catch (error) {
      next(error);
    }
  }
});

router.patch("/:contactId/favorite", async (req, res, next) => {
  const contactId = req.params.contactId;
  const body = req.body;

  if (!body.favorite) {
    res.status(400).json({ message: "missing field favorite" });
  } else {
    try {
      const updatedStatus = await updateStatusContact(contactId, body);
      if (!updatedStatus) {
        return res.status(404).json({ message: "Not found" });
      } else res.status(200).json(updatedStatus);
    } catch (error) {
      next(error);
    }
  }
});

module.exports = router;

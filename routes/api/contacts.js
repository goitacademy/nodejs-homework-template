const express = require("express");
const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} = require("../../controllers/contacts");
const { postValidate, putValidate } = require("../../models/contacts.js");
const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const contactsList = await listContacts();
    res.json(contactsList);
  } catch (error) {
    return res.status(500).json({ error });
  }
});

router.get("/:contactId", async (req, res, next) => {
  const foundContact = await getContactById(req.params.contactId);
  if (!foundContact) {
    res.status(404).json({ message: "Not found" });
  } else {
    res.json(foundContact);
  }
});

router.patch("/:id/favorite", async (req, res, next) => {
  const { id } = req.params;
  if (!id) {
    return res.status(404).json({ message: "Not found" });
  }
  try {
    if (typeof req.body.favorite !== "boolean") {
      return res.status(400).send({ message: "missing field favorite" });
    }
    const favoritetUpdate = await updateContact(id, req.body);
    return res.status(200).json(favoritetUpdate);
  } catch (error) {
    next(error);
    return res.status(500).json({ message: "Something went wrong" });
  }
});

router.post("/", async (req, res, next) => {
  if (postValidate.validate(req.body).error) {
    res.status(400).json({
      message: postValidate.validate(req.body).error.details[0].message,
    });
  } else {
    const message = await addContact(req.body);
    res.status(201).json(message);
  }
});

router.delete("/:contactId", async (req, res, next) => {
  const foundContact = await removeContact(req.params.contactId);
  if (!foundContact) {
    res.status(404).json({ message: "Not found" });
  } else {
    res.json({ message: "contact deleted" });
  }
});

router.put("/:contactId", async (req, res, next) => {
  const foundContact = await getContactById(req.params.contactId);
  const error = putValidate.validate(req.body).error;
  if (!error) {
    const editedContact = await updateContact(req.params.contactId, req.body);
    res.json(editedContact);
  } else if (!foundContact) {
    res.status(404).json({ message: "Not found user" });
  } else if (error.details[0].type === "object.missing") {
    res.status(400).json({ message: "missing fields" });
  } else if (error.details[0].type === "object.unknown") {
    res.status(404).json({
      message: error.details[0].message,
    });
  }
});

module.exports = router;

const express = require("express");

const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} = require("./../../models/contacts.js");

const {
  validatePost,
  validatePut,
} = require("./../../helpers/validateBody.js");

const router = express.Router();

router.get("/", async (req, res, next) => {
  const data = await listContacts();

  res.status(200).json({
    contacts: data,
  });
});

router.get("/:contactId", async (req, res, next) => {
  const { contactId } = req.params;
  const data = await getContactById(contactId);

  if (!data) {
    return res.status(404).json({ message: "Not found" });
  }
  return res.status(200).json({ contact: data });
});

router.post("/", async (req, res, next) => {
  const validateData = await validatePost(req.body);

  const errValidate = validateData.error;

  if (errValidate) {
    const err = errValidate.details[0].message;
    return res
      .status(400)
      .json({ message: `missing ${err.replaceAll('"', "")} field` });
  }

  const result = await addContact(req.body);

  res.status(200).json({ message: result });
});

router.delete("/:contactId", async (req, res, next) => {
  const { contactId } = req.params;

  const data = await removeContact(contactId);

  if (!data) {
    return res.status(404).json({ message: "Not found" });
  }
  return res.status(200).json({ contact: "Contact delete" });
});

router.put("/:contactId", async (req, res, next) => {
  const { contactId } = req.params;

  if (!Object.keys(req.body).length) {
    res.status(400).json({ message: "missing fields" });
    return;
  }

  const validateData = await validatePut(req.body);

  const errValidate = validateData.error;

  if (errValidate) {
    return res.status(400).json({ message: "missing fields" });
  }

  const data = await updateContact(contactId, req.body);

  if (!data) {
    res.status(404).json({ message: "Not found" });
  }

  res.json({ contact: data });
});

module.exports = router;

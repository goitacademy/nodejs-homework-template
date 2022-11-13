const express = require("express");
const api = require("../../models/contacts");
const validationBody = require("../../middleware/validationBody");
const schema = require("../../schema/schema");

const router = express.Router();

router.get("/", async (req, res, next) => {
  const contatcs = await api.listContacts();
  res.json({ contatcs });
});

router.get("/:contactId", async (req, res, next) => {
  const id = req.params.contactId;
  const contactToShow = await api.getContactById(id);
  if (!contactToShow) {
    res.status(404).json({ message: "Not found" });
  } else {
    res.json({ contactToShow });
  }
});

router.post("/", validationBody(schema.schemaPOST), async (req, res, next) => {
  const body = req.body;
  const newContact = await api.addContact(body);
  res.status(201).json({ newContact });
});

router.delete("/:contactId", async (req, res, next) => {
  const id = req.params.contactId;
  const success = await api.removeContact(id);
  if (success) {
    res.json({ message: "contact deleted" });
  } else {
    res.status(404).json({ message: "Not found" });
  }
});

router.put(
  "/:contactId",
  validationBody(schema.schemaPUT),
  async (req, res, next) => {
    const body = req.body;
    const id = req.params.contactId;
    const updatedContact = await api.updateContact(id, body);
    res.json({ updatedContact });
  }
);

module.exports = router;

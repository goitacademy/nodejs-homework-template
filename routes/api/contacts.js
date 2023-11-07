const express = require("express");
const {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
} = require("../../models/contacts");
const { contactsSchema, putSchema } = require("../../schemas/validationSchema");
const app = express();
const router = express.Router();

router.get("/", async (req, res, next) => {
  const data = await listContacts();
  res.send(data);
  next();
});

router.get("/:contactId", async (req, res, next) => {
  const { contactId } = req.params;
  const data = await getContactById(contactId);
  if (!data) {
    return next();
  }
  res.send(data);
});

router.post("/", async (req, res, next) => {
  const response = contactsSchema.validate(req.body);
  if (typeof response.error !== "undefined") {
    return res
      .status(400)
      .send(response.error.details.map((err) => err.message).join(","));
  }
  const updContacts = await addContact(req.body);
  res.status(201).json(updContacts);
});

router.delete("/:contactId", async (req, res, next) => {
  const { contactId } = req.params;
  const data = await removeContact(contactId);
  if (!data) {
    return next();
  }
  res.status(200).send({ message: "contact deleted" });
});

router.put("/:contactId", async (req, res, next) => {
  const { contactId } = req.params;
  const response = putSchema.validate(req.body);
  if (typeof response.error !== "undefined") {
    return res
      .status(400)
      .send(response.error.details.map((err) => err.message).join(","));
  }
  const data = await updateContact(contactId, req.body);
  if (!data) {
    return next;
  }
  res.status(200).send(data);
});

module.exports = router;

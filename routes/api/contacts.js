const express = require("express");

const router = express.Router();
const validateBody = require("../../middlewares/validateBody");
const Joi = require("joi");

const addContactsShema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
});
const schemaUpdate = Joi.object({
  name: Joi.string(),
  email: Joi.string(),
  phone: Joi.string(),
}).min(1);

const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} = require("../../modules/contacts");

router.get("/", async (req, res, next) => {
  const data = await listContacts();
  res.json(data);
});

router.get("/:contactId", async (req, res, next) => {
  const data = await getContactById(req.params.contactId);
  if (!data) {
    res.json({ message: "Not found", status: 404 });
  }
  res.json(data);
});

router.post("/", validateBody(addContactsShema), async (req, res, next) => {
  const { name, email, phone } = req.body;
  const data = await addContact(name, email, phone);
  res.status(201).json(data);
});

router.delete("/:contactId", async (req, res, next) => {
  const data = await removeContact(req.params.contactId);
  if (!data) {
    res.json({ message: "Not found", status: 404 });
  }
  res.json({ message: "contact deleted" });
});

router.put(
  "/:contactId",
  validateBody(schemaUpdate),
  async (req, res, next) => {
    const data = await updateContact(req.body, req.params.contactId);
    if (!data) {
      res.json({ message: "missing fields", status: 404 });
    }
    res.json(data);
  }
);

module.exports = router;

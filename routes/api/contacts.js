const express = require("express");
const api = require("../../models/contacts");
const Joi = require("joi");

const router = express.Router();

router.use((req, res, next) => {
  if (req.method === "POST") {
    const { name, email, phone } = req.body;
    if (!name || !email || !phone) {
      res.status(400).json({ message: "missing required field" });
    } else {
      const schema = Joi.object({
        name: Joi.string().alphanum().min(3).max(20).required(),
        email: Joi.string()
          .email({
            minDomainSegments: 2,
            tlds: { allow: ["com", "net"] },
          })
          .required(),
        phone: Joi.number().required(),
      });
      const { error } = schema.validate(req.body);
      if (error) {
        res.json({ error: error.message });
      } else {
        next();
      }
    }
  } else {
    next();
  }
});
router.use((req, res, next) => {
  if (req.method === "PUT") {
    if (Object.keys(req.body).length === 0) {
      res.status(400).json({ message: "missing fields" });
    } else {
      const schema = Joi.object({
        name: Joi.string().alphanum().min(3).max(20),
        email: Joi.string().email({
          minDomainSegments: 2,
          tlds: { allow: ["com", "net"] },
        }),
        phone: Joi.number(),
      });
      const { error } = schema.validate(req.body);
      if (error) {
        res.json({ error: error.message });
      } else {
        next();
      }
    }
  } else {
    next();
  }
});

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

router.post("/", async (req, res, next) => {
  try {
    const newContact = await api.addContact(req.body);
    res.json({ newContact });
  } catch (err) {
    res.json({ error: err });
  }
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

router.put("/:contactId", async (req, res, next) => {
  const body = req.body;
  const id = req.params.contactId;

  const result = await api.updateContact(id, body);
  if (result) {
    res.json({ result });
  } else {
    res.status(404).json({ message: "Not found" });
  }
});

module.exports = router;

const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} = require("../../models/contacts");

const express = require("express");
const router = express.Router();

const Joi = require("joi");

const contactSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
});

router.get("/", async (req, res, next) => {
  try {
    const result = await listContacts();
    res.json(result);
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  const { id } = req.params;
  try {
    const result = await getContactById(id);
    if (result) {
      res.json(result);
    } else {
      res.status(404).json({ message: "Not found" });
    }
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  const { name, email, phone } = req.body;

  try {
    const { error } = contactSchema.validate(req.body);
    if (error) {
      res.status(400).json({ message: error.message });
    } else {
      const result = await addContact(name, email, phone);
      res.json(result);
    }
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", async (req, res, next) => {
  const { id } = req.params;
  try {
    const result = await removeContact(id);
    if (!result) {
      res.status(404).json({ message: "Not found" });
    } else {
      res.status(204).json({ message: "User deleted" });
    }
  } catch (error) {
    next(error);
  }
});

router.put("/:id", async (req, res, next) => {
  const { id } = req.params;
  const { name, email, phone } = req.body;
  const { error } = contactSchema.validate(req.body);
  try {
    if (error) {
      res.status(400).json({ message: "missing required name field" });
      return;
    }

    const result = await updateContact(id, { name, email, phone });
    if (!result) {
      res.status(404).json({ message: "Not found" });
    } else {
      res.json(result);
    }
  } catch (error) {
    next(error);
  }
});

module.exports = router;

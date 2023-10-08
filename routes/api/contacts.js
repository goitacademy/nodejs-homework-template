const express = require("express");
const Joi = require("joi");

const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateStatusContact,
} = require("../../models/contacts.js");

const router = express.Router();

const schema = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  email: Joi.string().email().required(),
  phone: Joi.number().integer().min(1000000000).max(9999999999).required(),
  favorite: Joi.boolean(),
});
const schemaStatus = Joi.object({
  favorite: Joi.boolean().required(),
});

const validateBody = async (req, res, next) => {
  try {
    await schema.validateAsync(req.body);
    next();
  } catch (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
};
const validateFavoriteField = async (req, res, next) => {
  try {
    await schemaStatus.validateAsync({ favorite: req.body.favorite });
    next();
  } catch (error) {
    return res.status(400).json({
      error: error.details[0].message,
      message: "missing field favorite",
    });
  }
};


router.get("/", async (req, res) => {
  try {
    const contacts = await listContacts();
    res.json(contacts);
  } catch (error) {
    console.error("Error en la ruta /:", error);
    res.status(500).json({ error: "Error en el servidor" });
  }
});

router.get("/:contactId", async (req, res) => {
  try {
    const id = req.params.contactId;
    const contact = await getContactById(id);
    res.json(contact);
  } catch (error) {
    if (error.name === "CastError") {
      return res.status(400).json({ message: "Invalid contact ID" });
    }
    res
      .status(500)
      .json({ error: `Error en el servidor de tipo: ${error.name}` });
  }
});

router.post("/", validateBody, async (req, res) => {
  try {
    const contact = await addContact(req.body);
    res.status(201).json(contact);
  } catch (error) {
    console.error("Error en la ruta /:", error);
    res.status(500).json({ error: "Error en el servidor" });
  }
});

router.delete("/:contactId", async (req, res) => {
  try {
    const id = req.params.contactId;
    const contact = await removeContact(id);
    res.json(contact);
  } catch (error) {
    if (error.name === "CastError") {
      return res.status(400).json({ message: "Invalid contact ID" });
    }
    res.status(500).json({ error: "Error en el servidor" });
  }
});

router.put("/:contactId", validateBody, async (req, res) => {
  const id = req.params.contactId;
  try {
    const contact = await updateContact(id, req.body);
    res.status(201).json(contact);
  } catch (error) {
    if (error.name === "CastError") {
      return res.status(400).json({ message: "Invalid contact ID" });
    }
    res.status(500).json({ error: "Error en el servidor" });
  }
});
router.patch(
  "/:contactId/favorite",
  validateFavoriteField,
  async (req, res) => {
    const id = req.params.contactId;
    try {
      const contact = await updateStatusContact(id, req.body);
      res.status(201).json(contact);
    } catch (error) {
      if (error.name === "CastError") {
        return res.status(400).json({ message: "Invalid contact ID" });
      }
      res.status(500).json({ error: "Error en el servidor" });
    }
  }
);


module.exports = router;

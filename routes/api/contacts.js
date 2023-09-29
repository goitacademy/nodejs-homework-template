const express = require("express");
const { body, validationResult } = require("express-validator");

const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} = require("../../models/contacts.js");

const router = express.Router();

const validateBody = [
  body("name").notEmpty(),
  body("email").isEmail(),
  body("phone").notEmpty(),
];

router.get("/", async (req, res, next) => {
  try {
    const contacts = await listContacts();
    res.json(contacts);
  } catch (error) {
    console.error("Error en la ruta /:", error);
    res.status(500).json({ error: "Error en el servidor" });
  }
});

router.get("/:contactId", async (req, res, next) => {
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

router.post("/", validateBody, async (req, res, next) => {
  const result = validationResult(req);
  if (!result.isEmpty()) {
    return res.status(400).json({ errores: result.array() });
  }
  try {
    const contact = await addContact(req.body);
    res.status(201).json(contact);
  } catch (error) {
    console.error("Error en la ruta /:", error);
    res.status(500).json({ error: "Error en el servidor" });
  }
});

router.delete("/:contactId", async (req, res, next) => {
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

router.put("/:contactId", validateBody, async (req, res, next) => {
  const id = req.params.contactId;
  const result = validationResult(req);
  if (!result.isEmpty()) {
    return res.status(400).json({ errores: result.array() });
  }
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

module.exports = router;

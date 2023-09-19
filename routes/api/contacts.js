const express = require("express");
const {
  listContacts,
  getById,
  addContact,
  removeContact,
  updateContact,
} = require("../../utils/contactUtils");
const Joi = require("joi");

const contactSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  phone: Joi.string().required(),
}).unknown(false); // Agrega unknown(false) para que Joi no permita campos desconocidos en el objeto

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const contacts = listContacts();
    res.status(200).json(contacts);
  } catch (error) {
    console.error("error al obtener datos del servidor");
    res.status(500).json({ message: "Error interno al servidor" });
  }
});

router.get("/:contactId", async (req, res, next) => {
  try {
    const contactId = req.params.contactId;
    const contactSelected = getById(contactId);
    if (contactSelected) {
      res.status(200).json(contactSelected);
    } else {
      res.status(404).json({ message: "Contacto no encontrado" });
    }
  } catch (error) {
    console.error("error al obtener contacto", error);
    res.status(500).json({ message: "Error interno al servidor" });
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { error, value } = contactSchema.validate(req.body);

    if (error) {
      return res
        .status(400)
        .json({ message: "Todos los campos son obligatorios" });
    }

    const { name, phone, email } = value; // Desestructurar después de la validación

    const response = addContact({ name, phone, email });

    if (response) {
      res.status(201).json({ message: "Contacto añadido con exito" });
    } else {
      res.status(400).json({ message: "Error interno al servidor" });
    }
  } catch (error) {
    console.error("Error al agregar contacto", error);
    res.status(500).json({ message: "error interno al servidor" });
  }
});

router.delete("/:contactId", async (req, res, next) => {
  try {
    const contactId = req.params.contactId;
    const filter = removeContact(contactId);
    if (filter) {
      res.status(200).json({ message: "Contacto eliminado!" });
    } else {
      res.status(400).json({ message: "Not Found!" });
    }
  } catch (error) {
    console.error("Error al eliminar el contacto", error);
    res.status(500).json({ message: "Error interno al servidor" });
  }
});

router.put("/:contactId", async (req, res, next) => {
  try {
    const contactId = req.params.contactId;
    const updatedFields = req.body;

    if (!updatedFields || Object.keys(updatedFields).length === 0) {
      return res.status(400).json({ message: "missing fields" });
    }

    const updatedContact = updateContact(contactId, updatedFields);

    if (updatedContact) {
      res.status(200).json(updatedContact);
    } else {
      res.status(404).json({ message: "Not found" });
    }
  } catch (error) {
    console.error("Error al actualizar el contacto", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
});

module.exports = router;

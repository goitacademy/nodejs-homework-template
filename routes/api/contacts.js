const express = require("express");
const router = express.Router();
const contacts = require("../../models/contacts.js");
const Joi = require("joi");

router.get("/", async (req, res, next) => {
  try {
    const listContacts = await contacts.listContacts();
    res.json({
      message: "Contact List",
      status: "success",
      code: 200,
      data: listContacts,
    });
  } catch (error) {
    console.error("Error al obtener la lista de contactos:", error);
    res.status(500).json({
      message: "Error interno del servidor",
      status: "failed",
      code: 500,
    });
  }
});

router.get("/:contactId", async (req, res, next) => {
  const { contactId } = req.params;
  try {
    const contact = await contacts.getContactById(contactId);
    if (contact) {
      res.json({
        message: "Contact",
        status: "success",
        code: 200,
        data: contact,
      });
    } else {
      res.status(404).json({
        message: "Not found",
        status: "failed",
        code: 404,
      });
    }
  } catch (error) {
    console.error("Error al obtener el contacto:", error);
    res.status(500).json({
      message: "Error interno del servidor",
      status: "failed",
      code: 500,
    });
  }
});

router.post("/", async (req, res, next) => {
  const { name, email, phone } = req.body;

  const schema = Joi.object({
    name: Joi.string(),
    email: Joi.string().email(),
    phone: Joi.string(),
  });

  const { error } = schema.validate(req.body);
  if (error) {
    const errorMessage = error.details
      .map((detail) => detail.message)
      .join(", ");
    return res.status(400).json({
      message: `Error de validación: ${errorMessage}`,
      status: "failed",
      code: 400,
    });
  }

  if (!name || !email || !phone) {
    let fieldName = "";

    if (!name) {
      fieldName = "name";
    } else if (!email) {
      fieldName = "email";
    } else {
      fieldName = "phone";
    }

    res.json({
      message: `missing required ${fieldName} field`,
      status: "failed",
      code: 400,
    });
  } else {
    const addContact = await contacts.addContact(name, email, phone);

    res.json({
      message: "Contact",
      status: "success",
      code: 201,
      data: addContact,
    });
  }
});

router.delete("/:contactId", async (req, res, next) => {
  const { contactId } = req.params;
  const contact = await contacts.removeContact(contactId);

  if (contact) {
    res.json({
      message: "contacto eliminado",
      status: "success",
      code: 200,
    });
  } else {
    res.json({
      message: "Not found",
      status: "failed",
      code: 404,
    });
  }
});

router.put("/:contactId", async (req, res, next) => {
  const { contactId } = req.params;
  const { name, email, phone } = req.body;

  const schema = Joi.object({
    name: Joi.string(),
    email: Joi.string().email(),
    phone: Joi.string(),
  });

  const { error } = schema.validate(req.body);
  if (error) {
    const errorMessage = error.details
      .map((detail) => detail.message)
      .join(", ");
    return res.status(400).json({
      message: `Error de validación: ${errorMessage}`,
      status: "failed",
      code: 400,
    });
  }

  if (name || email || phone) {
    const contact = await contacts.updateContact(contactId, {
      name: name,
      email: email,
      phone: phone,
    });

    res.json({
      message: "update",
      status: "success",
      code: 200,
      data: contact,
    });
  } else if (!name && !email && !phone) {
    res.json({
      message: "missing fields",
      status: "failed",
      code: 400,
    });
  } else {
    res.json({
      message: "Not found",
      status: "failed",
      code: 404,
    });
  }
});

module.exports = router;

const express = require("express");
const Joi = require("joi");

const router = express.Router();

const contacts = require("../../models/contacts");
const createError = require("../../helpers/createError");

const contactsSchema = Joi.object({
  id: Joi.string().required(),
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
});

router.get("/", async (req, res, next) => {
  try {
    const result = await contacts.listContacts();
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const result = await contacts.getContactById(req.params.id);
    if (!result) {
      return next(createError("Contact not found", 404));
    }
    
    // Si el contacto se encuentra, envía una respuesta con el contacto en formato JSON
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
});


router.post("/", async (req, res, next) => {
  try {
    const { error } = contactsSchema.validate(req.body);
    if (error) {
      throw createError(error.message, 400);
    }
    const result = await contacts.addContact(req.body);
    
    // Envía una respuesta con un mensaje de confirmación si el contacto se agrega con éxito
    res.status(201).json({ message: "Contacto agregado exitosamente", contact: result });
  } catch (error) {
    next(error);
  }
});


router.delete("/:id", async (req, res, next) => {
  try {
    const result = await contacts.removeContact(req.params.id);
    if (!result) {
      throw createError("Contact not found", 404);
    }
    
    // Envía una respuesta con un mensaje de confirmación si el contacto se elimina con éxito
    res.status(204).send("Contacto eliminado correctamente");
  } catch (error) {
    next(error);
  }
});

router.put("/:id", async (req, res, next) => {
  try {
    const { error } = contactsSchema.validate(req.body);
    if (error) {
      throw createError(error.message, 400);
    }
    const result = await contacts.updateContact(req.params.id, req.body);
    if (!result) {
      throw createError("Contact not found", 404);
    }
    
    // Envía una respuesta con un mensaje de confirmación si el contacto se actualiza con éxito
    res.status(200).json({ message: "Contacto actualizado correctamente", contact: result });
  } catch (error) {
    next(error);
  }
});


module.exports = router;

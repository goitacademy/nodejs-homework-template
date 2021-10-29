const express = require("express");
const { NotFound, BadRequest } = require("http-errors");
const Joi = require("joi");
const router = express.Router();

const contactsOperations = require("../../model/contacts");

const joiSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
});

/**
 * 1.Получить все контакты
 * 2.Получить один контакт по id
 * 3.Добавить новый контакт
 * 4.Обновить контакт по id
 * 5.Удалить контакт по id
 */

router.get("/", async (req, res, next) => {
  try {
    const contacts = await contactsOperations.listContacts();
    res.json({
      status: "success",
      code: 200,
      data: {
        contacts,
      },
    });
  } catch (error) {
    next(error);
  }
});

router.get("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const contact = await contactsOperations.getContactById(contactId);
    if (!contact) {
      throw new NotFound(`Contact with id=${contactId} not found`);
    }
    res.json({
      status: "success",
      code: 200,
      data: {
        contact,
      },
    });
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    console.log(req.body);
    const { error } = joiSchema.validate(req.body);
    if (error) {
      throw new BadRequest(error.message);
    }

    const newContact = await contactsOperations.addContact(req.body);
    console.log(newContact);
    res.status(201).json(newContact);
  } catch (error) {
    next(error);
  }
});

router.delete("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const deleteContact = await contactsOperations.removeContact(contactId);
    if (!deleteContact) {
      throw new NotFound(`Contact with id=${contactId} not found`);
    }

    res.json({
      status: "success",
      code: 200,
      message: "Remove success",
    });
  } catch (error) {
    next(error);
  }
});

router.post("/:contactId", async (req, res, next) => {
  res.json({ message: "template message" });
});

module.exports = router;

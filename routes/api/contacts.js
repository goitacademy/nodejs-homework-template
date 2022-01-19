const express = require("express");
const { NotFound, BadRequest } = require("http-errors");

const { authenticate } = require("../../middlewares");
const { Contact } = require("../../models");
const { joiSchema } = require("../../models/contact");

const router = express.Router();

// Получение всех контактов
router.get("/", authenticate, async (req, res, next) => {
  try {
    const { page = 1, limit = 3 } = req.query;
    const { _id } = req.user;
    const skip = (page - 1) * limit;
    const contacts = await Contact.find(
      { owner: _id },
      "_id name email phone favorite",
      { skip, limit: +limit }
    );
    res.json(contacts);
  } catch (error) {
    next(error);
  }
});

// Получение контакта по id
router.get("/:contactId", authenticate, async (req, res, next) => {
  const { contactId } = req.params;
  try {
    const contact = await Contact.findOneAndUpdate({ contactId, owner: _id });
    if (!contact) {
      throw new NotFound();
    }
    res.json(contact);
  } catch (error) {
    if (error.message.includes("Cast to ObjectId failed for value")) {
      error.status = 404;
    }
    next(error);
  }
});

// Создание нового контакта
router.post("/", authenticate, async (req, res, next) => {
  try {
    const { error } = joiSchema.validate(req.body);
    if (error) {
      throw new BadRequest(error.message);
    }
    const { _id } = req.user;
    const newContact = await Contact.create({ ...req.body, owner: _id });
    res.status(201).json(newContact);
  } catch (error) {
    if (error.message.includes("validation failed")) {
      error.status = 400;
    }
    next(error);
  }
});

// Обновление контакта
router.put("/:contactId", authenticate, async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const updateContact = await Contact.findOneAndUpdate(
      {
        contactId,
        owner: _id,
      },
      req.body,
      {
        new: true,
      }
    );
    if (!updateContact) {
      throw new NotFound();
    }
    res.json(updateContact);
  } catch (error) {
    if (error.message.includes("validation failed")) {
      error.status = 400;
    }
    next(error);
  }
});

// Обновление статуса контакта
router.patch("/:contactId/favorite", authenticate, async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const { favorite } = req.body;
    const updateContact = await Contact.findOneAndUpdate(
      {
        contactId,
        owner: _id,
      },
      { favorite },
      {
        new: true,
      }
    );
    if (!updateContact) {
      throw new NotFound();
    }
    res.json(updateContact);
  } catch (error) {
    if (error.message.includes("validation failed")) {
      error.status = 400;
    }
    next(error);
  }
});

// Удаление контакта
router.delete("/:contactId", authenticate, async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const deleteCotatact = await Contact.findOneAndDelete({
      contactId,
      owner: _id,
    });
    if (!deleteCotatact) {
      throw new NotFound();
    }
    res.json({ message: "contact deleted" });
  } catch (error) {
    next(error);
  }
});

module.exports = router;

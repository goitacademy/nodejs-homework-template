const express = require("express");
const createError = require("http-errors");
const router = express.Router();
const contactsOperations = require("../../model/contacts");
const { validation } = require("../../middlewares");
const { joiContactSchema } = require("../../validations");

router.get("/", async (_req, res, next) => {
  try {
    const contacts = await contactsOperations.listContacts();
    res.status(200).json(contacts);
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const contactById = await contactsOperations.getContactById(id);
    if (!contactById) {
      throw new createError(404, `Contact with id=${id} not found`);
    }
    res.status(200).json(contactById);
  } catch (error) {
    next(error);
  }
});

router.post("/", validation(joiContactSchema), async (req, res, next) => {
  try {
    const newContact = await contactsOperations.addContact(req.body);
    res.status(201).json(newContact);
  } catch (error) {
    next(error);
  }
});

router.put("/:id", validation(joiContactSchema), async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await contactsOperations.updateContact(id, req.body);
    if (!result) {
      throw new createError(404, {
        message: `Contact with id=${id} not found`,
      });
    }
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await contactsOperations.removeContact(id);
    if (!result) {
      throw new createError(404, {
        message: `Contact with id=${id} not found`,
      });
    }
    res.status(200).json({ message: `Contact deleted` });
  } catch (error) {
    next(error);
  }
});

module.exports = router;

const express = require('express')
const contacts = require("../../models/contacts");
const { HttpError } = require('../../helpers/index')
const { schema } = require('../../models/schema/Schema')
console.log(contacts);
const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const result = await contacts.listContacts();
    res.json(result);
  } catch (error) {
    next(error);
  }
});

router.get("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await contacts.getContactById(contactId);

    if (!result) {
      throw HttpError(404, "Not foun");
    }

    res.json(result);
  } catch (error) {
    next(error);
  }
});


router.post("/", async (req, res, next) => {
  try {
    console.log(req.body);
    const { error } = schema.validate(req.body);

    if (error) {
      throw HttpError(400, `${error.message}, please try again`);
    }

    const result = await contacts.addContact(req.body);
    res.status(201).json(result);
  } catch (error) { next(error); }
});

router.delete('/:contactId', async (req, res, next) => {
  try {
    const { contactId } = req.params;
    console.log(contactId);
    const result = await contacts.removeContact(contactId);

    if (!result) {
      throw HttpError(404, "Not fou");
    }

    res.json({
      message: "Contact deleted",
    });

  } catch (error) {
    next(error);
  }
})

router.put('/:contactId', async (req, res, next) => {
  try {
    const { error } = schema.validate(req.body);

    if (error) {
      throw HttpError(400, error.message);

    }
    const { contactId } = req.params;
    console.log(contactId);
    const result = await contacts.updateContact(contactId, req.body);
    console.log(result);

    if (!result) {
      throw HttpError(404, "Not found");
    }

    res.json(result);
  } catch (error) {
    next(error);
  }
})

module.exports = router

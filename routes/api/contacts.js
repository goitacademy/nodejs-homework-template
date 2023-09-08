const express = require("express");

const router = express.Router();

const contacts = require("../../models/contacts");

const HttpError = require("../../helpers/HttpError");

router.get("/", async (req, res, next) => {
  try {
    const result = await contacts.listContacts();
    if (!result) {
      throw HttpError(404, "Not found");
    }
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
});

router.get("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const searchedContact = await contacts.getContactById(contactId);
    if (!searchedContact) {
      throw HttpError(404, "Not found");
    }
    res.status(200).json(searchedContact);
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { name, email, phone } = req.body;
    if (!phone || !name || !email) {
      throw HttpError(400, "missing required name field");
    } else {
      const result = await contacts.addContact(req.body);
      res.status(201).json(result);
      if (!result) {
        throw HttpError(404, "Not found");
      }
    }
  } catch (error) {
    next(error)
  }
});

router.delete("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await contacts.removeContact(contactId);
    if (result) {
      res.status(200).json({ message: "contact deleted"});
    } else {
      throw HttpError(404, "Not found");
    }
  } catch (error) {
    next(error)
  }
});

router.put("/:contactId", async (req, res, next) => {
try {
  console.log(req.body)
    const { contactId } = req.params;
    const result = await contacts.updateContact(contactId, req.body);
    if (result) {
      res.json(result);
    } else {
      throw HttpError(404, "Not found");
    }
} catch (error) {
 next(error) 
}
});

module.exports = router;

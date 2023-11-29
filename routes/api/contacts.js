const express = require("express");
const ContactsManager = require("../../Managers/ContactsManager");
const { get, delet, put } = require("../../responses/responseMessages");
const {
  HttpError,
  checkForRequiredKeys,
  checkForSyntax,
} = require("../../helpers");
const { nanoid } = require("nanoid");

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const contacts = await ContactsManager.listContacts();
    res.json(contacts);
  } catch {
    res.status(500).json({ message: "Something went wrong" });
  }
});

router.get("/:contactId", async (req, res, next) => {
  try {
    const contact = await ContactsManager.getById(req.params.contactId);
    if (contact === -1) throw HttpError(get.error.status, get.error.message);
    res.status(get.successed.status).json(contact);
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const isBodyCorrect = checkForRequiredKeys(req.body);

    if (!isBodyCorrect.isCorrect) {
      throw HttpError(400, isBodyCorrect.message);
    }

    const newContact = await ContactsManager.addContact({
      id: nanoid(),
      ...req.body,
    });

    res.status(201).json(newContact);
  } catch (error) {
    next(error);
  }
});

router.delete("/:contactId", async (req, res, next) => {
  try {
    const remove = await ContactsManager.removeContact(req.params.contactId);
    if (remove === -1) throw HttpError(delet.error.status, delet.error.message);
    res
      .status(delet.successed.status)
      .json({ message: delet.successed.message });
  } catch (error) {
    next(error);
  }
});

router.put("/:contactId", async (req, res, next) => {
  try {
    const isBodyCorrect = checkForSyntax(req.body);

    if (!isBodyCorrect.isCorrect) {
      throw HttpError(400, isBodyCorrect.message);
    }

    const updatedContact = await ContactsManager.updateContact(
      req.params.contactId,
      req.body
    );

    if (!updatedContact) throw HttpError(put.error.status, put.error.message);

    res.status(put.successed.status).json(updatedContact);
  } catch (error) {
    next(error);
  }
});

module.exports = router;

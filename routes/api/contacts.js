const express = require("express");
const { nanoid } = require("nanoid");
const router = express.Router();
const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} = require("../../models/contacts");
const { catchAsync, contactValidators, HttpError } = require("../../utils");

router.get(
  "/",
  catchAsync(async (req, res, next) => {
    const contacts = await listContacts();
    res.status(200).json({
      status: "Success",
      contacts,
    });
  })
);

router.get(
  "/:contactId",
  catchAsync(async (req, res) => {
    const { contactId } = req.params;

    const contact = await getContactById(contactId);

    if (!contact) {
      return res.status(404).json({ message: "Contact not found" });
    }

    res.status(200).json({
      status: "Success",
      contact,
    });
  })
);

router.post(
  "/",
  catchAsync(async (req, res) => {
    const { value, error } = contactValidators.createContactDataValidator(
      req.body
    );

    if (error)
      throw new HttpError(400, { message: "Missing required name field" });

    const { name, email, phone } = value;

    const body = {
      id: nanoid(),
      name: name,
      email: email,
      phone: phone,
    };

    await addContact(body);

    res.status(201).json({
      status: "Success",
      body,
    });
  })
);

router.delete(
  "/:contactId",
  catchAsync(async (req, res) => {
    const { contactId } = req.params;

    const contact = await removeContact(contactId);

    if (!contact) {
      return res.status(404).json({ message: "Not found" });
    }

    res.status(200).json({
      status: "Success",
      contact,
    });
  })
);

router.put(
  "/:contactId",
  catchAsync(async (req, res) => {
    const { contactId } = req.params;

    const { value, error } = contactValidators.updateContactDataValidator(
      req.body
    );

    if (error) throw new HttpError(400, { message: "Missing fields" });

    const { name, email, phone } = value;

    const body = { name, email, phone };

    const updateContacts = await updateContact(contactId, body);

    if (!updateContacts) {
      return res.status(404).json({ message: "Not found" });
    }

    res.status(200).json({
      status: "Success",
      updateContacts,
    });
  })
);

module.exports = router;

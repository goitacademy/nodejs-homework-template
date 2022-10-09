const express = require("express");
const contacts = require("../../models/contacts");
const { RequestError, ctrlWrapper } = require("../../helpers");
const { validateBody } = require("../../middlewares");

const router = express.Router();

router.get(
    "/",
    ctrlWrapper(async (_, res) => {
        const result = await contacts.listContacts();
        res.status(200).json(result);
    })
);

router.get(
    "/:contactId",
    ctrlWrapper(async (_, res) => {
        const { contactId } = req.params;
        const contact = await contacts.getContactById(contactId);
        if (!contact) throw RequestError(404, "Not found");
        res.status(200).json(contact);
    })
);

router.post(
    "/",
    validateBody(),
    ctrlWrapper(async (req, res) => {
        const newContact = await contacts.addContact(req.body);
        res.status(201).json(newContact);
    })
);

router.delete(
    "/:contactId",
    ctrlWrapper(async (req, res) => {
        const { contactId } = req.params;
        const deletedContact = await contacts.removeContact(contactId);
        if (!deletedContact) throw RequestError(404, "Not found");
        res.status(200).json({ message: "contact deleted" });
    })
);

router.put(
    "/:contactId",
    validateBody(),
    ctrlWrapper(async (req, res) => {
        const { contactId } = req.params;
        const updatedContact = await contacts.updateContact(contactId, req.body);
        if (!updatedContact) throw RequestError(404, "Not found");
        res.status(200).json(updatedContact);
    })
);

module.exports = router;

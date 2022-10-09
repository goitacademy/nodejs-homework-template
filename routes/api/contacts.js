const express = require("express");
const { Contact, schemas } = require("../../models/contact");
const { RequestError, ctrlWrapper } = require("../../helpers");
const { validateBody } = require("../../middlewares");

const router = express.Router();

router.get(
    "/",
    ctrlWrapper(async (_, res) => {
        const result = await Contact.find({}, "-createdAt -updatedAt");
        res.status(200).json(result);
    })
);

router.get(
    "/:contactId",
    ctrlWrapper(async (req, res) => {
        const { contactId } = req.params;
        // const contact = await Contact.findOne({ _id: contactId });
        const contact = await Contact.findById(contactId);
        if (!contact) throw RequestError(404, "Not found");
        res.status(200).json(contact);
    })
);

router.post(
    "/",
    validateBody(schemas.add),
    ctrlWrapper(async (req, res) => {
        const newContact = await Contact.create(req.body);
        res.status(201).json(newContact);
    })
);

router.delete(
    "/:contactId",
    ctrlWrapper(async (req, res) => {
        const { contactId } = req.params;
        const deletedContact = await Contact.findByIdAndRemove(contactId);
        if (!deletedContact) throw RequestError(404, "Not found");
        res.status(200).json({ message: "contact deleted" });
    })
);

router.put(
    "/:contactId",
    validateBody(schemas.update),
    ctrlWrapper(async (req, res) => {
        const { contactId } = req.params;
        const updatedContact = await Contact.findByIdAndUpdate(contactId, req.body, { new: true });
        if (!updatedContact) throw RequestError(404, "Not found");
        res.status(200).json(updatedContact);
    })
);

router.patch(
    "/:contactId/favorite",
    validateBody(schemas.updateFavorite),
    ctrlWrapper(async (req, res) => {
        const { contactId } = req.params;
        const updatedContact = await Contact.findByIdAndUpdate(contactId, req.body, { new: true });
        if (!updatedContact) throw RequestError(404, "Not found");
        res.status(200).json(updatedContact);
    })
);

module.exports = router;

const express = require("express");
const Joi = require("joi");
const contacts = require("../../models/contacts");
const { RequestError } = require("../../helpers");

const body = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().required(),
    phone: Joi.string().required(),
});

const router = express.Router();

router.get("/", async (req, res, next) => {
    try {
        const result = await contacts.listContacts();
        res.status(200).json(result);
    } catch (error) {
        next(error);
    }
});

router.get("/:contactId", async (req, res, next) => {
    try {
        const { contactId } = req.params;
        const contact = await contacts.getContactById(contactId);
        if (!contact) throw RequestError(404, "Not found");
        res.status(200).json(contact);
    } catch (error) {
        next(error);
    }
});

router.post("/", async (req, res, next) => {
    try {
        const { error } = body.validate(req.body);
        if (error) throw RequestError(400, error.message);
        const newContact = await contacts.addContact(req.body);
        res.status(201).json(newContact);
    } catch (error) {
        next(error);
    }
});

router.delete("/:contactId", async (req, res, next) => {
    try {
        const { contactId } = req.params;
        const deletedContact = await contacts.removeContact(contactId);
        if (!deletedContact) throw RequestError(404, "Not found");
        res.status(200).json({ message: "contact deleted" });
    } catch (error) {
        next(error);
    }
});

router.put("/:contactId", async (req, res, next) => {
    try {
        const { error } = body.validate(req.body);
        if (error) throw RequestError(400, error.message);
        const { contactId } = req.params;
        const updatedContact = await contacts.updateContact(contactId, req.body);
        if (!updatedContact) throw RequestError(404, "Not found");
        res.status(200).json(updatedContact);
    } catch (error) {
        next(error);
    }
});

module.exports = router;

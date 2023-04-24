const express = require("express");
const Joi = require("joi");

const router = express.Router();

const addSchema = Joi.object({
    name: Joi.string().required().messages({
        "any.reqired": `"missing required name field`,
    }),
    email: Joi.string().required().messages({
        "any.reqired": `"missing required email field`,
    }),
    phone: Joi.string().required().messages({
        "any.reqired": `"missing required phone field`,
    }),
});

const contacts = require("../../models/contacts.js");

const { HttpError } = require("../../helpers");

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
        const { id } = req.params;
        const result = await contacts.getContactById(id);
        if (!result) {
            throw HttpError(404);
        }
        res.status(200).json(result);
    } catch (error) {
        next(error);
    }
});

router.post("/", async (req, res, next) => {
    try {
        const { error } = addSchema.validate(req.body);
        if (error) {
            throw HttpError(400, error.message);
        }
        const result = await contacts.addContact(req.body);
        res.status(201).json(result);
    } catch (error) {
        next(error);
    }
});
router.put("/:contactId", async (req, res, next) => {
    try {
        const { error } = addSchema.validate(req.body);
        if (error) {
            throw HttpError(400, error.message);
        }
        const { id } = req.params;
        const result = await contacts.updateContact(id, req.body);
        if (!result) {
            throw HttpError(404);
        }
        res.status(200).json(result);
    } catch (error) {
        next(error);
    }
});

router.delete("/:contactId", async (req, res, next) => {
    try {
        const { id } = req.params;
        const result = await contacts.removeContact(id);
        if (!result) {
            throw HttpError(404);
        }
        res.json({
            message: "Delete success",
        });
    } catch (error) {
        next(error);
    }
});
module.exports = router;

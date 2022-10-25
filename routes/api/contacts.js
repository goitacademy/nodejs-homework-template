const express = require("express");

const contacts = require("../../models/contacts");

const {RequestError} = require("../../helpers");
const {addSchema} = require("../../schemas/contacts");

const router = express.Router();

router.get("/", async(req, res, next)=> {
    try {
        const result = await contacts.listContacts();
        res.status(200).json(result);
    }
    catch(error) {
        next(error)
    }
})

router.get("/:contactId", async(req, res, next)=> {
    try {
        const {contactId} = req.params;
        const result = await contacts.getContactById(contactId);
        if(!result) {
            throw RequestError(404, "Not found")
        }
        res.status(200).json(result);
    }
    catch(error) {
        next(error);
    }
})

router.post("/", async(req, res, next)=> {
    try {
        const {error} = addSchema.validate(req.body);
        if(error) {
            throw RequestError(400, error.message)
        }
        const result = await contacts.addContact(req.body);
        res.status(201).json(result);
    }
    catch(error){
        next(error);
    }
})

router.put("/:contactId", async(req, res, next)=> {
    try {
        const {error} = addSchema.validate(req.body);
        if(error) {
            throw RequestError(400, error.message)
        }
        const {contactId} = req.params;
        const result = await contacts.updateContact(contactId, req.body);
        if(!result) {
            throw RequestError(404);
        }
        res.status(200).json(result);
    }
    catch(error) {
        next(error)
    }
})

router.delete("/:contactId", async(req, res, next)=> {
    try {
        const {contactId} = req.params;
        const result = await contacts.removeContact(contactId);
        if(!result) {
            throw RequestError(404)
        }
        res.status(200).json({message: "contact deleted"});
    }
    catch(error) {
        next(error)
    }
})

module.exports = router;
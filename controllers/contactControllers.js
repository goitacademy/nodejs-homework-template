const service = require("../service/index")
const { contactSchema } = require("../JoiSchema/index")

const getContacts = async (_, res, next) => {
    try {
        const data = await service.listContacts()
        if (!data) {
            res.status(404).json({ "message": "Not found" })
            return
        }
        res.status(200).json(data)
    } catch (error) {
        next(error)
    }
}
const getContactById = async (req, res, next) => {
    try {
        const data = await service.getContactById(req.params.contactId)
        if (!data) {
            res.status(404).json({ "message": "Not found" })
            return
        }
        res.status(200).json(data)
    } catch (error) {
        next(error)
    }
}
const createContact = async (req, res, next) => {
    try {
        const validatedData = contactSchema.validate(req.body)
        if (typeof validatedData.error !== "undefined") {
            res.status(400).json({ "message": "missing required name field" })
            return
        }
        const newContact = await service.addContact(validatedData.value)
        res.status(201).send(newContact)
    } catch (error) {
        next(error)
    }
}
const deleteContact = async (req, res, next) => {
    try {
        const data = await service.removeContact(req.params.contactId);
        if (!data) {
            res.status(404).json({ "message": "Not found" })
            return
        }
        res.status(200).json({ "message": "contact deleted" })
    } catch (error) {
        next(error)
    }
}
const updateContact = async (req, res, next) => {
    try {
        const { name, email, phone } = req.body;

        if (!name && !email && !phone) {
            res.status(400).json({ "message": "missing fields" });
            return;
        }
        const data = await service.updateContact(req.params.contactId, req.body)
        if (!data) {
            res.status(404).json({ "message": "Not found" })
            return
        }
        res.status(200).json(data)
    } catch (error) {
        next(error)
    }
}
const updateContactByStatus = async (req, res, next) => {
    try {
        const { favorite } = req.body;
        if (typeof favorite !== 'boolean') {
            res.status(400).json({ "message": "only value of favorite!" });
            return;
        }
        const data = await service.updateStatusContact(req.params.contactId, req.body)
        if (!data) {
            res.status(404).json({ "message": "Not found" })
            return
        }
        res.status(200).json(data)
    } catch (error) {
        next(error)
    }
}
module.exports = {
    getContacts,
    getContactById,
    createContact,
    deleteContact,
    updateContact,
    updateContactByStatus
}
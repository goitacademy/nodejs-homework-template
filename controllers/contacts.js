const Contacts = require("../model/contacts");

const listContacts = async (req, res, next) => {
    try {
        const contacts = await Contacts.listContacts()
        return res.status(200).json({ status: "succes", code: 200, data: { contacts } })
    } catch (error) {
        next(error);
    }
};

const getById = async (req, res, next) => {
    try {
        const contact = await Contacts.getById(req.params.id)
        if (contact) {
            return res
                .status(200)
                .json({ status: "succes", code: 200, data: { contact } })
        }
        return res
            .status(404)
            .json({ status: "error", code: 404, message: "Not Found" })
    } catch (error) {
        next(error);
    }
};

const create = async (req, res, next) => {
    try {
        const contact = await Contacts.create(req.body)
        return res
            .status(201)
            .json({ status: "succes", code: 201, data: { contact } })
    } catch (error) {
        next(error);
    }
};

const removeContact = async (req, res, next) => {
    try {
        const contact = await Contacts.removeContact(req.params.id)
        if (contact) {
            return res
                .status(200)
                .json({ status: "succes", code: 200, data: { contact }, "message": "contact deleted" })
        }
        return res
            .status(404)
            .json({ status: "error", code: 404, message: "Not Found" })
    } catch (error) {
        next(error);
    }
};

const updateStatusContact = async (req, res, next) => {
    try {
        const contact = await Contacts.updateStatusContact(req.params.id, req.body)
        if (contact) {
            return res
                .status(200)
                .json({ status: "succes", code: 200, data: { contact } })
        }
        return res
            .status(404)
            .json({ status: "error", code: 404, message: "Not Found" })
    } catch (error) {
        next(error);
    }
};

const update = async (req, res, next) => {
    try {
        const contact = await Contacts.update(req.params.id, req.body)
        if (contact) {
            return res
                .status(200)
                .json({ status: "succes", code: 200, data: { contact } })
        }
        return res
            .status(404)
            .json({ status: "error", code: 404, message: "Not Found" })
    } catch (error) {
        next(error);
    }
};

module.exports = {
    listContacts,
    getById,
    create,
    removeContact,
    updateStatusContact,
    update,
}
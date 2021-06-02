const Contacts = require("../model/contacts");
const {HttpCode}=require("../helpers/constants")

const listContacts = async (req, res, next) => {
    try {
        const userId = req.user.id;
        const {contacts, total, limit, offset} = await Contacts.listContacts(userId, req.query);
        return res.status(HttpCode.OK).json({ status: "succes", code: HttpCode.OK, data: { total,contacts,limit, offset } })
    } catch (error) {
        next(error);
    }
};

const getById = async (req, res, next) => {
    try {
        const userId = req.user.id;
        const contact = await Contacts.getById(userId, req.params.id)
        if (contact) {
            return res
                .status(HttpCode.OK)
                .json({ status: "succes", code: HttpCode.OK, data: { contact } })
        }
        return res
            .status(HttpCode.NOT_FOUND)
            .json({ status: "error", code: HttpCode.NOT_FOUND, message: "Not Found" })
    } catch (error) {
        next(error);
    }
};

const create = async (req, res, next) => {
    try {
        const userId = req.user.id;
        const contact = await Contacts.create({...req.body, owner: userId})
        return res
            .status(HttpCode.CREATED)
            .json({ status: "succes", code: HttpCode.CREATED, data: { contact } })
    } catch (error) {
        next(error);
    }
};

const removeContact = async (req, res, next) => {
    try {
        const userId = req.user.id;
        const contact = await Contacts.removeContact(userId, req.params.id)
        if (contact) {
            return res
                .status(HttpCode.OK)
                .json({ status: "succes", code: HttpCode.OK, data: { contact }, "message": "contact deleted" })
        }
        return res
            .status(HttpCode.NOT_FOUND)
            .json({ status: "error", code: HttpCode.NOT_FOUND, message: "Not Found" })
    } catch (error) {
        next(error);
    }
};

const updateStatusContact = async (req, res, next) => {
    try {
        const userId = req.user.id;
        const contact = await Contacts.updateStatusContact(userId, req.params.id, req.body)
        if (contact) {
            return res
                .status(HttpCode.OK)
                .json({ status: "succes", code: HttpCode.OK, data: { contact } })
        }
        return res
            .status(HttpCode.NOT_FOUND)
            .json({ status: "error", code: HttpCode.NOT_FOUND, message: "Not Found" })
    } catch (error) {
        next(error);
    }
};

const update = async (req, res, next) => {
    try {
         const userId = req.user.id;
        const contact = await Contacts.update(userId, req.params.id, req.body)
        if (contact) {
            return res
                .status(HttpCode.OK)
                .json({ status: "succes", code: HttpCode.OK, data: { contact } })
        }
        return res
            .status(HttpCode.NOT_FOUND)
            .json({ status: "error", code: HttpCode.NOT_FOUND, message: "Not Found" })
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
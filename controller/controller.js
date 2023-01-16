import * as service from "../service/service.js";

const getAll = async (req, res, next) => {
    try {
        const contacts = await service.getAllContacts();
        res.json({
            status: "success",
            code: 200,
            data: contacts,
        });
    } catch (error) {
        next(error);
    }
};

const getOne = async (req, res, next) => {
    const {contactId} = req.params;
    console.log(contactId);
    try {
        const contact = await service.getOneContact(contactId);
        console.log(contact);
        if (contact) {
            res.json({
                status: "success",
                code: 200,
                data: contact,
            });
        } else {
            res.json({
                status: "failure",
                code: 404,
                message: "Not found",
            });
        }
    } catch (error) {
        next(error);
    }
};

const post = async (req, res, next) => {
    try {
        const newContact = await service.createContact(req.body);
        res.json({
            status: "success",
            code: 201,
            message: "New user has been created",
            data: newContact,
        });
    } catch (error) {
        next(error);
    }
};

const deleteContact = async (req, res, next) => {
    const { contactId } = req.params;
    try {
        const contact = await service.deleteContact(contactId);
        if (contact) {
            res.json({
                status: "success",
                code: 200,
                message: "Contact has been deleted",
            });
        } else {
            res.json({
                status: "failure",
                code: 404,
                message: "Not found",
            });
        }
    } catch (error) {
        next(error);
    }
};

const put = async (req, res, next) => {
    const { contactId } = req.params;
    try {
        const contact = await service.updateContact(contactId, req.body);
        if (contact) {
            return res.json({
                status: "success",
                code: 200,
                message: "Contact has been updated",
                data: contact,
            });
        } else {
            return res.status(404).json({
                status: "failure",
                code: 404,
                message: "Not Found",
            });
        }
    } catch (error) {
        next(error);
    }
};

const patchFavorite = async (req, res, next) => {
    const { contactId } = req.params;
    const { favorite } = req.body;
    try {
        const contact = await service.updateContact(contactId, { favorite });
        if (contact) {
            if (favorite) {
                return res.json({
                    status: "success",
                    code: 200,
                    message: "Contact has been added to favorite",
                    data: contact,
                });
            }
            return res.json({
                status: "success",
                code: 200,
                message: "Contact has been removed from favorite",
                data: contact,
            });
        } else {
            return res.status(404).json({
                status: "failure",
                code: 404,
                message: "Not Found",
            });
        }
    } catch (error) {
        next(error);
    }
};

export default  {
    getAll,
    getOne,
    post,
    deleteContact,
    put,
    patchFavorite,
};
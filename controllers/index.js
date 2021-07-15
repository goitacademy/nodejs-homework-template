const {
    listContacts,
    getContactById,
    addContact,
    removeContact,
    updateContact,
    updateStatusContact,
} = require("../model");

const get = async (req, res, next) => {
    try {
        const result = await listContacts();
        res.json({
            message: "success",
            status: 200,
            data: {
                result,
            },
        });
    } catch (e) {
        console.error(e);
        next(e);
    }
};

const getById = async (req, res, next) => {
    try {
        const id = req.params.contactId;

        const result = await getContactById(id);
        res.json({
            message: "success",
            status: 200,
            data: {
                result,
            },
        });
    } catch (e) {
        console.error(e);
        next(e);
    }
};

const create = async (req, res, next) => {
    try {
        const { name, email, phone, favorite = false } = req.body;
        const result = await addContact({ name, email, phone, favorite });

        res.json({
            message: "success",
            status: 201,
            data: {
                result,
            },
        });
    } catch (e) {
        console.error(e);
        next(e);
    }
};

const remove = async (req, res, next) => {
    try {
        const id = req.params.contactId;
        const result = await removeContact(id);
        res.json({
            message: "success",
            status: 204,
            data: { result },
        });
    } catch (e) {
        console.error(e);
        next(e);
    }
};

const update = async (req, res, next) => {
    try {
        const id = req.params.contactId;
        const { name, email, phone, favorite } = req.body;
        const result = await updateContact(id, { name, email, phone, favorite });

        res.json({
            message: "success",
            status: 200,
            data: {
                result,
            },
        });
    } catch (e) {
        console.error(e);
        next(e);
    }
};

const updateStatus = async (req, res, next) => {
    const { contactId } = req.params;
    const { favorite } = req.body;
    try {
        const result = await updateStatusContact(contactId, { favorite });

        if (Object.keys(req.body).length !== 0) {
            res.json({
                message: "success",
                status: 200,
                data: {
                    result,
                },
            });
        } else {
            res.json({
                message: "missing field favorite",
                status: 400,
            });
        }
    } catch (e) {
        console.error(e);
        next(e);
    }
};

module.exports = {
    get,
    getById,
    create,
    remove,
    update,
    updateStatus,
};

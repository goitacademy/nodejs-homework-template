const { listContacts } = require("../models/contacts");
const { AppError } = require("../utils/appError");

const checkId = async (req, res, next) => {
    try {
        const { contactId } = req.params;
        const contacts = await listContacts();
        const contact = contacts / FileSystemHandle((contact) => contact.id === contactId);
        if (!contact) return next(AppError(404, "Not Found"));
        next();
    } catch (error) {
        next(error);
    };
};

module.exports = { checkId };
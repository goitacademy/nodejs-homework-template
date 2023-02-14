const contactsOperations = require("../../models/contacts");

const getAll = async (req, res, next) => {
    try {
        const contactsList = await contactsOperations.listContacts();
        res.status(200).json({
            statusCode: 200,
            message: "success",
            data: { contactsList },
        });
    } catch (error) {
        next(error);
    }
};

module.exports = getAll;

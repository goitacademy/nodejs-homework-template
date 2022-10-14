const contactOperation = require("../../models/contacts");

const getAll = async (req, res, next) => {
    try {
        const contacts = await contactOperation.listContacts();
        res.json({
            status: "success",
            code: 200,
            data: {
                result: contacts,
            },
        });
    } catch (error) {
        next(error);
    }
};

module.exports = getAll;
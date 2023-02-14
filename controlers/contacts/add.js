const contactsOperations = require("../../models/contacts");

const add = async (req, res, next) => {
    try {
        const { body } = req;
        const newContact = await contactsOperations.addContact(body);
        res.status(201).json({
            statusCode: 201,
            message: "success",
            data: { ...newContact },
        });
    } catch (error) {
        next(error);
    }
};

module.exports = add;

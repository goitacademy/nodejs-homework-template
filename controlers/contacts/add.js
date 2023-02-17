const contactsOperations = require("../../models/contacts");

const add = async (req, res) => {
    const { body } = req;
    const newContact = await contactsOperations.addContact(body);
    res.status(201).json({
        statusCode: 201,
        message: "success",
        data: { ...newContact },
    });
};

module.exports = add;

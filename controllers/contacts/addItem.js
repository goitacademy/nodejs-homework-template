const contactsOperation = require("../../models/contacts");

const addItem = async (req, res, next) => {

    const result = await contactsOperation.addContact(req.body);
    res.json({
        status: "success",
        code: 201,
        data: {
            result,
        },
        message: `New contact ${result.name} was created successfully`,
    });
};

module.exports = addItem;
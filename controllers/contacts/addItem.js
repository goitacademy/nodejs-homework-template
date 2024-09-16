const contactsOperation = require("../../models/contacts");
const { createContactValidation, checkContactValidation } = require("../../utils");

const addItem = async (req, res, next) => {
    const { error } = createContactValidation(req.body);

    if (error) {
        checkContactValidation(req, res);
    }

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

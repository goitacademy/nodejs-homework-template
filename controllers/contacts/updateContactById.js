const {NotFound} = require("http-errors");

const contactsOperations = require("../../models/contacts");

const updateContactById = async (req, res) => {
    const {contactId} = req.params;
    const result = await contactsOperations.updateContactById(contactId, req.body);
    if (!result) {
        throw NotFound(`Product with id=${contactId} not found`);
    };
    res.json({
        status: "success",
        code: 200,
        data: {
            result
        }
    })
};

module.exports = updateContactById;

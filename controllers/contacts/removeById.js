const { NotFound } = require("http-errors");
const contactsOperations = require("../../models/contacts");

const removeById = async(req, res) => {
    const { contactId } = req.params;
    const result = await contactsOperations.removeContact(contactId);
    if (!result) {
        throw new NotFound(`Product with id=${contactId} not found`);
    };
     res.json({
        status: "success",
        code: 200,
        message: "product deleted",
        data: result
    })
};

module.exports = removeById;
const contactsOperations = require("../../models/contacts");

const { HttpError } = require("../../routes/api/helpers");

const removeContact = async (req, res, next) => {
    const { contactId } = req.params;
    const result = await contactsOperations.removeContact(contactId);
    if (!result) {
        throw HttpError(404, "Not found");
    }
    res.json({
        status: "success",
        code: 200,
        message: "Product deleted",
        data: {
            result,
        },
    });
};

module.exports = removeContact;
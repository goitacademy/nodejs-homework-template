const contactsOperations = require("../../models/contacts");

const { HttpError } = require("../../routes/api/helpers");

const getContactById = async (req, res, next) => {
    const { contactId } = req.params;
    const result = await contactsOperations.getContactById(contactId);
    if (!result) {
        throw HttpError(404, "Not found");
    }
    res.json({
        status: "success",
        code: 200,
        data: {
            result: result,
        },
    });
};

module.exports = getContactById;
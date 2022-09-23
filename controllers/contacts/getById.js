const contacts = require("../../models/contacts");
const { RequestError } = require("../../helpers");

const getById = async (req, res) => {
    const { contactId } = req.params;
    const result = await contacts.getContactById(contactId);

    if (!result) {
        throw RequestError(404, "Not found");
    }

    res.status(200).json(result);
};

module.exports = getById;
const contacts = require("../../models/contacts");
const { requestError } = require("../../helpers");

const getOneById = async (req, res) => {
    const { contactId } = req.params;
    const result = await contacts.getContactById(contactId);
    if (!result) {
        throw requestError(404, "Not Found");
    }
    res.json(result);
};

module.exports = getOneById;

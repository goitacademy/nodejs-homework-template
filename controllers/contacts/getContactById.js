const contacts = require("../../models/contacts");
const { RequestError } = require("../../helpers");

const getContactById = async (req, res) => {
    const { contactId } = req.params;
    const data = await contacts.getContactById(contactId);

    if (!data) {
        throw RequestError(404, "Not found");
    };

    res.json(data);
};

module.exports = getContactById;
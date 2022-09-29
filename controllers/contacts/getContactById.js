const { Contact } = require("../../models/contact");
const { RequestError } = require("../../helpers");

const getContactById = async (req, res) => {
    const { contactId } = req.params;
    const data = await Contact.findById(contactId);

    if (!data) {
        throw RequestError(404, "Not found");
    };

    res.json(data);
};

module.exports = getContactById;
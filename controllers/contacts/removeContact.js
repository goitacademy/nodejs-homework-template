const contacts = require("../../models/contacts");
const { RequestError } = require("../../helpers");

const removeContact = async (req, res) => {
    const { contactId } = req.params;
    const data = await contacts.removeContact(contactId);

    if (!data) {
        throw RequestError(404, "Not found");
    };

    res.json({ message: "contact deleted" });
};

module.exports = removeContact;
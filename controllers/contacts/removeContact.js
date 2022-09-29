const { Contact } = require("../../models/contact");
const { RequestError } = require("../../helpers");

const removeContact = async (req, res) => {
    const { contactId } = req.params;
    const data = await Contact.findByIdAndRemove(contactId);

    if (!data) {
        throw RequestError(404, "Not found");
    };

    res.json({ message: "Contact deleted" });
};

module.exports = removeContact;
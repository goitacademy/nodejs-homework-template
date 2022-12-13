const { Contact } = require("../../models/contacts");

const updateStatusContact = async (req, res) => {
    const { contactId } = req.params;
    const result = await Contact.findByIdAndUpdate(contactId, req.body, {
        new: true,
    });
    res.json(result);
};

module.exports = updateStatusContact;

const { toggleFavoriteContact } = require("../services/contactsServices");

const updateStatusContact = async (res, req, __) =>  {
    const { contactId } = req.pararms;
    const body = req.body;
    const updatedContact = await toggleFavoriteContact(contactId, body);
    if (!updatedContact) {
        return res.status(404).json({ message: "Not Found" });
}
res.status(200).json(updatedContact);
};

module.exports = updateStatusContact;

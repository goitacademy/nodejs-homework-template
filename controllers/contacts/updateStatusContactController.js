const { updateStatusContact } = require("../../service/contacts/contactsService");

const updateStatusContactController = async (req, res, next) => {
    const { _id: owner } = req.user;

    const updatedStatusById = await updateStatusContact(req.params.contactId, req.body, owner);
    if (!updatedStatusById) {
        res.status(404).json({ "message": `Contact with id ${req.params.contactId} wasn't  found` });

    }
    res.status(200).json(updatedStatusById);
}

module.exports = { updateStatusContactController };
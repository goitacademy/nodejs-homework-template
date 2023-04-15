const { getContactById, removeContact } = require("../../service/contacts/contactsService");


const deleteContactByIdController = async (req, res, next) => {
    const id = req.params.contactId;
    const { _id: owner } = req.user;

    
    const contactById = await getContactById(id, owner);
    if (!contactById) {
        return res.status(404).json({ "message": `Contact with id ${id} wasn't  found` });
    }

    await removeContact(id, owner);
    res.status(200).json({ "message": "contact deleted" });
};

module.exports = { deleteContactByIdController };

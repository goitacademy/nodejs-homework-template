const { getContactById } = require("../../service/contacts/contactsService");

const getContactDataByIdController = async (req, res, next) => {
    const contactId = req.params.contactId;
    const { _id: owner } = req.user;


    const contactDataById = await getContactById(contactId, owner );
    if (!contactDataById) {
        return res.status(404).json({ "message": `Contact with id ${contactId} wasn't  found` });
    }

    res.status(200).json(contactDataById);
};

module.exports = { getContactDataByIdController };
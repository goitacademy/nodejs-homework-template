const { getListContacts } = require("../../service/contacts/contactsService");


const getContactsController = async (req, res, next) => {
    const { _id: owner } = req.user;
    const { page = 1, limit = 20 } = req.query;

    const contacts = await getListContacts(owner, page, limit);
    res.status(200).json({contacts});
};

module.exports = { getContactsController };
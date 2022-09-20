const contactsOperations = require("../../models/contacts");

const getAll = async(req, res) => {
    const contacts = await contactsOperations.listContacts();
    res.status(200).json({
        status: "success",
        code: 200,
        data: contacts
    });

};

module.exports = getAll;


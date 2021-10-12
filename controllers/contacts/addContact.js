const { Contact } = require('../../models');
const { sendSuccessfulRes } = require('../../helpers');

const addContact = async (req, res) => {
    const newContact = {...req.body, owner: req.user._id}
    const result = await Contact.create(newContact);
    sendSuccessfulRes(res, { result }, 201);
};

module.exports = addContact;
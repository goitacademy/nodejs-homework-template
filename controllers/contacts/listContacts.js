const { Contact } = require('../../models');
const { sendSuccessfulRes } = require('../../helpers');

const listContacts = async (req, res) => {
    const result = await Contact.find({}, '_id name email phone favorite');
    sendSuccessfulRes(res, { result });
};

module.exports = listContacts;
const { sendSuccessRes } = require('../../helpers');
const { Contact } = require('../../models');

const listContacts = async (req, res) => {
  const result = await Contact.find({}, '_id name email phone favorite');
  sendSuccessRes(res, { result });
};

module.exports = listContacts;

const { Contact } = require('../../models');
const { sendSuccessRes } = require('../../helpers');

const listContacts = async (req, res) => {
  const {_id} = req.user;
  const result = await Contact.find({owner: _id}, "_id content owner");
  sendSuccessRes(res, { result }, 200)
}

module.exports = listContacts

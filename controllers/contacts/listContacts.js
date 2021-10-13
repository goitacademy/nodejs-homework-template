const { Contact } = require('../../models');
const { sendSuccessRes } = require('../../helpers');

const listContacts = async (req, res) => {

  const {page = 1, limit = 20} = req.query;
  const skip = (page - 1) * limit;
  const { _id } = req.user;
  const result = await Contact.find({owner: _id}, "_id name phone favorite", {skip, limit: +limit});
  sendSuccessRes(res, { result }, 200)
}

module.exports = listContacts

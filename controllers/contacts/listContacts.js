const { Contact } = require('../../models');
const { BadRequest } = require('http-errors');

const listContacts = async (req, res) => {
  const { _id } = req.user;
  const { page = 1, limit = 10, favorite = null } = req.query;

  const reg = new RegExp(/^[0-9]*$/);

  if (reg.test(page) === false || reg.test(limit) === false) {
    throw new BadRequest(`page and limit - not a bad type, there should only be numbers`);
  }

  const skip = (page - 1) * limit;

  if (favorite === null) {
    contacts = await Contact.find({ owner: _id }, '', {
      skip,
      limit: Number(limit),
    }).populate('owner', '_id name email subscription');
    totalPage = contacts.length;
  }

  if (favorite) {
    contacts = await Contact.find({ owner: _id, favorite }, '', {
      skip,
      limit: Number(limit),
    }).populate('owner', '_id name email subscription');
    totalPage = contacts.length;
  }

  res.json({
    status: 'success',
    code: 200,
    message: 'сontants uploaded',
    data: {
      contacts,
      page: Number(page),
      limit: Number(limit),
      totalPage,
      favorite: favorite,
    },
  });
};

module.exports = listContacts;

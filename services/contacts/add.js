const { Contact } = require('../../models/contact');

const add = async (req) => {
  const { _id: owner } = req.user;

  return await Contact.create({ ...req.body, owner });
};

module.exports = add;

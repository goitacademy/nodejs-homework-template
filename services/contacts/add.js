const { Contact } = require('../../models/contact');

module.exports = async (req) => {
  const { _id: owner } = req.user;

  return await Contact.create({ ...req.body, owner });
};

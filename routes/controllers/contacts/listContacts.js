const contactsOps = require('../../../model');

const listContacts = async (req, res, next) => {
  try {
    const allContacts = await contactsOps.listContacts();
    return res.json({ status: 'success', code: 200, data: allContacts });
  } catch (error) {
    next(error);
  }
};

module.exports = listContacts;

const { gettingAllContacts } = require('../../models/contacts');

const getContacts = async (req, res, next) => {
  try {
    const contacts = await gettingAllContacts();
    res
      .status(200)
      .json({ status: 'success', code: 200, payload: { contacts } });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

module.exports = getContacts;

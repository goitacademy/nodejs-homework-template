const { listContacts } = require("../../models/contacts");

const getContacts = async (req, res, next) => {
  try {
    const contacts = await listContacts();
    res.status(200).json({ data: { contacts } });
  } catch (error) {
    next(error);
  }
};

module.exports = getContacts;

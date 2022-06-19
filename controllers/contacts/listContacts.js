const contactsOperations = require("../../services/contacts");

const listContacts = async (req, res, next) => {
  try {
    const result = await contactsOperations.listContacts(req);
    res.status(200).json({ status: "success", code: 200, data: { result } });
  } catch (error) {
    next(error);
  }
};

module.exports = listContacts;

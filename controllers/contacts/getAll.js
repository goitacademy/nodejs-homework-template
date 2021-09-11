const Contacts = require("../../repositories/contacts");
const getAll = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const contacts = await Contacts.listContacts(userId);
    return res.json({ status: "success", code: 200, data: { contacts } });
  } catch (e) {
    next(e);
  }
};

module.exports = getAll;

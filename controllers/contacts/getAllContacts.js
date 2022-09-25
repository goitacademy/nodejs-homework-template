const { listContacts } = require("../../models/contacts");

const getAll = async (req, res, next) => {
  try {
    const list = await listContacts();
    res.status(200);
    res.json({ contacts: JSON.parse(`${list}`) });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
module.exports = getAll;

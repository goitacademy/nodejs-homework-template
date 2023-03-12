const { listContacts } = require("../../models/contacts");

exports.listContacts = async (req, res, next) => {
  try {
    res.status("200").json(await listContacts());
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

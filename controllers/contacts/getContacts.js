const { listContacts } = require("../../models/index");

const getContacts = async (req, res) => {
  const { _id } = req.user;
  const { page = 1, limit = 10 } = req.query;
  const contacts = await listContacts({ owner: _id, page, limit });

  res.status(200).json({
    contacts,
    status: "success",
  });
};

module.exports = { getContacts };

const { listContacts } = require("../../models/index");

const getContacts = async (req, res) => {
  const { _id } = req.user;
  const contacts = await listContacts({ owner: _id });

  res.status(200).json({
    contacts,
    status: "success",
  });
};

module.exports = { getContacts };

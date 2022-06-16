const { Contact } = require("../../models");

const getAll = async (req, res) => {
  const { _id } = req.user;

  const contacts = await Contact.find({ owner: _id }).populate(
    "owner",
    "_id, name, email"
  );
  res.json({
    status: 200,
    data: { contacts },
  });
};

module.exports = getAll;

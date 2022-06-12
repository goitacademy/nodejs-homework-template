const { Contact } = require("../../models");

const getAll = async (req, res) => {
  const contacts = await Contact.find();
  res.json({
    status: 200,
    data: { contacts },
  });
};

module.exports = getAll;

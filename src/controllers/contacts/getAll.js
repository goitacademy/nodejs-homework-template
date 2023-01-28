const { getAllContacts } = require("../../models/index");

const getAll = async (req, res) => {
  const contacts = await getAllContacts();
  res.json({
    status: 'success',
    code: 200,
    data: { result: contacts },
  });
};


module.exports = getAll;
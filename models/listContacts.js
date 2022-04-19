const { getAllContacts } = require('../utils');

const listContacts = async (req, res) => {
  const contacts = await getAllContacts();
  res.json({
    status: "success",
    code: 200,
    data: {
      result:contacts
    }
  });
};

module.exports = listContacts;
const { Contact } = require('../../models');

const getAll = async (req, res) => {
  const contacts = await Contact.find({});
  res.json({
    status: 200,
    code: 200,
    data: {
      result: contacts,
    },
  });
};

module.exports = getAll;

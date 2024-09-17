const { Contact } = require('../../models');

const getAll = async (req, res) => {
  const { _id: owner } = req.user;

  const contacts = await Contact.find({ owner }).populate('owner', 'name email');
  res.json({
    status: 'success',
    code: 200,
    data: {
      contacts,
    },
  });
};

module.exports = getAll;
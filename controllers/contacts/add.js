const { Contact } = require('../../models');

const add = async (req, res) => {
  const addedContact = await Contact.create(req.body);

  res.status(201).json({
    status: 'success',
    cose: 201,
    data: {
      addedContact,
    },
  });
};

module.exports = add;

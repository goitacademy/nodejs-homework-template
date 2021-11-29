const { Contact } = require('../model/contact');

const updateContacts = async (req, res) => {
  const result = await Contact.create(req.body);

  res.status(201).json({
    status: 'success',
    code: 201,
    data: {
      result,
    },
  });
};

module.exports = updateContacts;

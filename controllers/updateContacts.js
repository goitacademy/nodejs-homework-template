const { Contact } = require('../model/contact');

const updateContacts = async (req, res) => {
  console.log('-0-0-0-0-0', req.user);
  const newContact = { ...req.body, owner: req.user._id };
  const result = await Contact.create(newContact);

  res.status(201).json({
    status: 'success',
    code: 201,
    data: {
      result,
    },
  });
};

module.exports = updateContacts;

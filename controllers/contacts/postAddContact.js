const { Contact } = require('../../models');

const postAddContact = async (req, res) => {
  const { _id } = req.user;
  console.log('req-postAddContact', req.body);
  const result = await Contact.create({ ...req.body, owner: _id });

  res.status(201).json({
    status: 'success',
    code: 201,
    data: {
      result,
    },
  });
};

module.exports = postAddContact;

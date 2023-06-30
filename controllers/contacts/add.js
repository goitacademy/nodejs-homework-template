const { Contact } = require('../../models');

const add = async (req, res) => {
  const contact = await Contact.create(req.body);
  res.status(201).json({
    status: 'success',
    code: 201,
    data: { contact },
  });
};

module.exports = add;

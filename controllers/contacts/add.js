const {Contact} = require('../../models');

const add = async (req, res) => {
  const newContact = await Contact.create(req.body);
  return res
      .status(201)
      .json({status: 'success', code: 201, data: newContact});
};

module.exports = add;

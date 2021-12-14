const { Contact } = require('../../models');

const add = async (req, res) => {
  const result = await Contact.create(req.body);
  res.status(201).json({
    status: 201,
    code: 201,
    data: {
      result: result,
    },
  });
};

module.exports = add;

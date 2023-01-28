const {addContact} = require('../../models/index');

const addById = async (req, res) => {
  const result = await addContact(req.body);
  res.status(200).json({
    status: 'created',
    code: 200,
    data: { result },
  });
};

module.exports = addById;
const { Contact } = require('../../models');
const { NotFound } = require('http-errors');

const updateStatusContacts = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  const result = await Contact.findByIdAndUpdate(id, { status }, { new: true });
  if (!result) {
    throw new NotFound(`not found`);
  }
  /*
  res.json({
    status: 'success',
    code: 200,
    data: {
      result,
    },
  });*/
  res.status(200).json({
    result,
  });
};

module.exports = updateStatusContacts;

const { Contact } = require('../../models');
const { httpError } = require('../../utils');

const updateContact = async (req, res) => {
  const { id } = req.params;

  const result = await Contact.findByIdAndUpdate({ _id: id }, req.body, {
    new: true,
  });

  if (!result) {
    throw httpError(404);
  }
  res.json(result);
};

module.exports = updateContact;

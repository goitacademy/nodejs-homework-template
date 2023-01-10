const { Contact } = require('../../models');
const { httpError } = require('../../utils');

const deleteContact = async (req, res) => {
  const { id } = req.params;
  const result = await Contact.findByIdAndRemove(id);

  if (!result) {
    console.log(req.params);
    console.error('not found');
    throw httpError(404);
  }
  res.json({ message: 'contact deleted' });
};

module.exports = deleteContact;

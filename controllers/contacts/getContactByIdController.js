const { getContactById } = require('../../models/index');

const getContactByIdController = async (req, res) => {
  const id = req.params.contactId;
  const contact = await getContactById(id);
  if (contact === null) {
    return res.status(404).json({ message: 'Not found!' });
  }
  return res.json({ contact });
};

module.exports = { getContactByIdController };

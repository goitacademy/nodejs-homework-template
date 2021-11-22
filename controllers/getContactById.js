const { Contact } = require('../model/contact');

const getById = async (req, res) => {
  const { contactId } = req.params;

  const result = await Contact.findById(contactId);
  if (!result) {
    res.status(404).send({ message: 'Not found' });
  }

  res.json(result);
};

module.exports = getById;

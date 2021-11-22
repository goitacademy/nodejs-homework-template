const { Contact } = require('../model/contact');

const updateContact = async (req, res) => {
  const { contactId } = req.params;

  const result = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });

  if (!result) {
    res.status(404).send({ message: 'Not found' });
  }

  res.json({ status: 'success', code: 201, data: { result } });
};

module.exports = updateContact;

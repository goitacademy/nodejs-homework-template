const { Contact } = require('../../models/contact');

const update = async (req, res) => {
  const { contactId } = req.params;
  const updatedContact = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });
  res.json(updatedContact);
};

module.exports = update;

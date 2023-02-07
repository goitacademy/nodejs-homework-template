const { Contact } = require('../../models/contact');

const {requestError} = require('../../helpers')

const getContactById = async (req, res) => {
  const { contactId } = req.params;
  const data = await Contact.findById(contactId);
  if (!data) throw requestError(404, "Not found");
  res.json(data);
};


module.exports = getContactById;
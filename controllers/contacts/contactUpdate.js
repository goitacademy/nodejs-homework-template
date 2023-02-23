const contscts = require('../../models/contacts');
const { RequestError } = require('../../helpers');

const contactUpdate = async (req, res) => {
  const { id } = req.params;

  const result = await contacts.updateContact(id, req.body);

  if (!result) {
    throw RequestError(404, 'Not found');
  }
  res.json(result);
};

module.exports = contactUpdate;
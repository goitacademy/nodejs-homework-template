const { Contact } = require('../../models/contact');

const { RequestError } = require('../../helpers');

const update = async (req, res) => {
  const {
    params: { contactId },
    body,
  } = req;

  if (Object.keys(body).length === 0) {
    throw RequestError(400, 'missing fields');
  }

  const result = await Contact.findByIdAndUpdate(contactId, body, {
    new: true,
  });

  if (!result) {
    throw RequestError(404, 'Not found');
  }

  res.json(result);
};

module.exports = update;

const { Contact } = require('../../models/contact');
const { RequestError } = require('../../helpers');

const updateStatusContact = async (req, res) => {
  if (Object.keys(req.body).length === 0) {
    throw RequestError(400, 'missing field favorite');
  }

  const { contactId } = req.params;
  const result = await Contact.findOneAndUpdate({ _id: contactId }, req.body, {
    new: true,
  });

  if (!result) {
    throw RequestError(404, 'Not found');
  }

  console.log(result);
  res.json(result);
};

module.exports = updateStatusContact;

const { NotFound } = require('http-errors');
const { Contact } = require('../model/contact');

const updateStatusContact = async (req, res) => {
  const { contactId } = req.params;
  const { favorite } = req.body;
  if (!favorite) res.status(400).json({ message: 'missing field favorite' });

  const result = await Contact.findByIdAndUpdate(contactId, { favorite }, { new: true });
  if (!result) throw new NotFound(`Product with id ${id} was not found`);

  res.json({
    status: 'success',
    code: 200,
    data: {
      result,
    },
  });
};

module.exports = updateStatusContact;

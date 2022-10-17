const { NotFound } = require('http-errors');

const { Contact } = require('../../models');

const updateStatusContact = async (req, res) => {
  const { contactId } = req.params;
  const { favorite } = req.body;

  const result = await Contact.findByIdAndUpdate(contactId, { favorite }, { new: true });

  if (!result) {
    throw new NotFound(`Not found id=${contactId}`);
  }

  res.json({
    status: 200,
    code: 200,
    data: {
      result,
    },
  });
};

module.exports = updateStatusContact;

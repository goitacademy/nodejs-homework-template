const { Contact } = require('../../models');

const { NotFound } = require('http-errors');

const updateFavorite = async (req, res) => {
  const { contactId } = req.params;
  const { favorite } = req.body;
  

  const contact = await Contact.findByIdAndUpdate(contactId, { favorite }, { new: true });

  if (!contact) {
    throw new NotFound();
  }

  res.json({
    status: 'success',
    code: 200,
    data: {
      contact,
    },
  });
};

module.exports = updateFavorite;

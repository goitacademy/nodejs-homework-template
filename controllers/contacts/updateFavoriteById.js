const { NotFound } = require('http-errors');
const { Contact } = require('../../models');

const updateFavoriteById = async (req, res) => {
  const { contactId } = req.params;
  const { favorite } = req.body;
  const result = await Contact.findByIdAndUpdate(contactId, { favorite }, { new: true });

  if (!result) {
    throw new NotFound();
  };

  res.status(200).json({
    status: 'success',
    code: 200,
    data: {
      result,
    },
  })
};

module.exports = updateFavoriteById
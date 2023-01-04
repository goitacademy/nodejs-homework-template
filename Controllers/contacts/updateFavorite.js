const { Contact } = require('../../models');
const { NotFound } = require('http-errors');

const updateFavorite = async (req, res) => {
  const { id } = req.params;
  const { favorite } = req.body;
  const contact = await Contact.findByIdAndUpdate(
    id,
    { favorite },
    { new: true },
  );
  if (!contact) {
    throw new NotFound(`Contact with id:${id} not found`);
  }
  return res.json({ status: 'success', code: 200, data: { contact } });
};

module.exports = updateFavorite;

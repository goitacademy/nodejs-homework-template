const { Contact } = require('../../models/contact');

const listContacts = async (req, res) => {
  const { _id: owner } = req.user;

  // обработка пагинации
  const { page = 1, limit = 20, favorite = '' } = req.query;
  const skip = (page - 1) * limit;
  const result = await Contact.find(
    { owner, favorite: favorite === '' ? [true, false] : favorite }, //поиск по favorite
    'name phone favorite',
    {
      skip,
      limit,
    }
  ).populate('owner', 'email');
  res.json(result);
};

module.exports = listContacts;

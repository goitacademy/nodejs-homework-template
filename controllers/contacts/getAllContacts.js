const { Contact } = require('../../schema');

async function getAllContacts(req, res, next) {
  try {
    const { _id: owner } = req.user;
    const { page = 1, limit = 20, favorite = false } = req.query;
    const skip = (page - 1) * limit;
    const filterFavorite = favorite ? { favorite: true } : null;
    const result = await Contact.find({ owner, ...filterFavorite }, '-createdAt -updatedAt', {
      skip,
      limit,
    }).populate('owner', 'email subscription');
    res.json(result);
  } catch (error) {
    next(error);
  }
}

module.exports = { getAllContacts };

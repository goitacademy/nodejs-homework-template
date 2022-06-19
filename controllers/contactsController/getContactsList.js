const { Contact } = require('../../models');
async function getContactsList(req, res, next) {
  try {
    const { _id } = req.user;
    const { page = 1, limit = 20, favorite } = req.query;
    const skip = (page - 1) * limit;
    if (favorite) {
      const contactsFavorite = await Contact.find({ owner: _id, favorite }, '', {
        skip,
        limit: Number(limit),
      }).populate('owner', '_id name email');
      res.json({
        status: 'success',
        code: 200,
        data: {
          contactsFavorite,
        },
      });
    } else {
      const contacts = await Contact.find({ owner: _id }, '', { skip, limit: Number(limit) }).populate(
        'owner',
        '_id name email',
      );
      res.json({
        status: 'success',
        code: 200,
        data: {
          contacts,
        },
      });
    }
  } catch (error) {
    next(error);
  }
}
module.exports = getContactsList;

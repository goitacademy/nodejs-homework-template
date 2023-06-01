const { patchFavoriteContact } = require('../services');

const patchFavorite = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const response = await patchFavoriteContact(contactId, req.body);
    res.status(200).json({ status: 'Succsess', data: response });
  } catch (error) {
    next(error);
  }
};

module.exports = patchFavorite;
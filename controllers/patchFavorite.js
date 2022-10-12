const { Contacts } = require('../models/contacts');
const { createReject } = require('../utils');

const patchFavorite = async (req, res, next) => {
  try {
    const { contactId } = req.params;

    if (!req.body?.favorite) {
      throw createReject(400, 'you can change only favorite');
    }
    const result = await Contacts.findByIdAndUpdate(contactId, {
      favorite: req.body.favorite,
    });
    if (!result) {
      throw createReject(404, 'Not found');
    }

    const response = { ...result._doc, ...req.body };
    res.status(200).json({ status: 'Succsess', data: response });
  } catch (error) {
    next(error);
  }
};

module.exports = patchFavorite;

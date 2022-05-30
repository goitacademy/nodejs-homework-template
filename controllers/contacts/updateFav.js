const { isValidObjectId } = require('mongoose');
const { createError } = require('../../helpers');
const { Contact, shemas } = require('../../models/contact');

const updateFav = async (req, res, next) => {
  try {
    const { error } = shemas.upd.validate(req.body);
    if (error) {
      throw createError(400, 'missing fileds');
    }
    const { contactId } = req.params;
    const isValid = isValidObjectId(contactId);
    if (!isValid) {
      throw createError(404);
    }
    const result = await Contact.findByIdAndUpdate(contactId, req.body, {
      new: true,
    });
    if (!result) {
      throw createError(404);
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
};

module.exports = updateFav;

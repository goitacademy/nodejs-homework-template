const { Contact, favoriteSchema } = require('../../models/contacts');

const favoriteUpdate = async (req, res, next) => {
  try {
    const { id } = req.params;

    const { error } = favoriteSchema.validate(req.body);
    if (error) {
      error.status = 400;
      throw error;
    }
    const { favorite } = req.body;

    const result = await Contact.findByIdAndUpdate(id, { favorite }, { new: true });

    res.status(201).json({
      status: 'success',
      code: 201,
      data: { result },
    });
  } catch (e) {
    next(e);
  }
};

module.exports = favoriteUpdate;

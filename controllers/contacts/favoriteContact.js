const { Contact } = require('../../models/contact');
const { NotFound } = require('http-errors');

const updateFavoriteStatus = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const { favorite } = req.body;
    if (!favorite) {
      res.json({ message: 'missing request field' });
    }
    const result = await Contact.findByIdAndUpdate(
      contactId,
      { favorite },
      {
        new: true,
      }
    );

    if (!result) {
      throw new NotFound(404);
    }
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

module.exports = updateFavoriteStatus;

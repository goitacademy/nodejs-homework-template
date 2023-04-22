const { NotFound } = require("http-errors");
const contact = require("../../models/contact");

const updateFavoriteById = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await contact.findByIdAndUpdate(contactId, req.body, {
      new: true,
    });

    if (!result) {
      throw new NotFound(`Not found`);
    }

    res.json(result);
  } catch (error) {
    next(error);
  }
};

module.exports = updateFavoriteById;

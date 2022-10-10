const { Contact } = require("../../models/contact");
const { requestError } = require("../../helpers");
const { schemas } = require("../../models/contact");

const updateStatusContact = async (req, res, next) => {
  try {
    const { error } = schemas.updateFavoriteSchema.validate(req.body);
    if (error) {
      throw requestError(400, "missing field favorite");
    }
    const { contactId } = req.params;
    const result = await Contact.findByIdAndUpdate(contactId, req.body, {
      new: true,
    });
    if (!result) {
      throw requestError(404, "Not found");
    }
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

module.exports = updateStatusContact;

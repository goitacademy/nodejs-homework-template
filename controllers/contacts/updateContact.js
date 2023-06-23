const Contact = require("../../models/contact");

const { HttpError } = require("../../helpers");
const { contactAddSchema } = require("../../schemas");

const updateContact = async (req, res, next) => {
  try {
    const { error } = contactAddSchema.validate(req.body);

    if (error) {
      throw HttpError(400, error.message);
    }
    const { contactId } = req.params;
    const result = await Contact.findByIdAndUpdate(contactId, req.body, { new: true });

    if (!result) {
      throw HttpError(404, `Contact with id: ${contactId} not found`);
    }

    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

module.exports = updateContact;

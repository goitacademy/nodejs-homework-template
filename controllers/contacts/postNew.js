const Contact = require("../../models/contact");
const contactShemas = require("../../schemas/contacts");
const { HttpError } = require("../../helpers");

const postNew = async (req, res, next) => {
  try {
    const { error } = contactShemas.validatingSchema.validate(req.body);
    if (error) {
      throw HttpError(400, "Missing required name field");
    }

    const result = await Contact.create(req.body);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

module.exports = postNew;

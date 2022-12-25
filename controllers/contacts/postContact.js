const Contacts = require("../../models/contact");
const { HttpError } = require("../../helpers/HttpError");
const {addSchema} = require('../../Schemes/schameJoi');

const postContact = async (req, res, next) => {
  try {
    const { error } = addSchema.validate(req.body);

    if (error) {
      throw HttpError(400, "Missing required name field");
    }
    const result = Contacts.create(req.body);

    res.status(201).json(result);

  } catch (error) {
    next(error);
  }
}

module.exports = postContact;
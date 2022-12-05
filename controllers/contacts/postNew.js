const { addContact } = require("../../models/contacts");
const { validatingSchema } = require("../../schemas/contacts");
const { HttpError } = require("../../helpers");

const postNew = async (req, res, next) => {
  try {
    const { error } = validatingSchema.validate(req.body);
    if (error) {
      throw HttpError(400, "Missing required name field");
    }

    const objToPost = { id: String(Math.random()), ...req.body };
    const result = await addContact(objToPost);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

module.exports = postNew;

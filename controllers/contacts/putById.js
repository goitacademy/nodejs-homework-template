const Joi = require("joi");
const mongoose = require("mongoose");
const { HttpError, ctrlWrapper } = require("../../helpers");
const Contact = require("../../models/contacts");
const putById = async (req, res) => {
  const id = req.params.contactId;

  const contactNew = {
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    favorite: req.body.favorite,
  };
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw HttpError(400, "Invalid Id");
  }
  const schema = Joi.object({
    name: Joi.string(),
    email: Joi.string().email(),
    phone: Joi.string().min(10).max(15),
    favorite: Joi.boolean(),
  });
  const { error } = schema.validate(req.body);
  if (error) {
    throw HttpError(400, "missing fields");
  }
  const newContact = await Contact.findByIdAndUpdate(id, contactNew, {
    new: true,
  });
  const contactOn = await Contact.findById(id);
  if (contactOn === null) {
    throw HttpError(404, "Not found");
  }
  if (contactOn.owner.toString() !== req.user.id.toString()) {
    throw HttpError(404, "Not found");
  }

  if (newContact) {
    return res.status(201).send(newContact);
  }
  throw HttpError(404, "Not found");
};
module.exports = { putById: ctrlWrapper(putById) };

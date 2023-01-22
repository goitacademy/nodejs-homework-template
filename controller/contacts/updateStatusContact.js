const Contacts = require("../../models/contacts");
const contactStatusSchema = require("../../schemas/Joi/contactStatusSchema");
const { BadRequest, NotFound } = require("http-errors");

const updateStatusContact = async (req, res, next) => {
  try {
    const { error } = contactStatusSchema.validate(req.body);
    const { _id } = req.user;

    if (error) {
      throw next(BadRequest(error.message));
    }

    const { contactId } = req.params;
    const contact = await Contacts.findOne({ _id: contactId, owner: _id });

    if (!contact) {
      throw next(NotFound("Not Found"));
    }

    const updatedContact = await Contacts.findOneAndUpdate(
      { _id: contactId, owner: _id },
      req.body,
      { new: true }
    );

    res.status(200).json(updatedContact);
  } catch (error) {
    next(error);
  }
};

module.exports = updateStatusContact;

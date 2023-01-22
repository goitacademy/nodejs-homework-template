const schema = require("../../schemas/Joi/contactStatusSchema");
const Contacts = require("../../models/contacts");
const { BadRequest, NotFound } = require("http-errors");

// change contact by Id
const changeContact = async (req, res, next) => {
  try {
    const { error } = schema.validate(req.body);
    const { contactId } = req.params;
    const { _id } = req.user;

    // audit required fields
    if (error) {
      next(BadRequest(error.message));
    }

    // audit contact by Id
    const contact = await Contacts.findOne({ _id: contactId, owner: _id });
    if (!contact) {
      next(NotFound("Not Found"));
    }

    const updatedContact = await Contacts.findOneAndUpdate(
      { _id: contactId, owner: _id },
      req.body
    );

    res.status(200).json(updatedContact);
  } catch (error) {
    next(error);
  }
};

module.exports = changeContact;

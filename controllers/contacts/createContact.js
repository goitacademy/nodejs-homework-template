const { createContactSchema } = require("../../schemas");
const { ContactModel } = require("../../database/models");
const { mapContactOutput } = require("./services");

async function createContact(req, res, next) {
  try {
    const { name, email, phone, favorite } = req.body;

    const { error } = createContactSchema.validate({
      name,
      email,
      phone,
      favorite,
    });
    if (error) {
      const err = new Error(error.message);
      err.code = 400;
      throw err;
    }

    const newContact = await ContactModel.create({
      name,
      email,
      phone,
      favorite,
    });

    const mappedContact = mapContactOutput(newContact);
    res.status(201).json(mappedContact);
  } catch (error) {
    next(error);
  }
}

module.exports = {
  createContact,
};

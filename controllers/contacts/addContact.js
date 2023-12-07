const { Contact, schemas } = require("../../models/contact");

const addContact = async (req, res, next) => {
  try {
    const { error } = schemas.addSchema.validate(req.body);

    if (error) {
      error.status = 400;
      throw error;
    }
    const result = await Contact.create(req.body);
    res.status(201).json({ status: "success", code: 201, data: { result } });
  } catch (error) {
    next(error);
  }
};

module.exports = addContact;
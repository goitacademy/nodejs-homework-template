const { Contact } = require("../../models/contact");

// const { createError } = require("../../helpers");

const addContact = async (req, res) => {
  // const { error } = schemas.contactsAddSchema.validate(req.body);
  // if (error) {
  //   throw createError(400, error.message);
  // }
  const result = await Contact.create(req.body);
  res.status(201).json({
    status: "success",
    code: 201,
    data: {
      result,
    },
  });
};

module.exports = addContact;

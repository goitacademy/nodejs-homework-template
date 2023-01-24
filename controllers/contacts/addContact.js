const contactsOperations = require("../../models/contacts");

const addContact = async (req, res) => {
  const { name, email, phone } = req.body;
  const result = await contactsOperations.asyncHandler(
    contactsOperations.addContact,
    name,
    email,
    phone
  );

  res.status(201).json({
    status: "success",
    code: 201,
    message: `contact posted`,
    data: { result },
  });
};

module.exports = addContact;

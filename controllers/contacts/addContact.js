const validationSchema = require("../../schemas");
const contactsOperations = require("../../models/contacts");

const addContact = async (req, res, next) => {
  const { error } = validationSchema.validate(req.body);
  if (error) {
    res.json({
      status: "error",
      code: 400,
      message: "missing required name field",
    });
  }
  try {
    const result = await contactsOperations.addContact(req.body);
    res.json({
      status: "success",
      code: 201,
      data: { result },
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      code: 500,
      message: "Server error",
    });
  }
};
module.exports = addContact;

const validationSchema = require("../../schemas");
const contactsOperations = require("../../models/contacts");

const updateContact = async (req, res, next) => {
  const { error } = validationSchema.validate(req.body);
  if (error) {
    res.json({
      status: "error",
      code: 400,
      message: "missing required name field",
    });
  }
  try {
    const { contactId } = req.params;
    const result = await contactsOperations.updateContact(contactId, req.body);

    if (!result) {
      res.status(404).json({
        status: "error",
        code: 404,
        message: `Contact with id ${contactId} not found`,
      });
      return;
    }

    res.json({
      status: "success",
      code: 200,
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
module.exports = updateContact;

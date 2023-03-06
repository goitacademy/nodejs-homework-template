const contactsOperations = require("../../models/contacts");
const schema = require("../../schema/shema");

const updateContact = async (req, res, next) => {
  try {
    const { error } = schema.validate(req.body);
    if (error) {
      res.status(400).json({
        status: "error",
        code: 400,
        message: "missing required name field",
      });
    }
    const { contactId } = req.params;
    const result = await contactsOperations.updateContact(contactId, req.body);
    console.log(result);
    res.status(201).json({
      status: "success",
      code: 201,
      data: {
        result,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = updateContact;

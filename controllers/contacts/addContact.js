const contactsOperations = require("../../models/contacts");
const schema = require("../../schema/shema");

const addContact = async (req, res, next) => {
  try {
    const { error } = schema.validate(req.body);
    if (error) {
      res.status(400).json({
        status: "error",
        code: 400,
        message: "missing required name field",
      });
    }
    const result = await contactsOperations.addContact(req.body);
    res.status(201).json({
      status: "success",
      code: 201,
      data: {
        result,
      },
    });
    console.log(req.body);
  } catch (error) {
    next(error);
  }
};

module.exports = addContact;

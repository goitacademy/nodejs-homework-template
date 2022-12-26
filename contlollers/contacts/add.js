const contactOperations = require("../../models/contacts");

const add = async (req, res, next) => {
  const { body } = req;

  const contact = await contactOperations.addContact(body);
  res.status(201).json({
    status: "success",
    code: 201,
    data: { result: contact },
  });
};

module.exports = add;

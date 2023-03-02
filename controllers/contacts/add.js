const contactOperations = require("../../models/contacts");

const add = async (req, res) => {
  const { body } = req;
  const addedContact = await contactOperations.addContact(body);
  res.status(201).json({
    status: "success",
    code: 201,
    data: {
      result: addedContact,
    },
  });
};

module.exports = add;

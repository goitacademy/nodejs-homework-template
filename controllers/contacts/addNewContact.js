const { addContact } = require("../../models/contacts");

const addNewContact = async (req, res, next) => {
  const result = await addContact(req.body);
  res.status(201).json({
    status: "success",
    code: 201,
    data: {
      result,
    },
  });
};

module.exports = addNewContact;

const { addContact } = require("../../models/contacts");

const postAddContact = async (req, res) => {
  const result = await addContact(
    req.body.name,
    req.body.email,
    req.body.phone
  );

  res.status(201).json({
    status: "success",
    code: 201,
    data: {
      result,
    },
  });
};

module.exports = postAddContact;

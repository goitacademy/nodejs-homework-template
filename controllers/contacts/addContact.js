const { Contact } = require("../../models/contacts");


const addContact = async (req, res, next) => {
  const { _id: owner } = req.user;
  const body = req.body;
  const newContact = await Contact.create({ ...body, owner });
  res.status(201).json({
    status: "success",
    code: 201,
    data: {
      newContact,
    },
  });
};
module.exports = addContact;

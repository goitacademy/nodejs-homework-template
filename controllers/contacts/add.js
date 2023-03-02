const { Contact } = require("../../models/contact");

const add = async (req, res) => {
  const { _id } = req.user;
  const { body } = req;
  const addedContact = await Contact.create({ ...body, owner: _id });
  res.status(201).json({
    status: "success",
    code: 201,
    data: {
      result: addedContact,
    },
  });
};

module.exports = add;

const Contact = require("../../models/contact");

const postContact = async (req, res) => {
  const { _id } = req.user;
  const result = await Contact.create({ ...req.body, owner: _id });

  res.status(201).json({
    status: "success",
    code: 201,
    message: "Add new contact",
    data: {
      result,
    },
  });
};

module.exports = postContact;

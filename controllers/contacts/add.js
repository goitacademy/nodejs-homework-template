const { Contact } = require("../../models");

const add = async (req, res) => {
  const { email, phone, name } = req.body;

  const checkExistingUser = await Contact.findOne({
    $or: [{ email }, { phone }, { name }],
  });
  if (checkExistingUser) {
    throw new Error(
      `The USER with name: ${name} OR email: ${email} OR phone :${phone} has already in database  `
    );
  }

  const { _id } = req.user;
  const result = await Contact.create({ ...req.body, owner: _id });
  res.status(201).json({
    status: "success",
    code: 201,
    data: { result },
  });
};

module.exports = add;

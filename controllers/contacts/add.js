const Contact = require("../../models/contact");

const add = async (req, res) => {
  const {
    body,
    user: { userId },
  } = req;

  const result = await Contact.create({
    favorite: false,
    ...body,
    owner: userId,
  });
  res.status(201).json(result);
};

module.exports = add;

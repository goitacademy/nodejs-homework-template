const Contact = require("../../models/Contacts");
const { createError } = require("../../helpers");

async function updateById(req, res) {
  const { id } = req.params;
  const { _id } = req.user;
  const { name, email, phone, favorite } = req.body;

  const result = await Contact.findByIdAndUpdate(
    { _id: id, owner: _id },
    {
      name,
      email,
      phone,
      favorite,
    },
    { new: true }
  );

  if (!result) {
    throw createError({ status: 404, message: "Not Found" });
  }

  res.status(201).json(result);
}

module.exports = updateById;

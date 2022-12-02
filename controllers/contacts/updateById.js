const Contact = require("../../models/Contacts");
const { createError } = require("../../helpers");

async function updateById(req, res) {
  const { id } = req.params;
  const { name, email, phone, favorite } = req.body;

  const result = await Contact.findByIdAndUpdate(
    id,
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

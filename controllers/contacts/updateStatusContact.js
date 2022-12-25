const Contact = require("../../models/Contacts");
const { createError } = require("../../helpers");

async function updateStatusContact(req, res) {
  const { id } = req.params;
  const { _id } = req.user;
  const { favorite } = req.body;

  const result = await Contact.findByIdAndUpdate(
    { _id: id, owner: _id },
    {
      favorite,
    },
    { new: true }
  );

  if (!result) {
    throw createError({ status: 404, message: "Not Found" });
  }

  res.status(200).json(result);
}

module.exports = updateStatusContact;

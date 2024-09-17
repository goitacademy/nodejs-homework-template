const { Contact } = require("../../models");
const createError = require("http-errors");

const updateContact = async (req, res) => {
  const { id } = req.params;
  const { name, email, phone } = req.body;
  const result = await Contact.findByIdAndUpdate(
    id,
    { name, email, phone },
    { new: true }
  );

  if (!result) {
    throw createError(404, `contact with id: ${id} not found`);
  }

  res.status(201).json({
    status: "succes",
    code: 201,
    data: {
      result,
    },
  });
};

module.exports = updateContact;

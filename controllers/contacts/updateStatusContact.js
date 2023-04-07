const { Contact } = require("../../models");
const createError = require("http-errors");

const updateStatusContact = async (req, res) => {
  const { id } = req.params;
  const { favorite } = req.body;
  const result = await Contact.findByIdAndUpdate(
    id,
    { favorite },
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

module.exports = updateStatusContact;

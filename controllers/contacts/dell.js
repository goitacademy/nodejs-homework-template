const { Contact } = require("../../models");
const createError = require("http-errors");

const dell = async (req, res) => {
  const { _id } = req.user;
  const { id } = req.params;

  const result = await Contact.findOneAndRemove({ _id: id, owner: _id });
  if (!result) {
    throw createError(415, `Unsupported Media`);
  }

  res.status(201).json({
    status: "succes",
    massege: "Contact deleted",
    code: 201,
    dellatedContact: result,
  });
};

module.exports = dell;

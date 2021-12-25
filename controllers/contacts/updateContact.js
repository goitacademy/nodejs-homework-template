const createError = require("http-errors");
const { Contact } = require("../../model");

const updateContact = async (req, res) => {
  const { id } = req.params;
  const result = await Contact.findByIdAndUpdate(id, req.body, { new: true });
  if (!result) {
    throw new createError(404, {
      message: `Contact with id=${id} not found`,
    });
  }
  res.status(200).json(result);
};
module.exports = updateContact;

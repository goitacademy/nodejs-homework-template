const { Contact } = require("../../models/contact");
// const createError = require("http-errors");

const updateFavoriteById = async (req, res) => {
  const id = req.params.contactId;
  const { favorite } = req.body;
  const result = await Contact.findByIdAndUpdate(
    id,
    { favorite },
    { new: true }
  );
  if (!result) {
    const error = new Error("missing field favorite");
    error.status = 400;
    throw error;
  }
  res.status(200).json({ status: "success", data: result });
};
module.exports = updateFavoriteById;

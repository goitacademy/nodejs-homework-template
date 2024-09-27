const Contact = require("../../models/contact");
const { HttpError } = require("../../helpers");

const updateContactById = async (req, res) => {
  const { id } = req.params;
  const result = await Contact.findByIdAndUpdate(id, req.body, { new: true });
  if (!result) {
    throw HttpError(404, `Contact with id: ${id} is not found`);
  }
  res.status(200).json(result);
};

module.exports = updateContactById;

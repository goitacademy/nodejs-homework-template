const { Contact } = require("../../models/contact");
const { requestError } = require("../../helpers");

const deleteById = async (req, res, next) => {
  const { id } = req.params;
  const result = await Contact.findByIdAndDelete(id);
  if (!result) {
    throw requestError(404, `Product with id=${id} not found`);
  }
  res.json({
    message: "contact deleted",
  });
};

module.exports = deleteById;

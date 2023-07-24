const { Contact } = require("../../models");
const { FindByIdError, ctrlWrap } = require("../../helpers");

const deleteContact = async (req, res) => {
  const { id } = req.params;
  const result = await Contact.findByIdAndRemove(id);
  FindByIdError(result);
  res.status(200).json({
    message: "contact deleted",
  });
};
module.exports = ctrlWrap(deleteContact);

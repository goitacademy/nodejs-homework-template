const { Contact } = require("../../models");
const service = require("../../service");

const deleteContact = async (req, res) => {
  const { id } = req.params;
  const result = await Contact.findByIdAndRemove(id);
  service.CheckByError(!result, 404);
  res.status(200).json({
    message: "contact deleted",
  });
};
module.exports = service.ctrlWrap(deleteContact);

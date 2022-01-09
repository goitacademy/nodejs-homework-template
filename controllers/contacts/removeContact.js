const { NotFound } = require("http-errors");
const { Contact } = require("../../models");

const removeContact = async (req, res) => {
  const { id } = req.params;
  const result = await Contact.findByIdAndRemove(id);
  if (!result) {
    throw new NotFound(`Contact with id=${id} not found`);
  }
  res
    .status(200)
    .json({ status: "success", code: 200, message: `Contact deleted` });
};
module.exports = removeContact;

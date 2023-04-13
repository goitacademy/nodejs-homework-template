const { Contact } = require("../../models/contact");
const { requestError } = require("../../helpers");

const updateById = async (req, res, next) => {
  const { id } = req.params;
  const result = await Contact.findByIdAndUpdate(id, req.body, { new: true });
  if (!result) {
    throw requestError(404, `not found`);
  }
  res.json(result);
};
module.exports = updateById;

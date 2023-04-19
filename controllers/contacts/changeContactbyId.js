const { HttpError } = require("../../helpers");
const { Contact } = require("../../models");
const { ctrlWrapper } = require("../../utils");

const changeContactbyId = async (req, res) => {
  const { id } = req.params;
  const result = await Contact.findByIdAndUpdate(id, req.body, { new: true });
  if (!result) {
    throw HttpError(404, `Contact with ${id} not found `);
  }
  res.json(result);
};

module.exports = {
  changeContactbyId: ctrlWrapper(changeContactbyId),
};

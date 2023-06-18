const { HttpError, ctrlWrapper } = require("../../helpers");
const {
  ContactModel: { Contact },
} = require("../../models");

const getContactById = async (req, res) => {
  const { id } = req.params;
  const result = await Contact.findById({ _id: id });
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.status(200).json(result);
};

module.exports = {
  getContactById: ctrlWrapper(getContactById),
}; 

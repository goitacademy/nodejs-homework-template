const { Contact } = require("../../models");
const { HttpError, ctrlBox } = require("../../helpers");

const updateContactById = async (req, res) => {
  const { contactId } = req.params;
  const result = await Contact.findByIdAndUpdate(
    contactId,
    req.body,

    {
      new: true,
    }
  );
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.json(result);
};

module.exports = ctrlBox(updateContactById);

const { getContactById } = require("../../services");
const { RequestError } = require("../../helpers");

const getContactByIdController = async (req, res) => {
  const owner = req.user._id;
  const { contactId } = req.params;
  
  const contact = await getContactById(contactId, owner);

  if (!contact || !contact.length) {
    throw new RequestError(404, "Not found");
  }

  res.status(200).json({
    status: "success",
    contact,
  });
};

module.exports = getContactByIdController;

const { UpsErrors, ctrlWraper } = require("../../Helpers");
const { Contact } = require("../../models/contact");

const listContacts = async (req, res) => {
  const { _id: owner } = req.user;
  const {page = 1, limit = 10} = req.query;
  const skip = (page -1) * limit;
  const result = await Contact.find({ owner }, "-createdAt -updatedAt", {skip, limit}).populate("owner", "name email");
  if (!result) {
    throw UpsErrors(404, "Request faild");
  }
  res.json(result);
};

module.exports = ctrlWraper(listContacts);

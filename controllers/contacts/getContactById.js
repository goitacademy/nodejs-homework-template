const { Contact } = require("../../models/contact");
const { RequestError } = require("../../helpers");

const getContactById = async (req, res) => {
  const { id } = req.params;
  const { _id: owner } = req.user;
  const result = await Contact.findById(id, { owner }).populate(
    "owner",
    "_id name email"
  );
  if (!result) {
    throw RequestError(404, `Contact with id=${id} not found`);
  }
  res.json(result);
};

module.exports = getContactById;

const {Contact} = require("../../models")

const getContactList = async (req, res) => {
  const { _id: owner } = req.user;
  const { page = 1, limit = 10, ...favorite } = req.query;
  const skip = (page - 1) * limit;

  const contacts = await Contact.find({owner, ...favorite}, "-createdAt -updatedAt", {skip, limit});
  res.status(200).json(contacts);
}

module.exports = getContactList;
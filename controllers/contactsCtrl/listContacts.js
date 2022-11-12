const { Contact } = require('../../models');

const listContacts = async (req, res, next) => {
  const { _id: owner } = req.user;

  const { page = 1, limit = 10, favorite = false } = req.query;
  const skip = (page - 1) * limit;
  const ownerParams = { owner };
  if (favorite === true) {
    ownerParams.favorite = true;
  }
  const contacts = await Contact.find({ owner }, ownerParams, "-createdAt -updatedAt", { skip, limit }).populate("owner", "name email")
  
  return res.json({
    status: "success",
    code: 200,
    result: contacts,
  })
}

module.exports = listContacts;


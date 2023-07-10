const {
  contactsModel: { Contact },
} = require("../../models");
const { ctrlWrapper } = require("../../helpers");

const getAllContacts = async (req, res) => {
  const { _id: owner } = req.user;
  const { page = 1, limit = 20, favorite = "" } = req.query;
  const skip = (page - 1) * limit;
  if (favorite === "true") {
    const filteredResult = await Contact.find(
      { owner, favorite: true },
      "-createdAt -updatedAt",
      {
        skip,
        limit,
      }
    ).populate("owner", "email subscription");
    return res.json(filteredResult);
  }

  const result = await Contact.find({ owner }, "-createdAt -updatedAt", {
    skip,
    limit,
  }).populate("owner", "name email");
  res.json({ result, page, limit });
};

module.exports = { getAllContacts: ctrlWrapper(getAllContacts) };

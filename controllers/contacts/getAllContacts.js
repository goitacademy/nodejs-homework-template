const { Contact } = require("../../models/contact");

const getAllContacts = async (req, res) => {
  const { _id: owner } = req.user;
  const { page = 1, limit = 20 } = req.query;
  const skip = (page - 1) * limit;

  //const contacts = await Contact.find({ owner }, "-createdAt -updatedAt", {
  //  skip,
  //  limit,
  //}).populate("owner", "name email");
  let contacts;
  const { favorite } = req.query;

  //console.log(favorite);
  //console.log(parsedFavorite);

  if (!favorite) {
    console.log("noFavoriteQuery".yellow);
    contacts = await Contact.find({ owner }, "-createdAt -updatedAt", {
      skip,
      limit,
    }).populate("owner", "name email");
  } else {
    const parsedFavorite = JSON.parse(favorite);
    console.log("favoriteQuery".yellow);
    contacts = await Contact.find(
      { $and: [{ owner }, { favorite: parsedFavorite }] },
      "-createdAt -updatedAt",
      {
        skip,
        limit,
      }
    ).populate("owner", "name email");
  }

  res.json(contacts);
};

module.exports = getAllContacts;
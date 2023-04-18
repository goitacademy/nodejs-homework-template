const { Contact } = require("../../models/contact");

const getAllContacts = async (req, res) => {
  const { _id: owner } = req.user;
  //Реалізовуємо пагінацію
  const { page = 1, limit = 10 } = req.query;
  const skip = (page - 1) * limit;
  //Реалізовуємо фільтрацію контактів по favorite
  const { favorite } = req.query;
  if (favorite === undefined) {
    const result = await Contact.find({ owner }, "-createdAt -updatedAt", {
      skip,
      limit,
    }).populate("owner", "email subscription");
    res.json(result);
  }
  if (favorite) {
    const result = await Contact.find(
      { owner, favorite },
      "-createdAt -updatedAt",
      {
        skip,
        limit,
      }
    ).populate("owner", "email subscription");
    res.json(result);
  }
};

module.exports = getAllContacts;

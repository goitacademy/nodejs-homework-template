const { Contact } = require("../../models/Contact");

const { ctrlWrapper } = require("../../decorators");

const getAll = async (req, res) => {
  const { _id: owner } = req.user;

  const { favorite } = req.query;
  if (favorite) {
    const result = await Contact.find(
      { owner },
      "-createdAt -updatedAt"
    ).populate("owner", "email");
    const favorite = result.filter((contact) => contact.favorite);

    res.json(favorite);
  } else {
    const { page = 1, limit = 20 } = req.query;
    const skip = (page - 1) * limit;
    const result = await Contact.find({ owner }, "-createdAt -updatedAt", {
      skip,
      limit,
    }).populate("owner", "email");
    res.json(result);
  }
};

module.exports = ctrlWrapper(getAll);

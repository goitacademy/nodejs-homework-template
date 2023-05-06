const { Contact } = require("../../models");
const { ctrlWrapper, HttpError } = require("../../helpers");

const getFavorite = async (req, res) => {
  const { favorite } = req.query;
  const { _id: owner } = req.user;
  const { page = 1, limit = 20  } = req.query;
  const skip = (page - 1) * limit;

  try {
    let contacts;
    if (favorite === "true") {
      contacts = await Contact.find(
        { favorite: true, owner },
        "-createdAt -updatedAt",
        {
          skip,
          limit,
        }
      );
    } else {
      contacts = await Contact.find();
    }

  return  res.status(200).json({ contacts });
  } catch {
    next(HttpError(400));
  }
};

module.exports = { getFavorite: ctrlWrapper(getFavorite) };

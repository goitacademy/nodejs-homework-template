const { HttpError } = require("../../helpers");
const Contact = require("../../models/contact.js");

const getAll = async (req, res, next) => {
  const { id } = req.user;
  const { page = 1, limit = 10, favorite = [true, false] } = req.query;
  const skip = (page - 1) * limit;
  try {
    const contacts = await Contact.find(
      {
        owner: id,
        favorite,
      },
      "-createdAt -updatedAt"
    )
      .populate("owner", "_id email")
      .skip(skip)
      .limit(parseInt(limit));

    if (contacts.length === 0) {
      throw new HttpError(404, "There are no contacts in the database");
    }
    if (contacts.length > 0) {
      console.log(`The number of contacts is: ${contacts.length}`.success);
      res.status(200).json({
        message: `The number of contacts is: ${contacts.length}`,
        contacts,
      });
    }
  } catch (error) {
    next(error);
  }
};

module.exports = getAll;

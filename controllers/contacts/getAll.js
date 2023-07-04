const { HttpError } = require("../../helpers");
const Contact = require("../../models/contact.js");

const getAll = async (req, res, next) => {
  try {
    const { id } = req.user;
    const { page = 1, limit = 20, favorite } = req.query;
    const skip = (page - 1) * limit;

    const query = { owner: id };

    if (favorite !== undefined) {
      query.favorite = favorite === "true";
    }

    const totalContacts = await Contact.countDocuments(query);
    const contacts = await Contact.find(query)
      .populate("owner", "_id email")
      .skip(skip)
      .limit(parseInt(limit));

    if (contacts.length === 0) {
      throw new HttpError(404, "There are no contacts in the database");
    }
    if (contacts.length > 0) {
      console.log(`The number of contacts is: ${totalContacts}`.success);
      res.status(200).json({
        message: `The number of contacts is: ${totalContacts}`,
        page: Number(page),
        limit: Number(limit),
        totalContacts,
        contacts,
      });
    }
  } catch (error) {
    next(error);
  }
};

module.exports = getAll;

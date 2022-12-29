const { Contact } = require("../../models/contact");

const listContacts = async (req, res) => {
  const { _id } = req.user;
  const { page = 1, limit = 20, favorite } = req.query;
  const contacts = await getContacts(_id, page, limit, favorite);
  res.json({
    status: "success",
    code: 200,
    data: {
      result: contacts,
    },
  });
};

const getContacts = async (_id, page, limit, favorite) => {
  try {
    if (favorite) {
      const contacts = await Contact.find({ favorite}).populate(
        "owner",
        "_id email subscription"
      );
      return contacts;
    } else {
      const skip = (page - 1) * limit;
      const contacts = await Contact.find(
        { owner: _id },
        "-createdAt -updatedAt",
        {
          skip,
          limit: Number(limit),
        }
      ).populate("owner", "_id email subscription");
      return contacts;
    }
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = listContacts;

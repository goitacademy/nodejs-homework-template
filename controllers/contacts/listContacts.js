const { Contact } = require("../../models");

const listContacts = async (req, res, next) => {
  const { _id: owner } = req.user;
  try {
    const result = await Contact.find(
      { owner },
      "-createdAt -updatedAt"
    ).populate("owner", "email");

    res.json(result);
  } catch (error) {
    next(error);
  }
};

module.exports = listContacts;

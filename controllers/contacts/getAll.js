const { Contact } = require("../../models/contacts");


const getAll = async (req, res) => {
  try {
    const { _id: owner } = req.user;
    const result = await Contact.find(
      { owner },
      "-createdAt -updatedAt"
    ).populate("owner", "email subscription");
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = getAll;

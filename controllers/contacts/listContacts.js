const { basedir } = global;

const { Contact } = require(`${basedir}/models/contact`);

const listContacts = async (req, res) => {
  const { id: owner } = req.user;
  const { page = 1, limit = 5 } = req.query;

  const skip = (page - 1) * limit;
  const result = await Contact.find({ owner }, "-createdAt -updatedAt", {
    skip,
    limit: Number(limit),
  }).populate("owner", "name email");

  res.json({
    status: "success",
    code: 200,
    data: {
      result,
    },
  });
};

module.exports = listContacts;

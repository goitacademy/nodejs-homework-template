const Contact = require("../../models/contactModel");

const getAll = async (req, res) => {
  const result = await Contact.find({}, "-createdAt -updatedAt");

  res.json({
    status: "success",
    code: 200,
    data: {
      result,
    },
  });
};

module.exports = getAll;

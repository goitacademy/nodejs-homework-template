const { Contact } = require("../../models/contact");

const getAll = async (_, res) => {
  const allContact = await Contact.find({}, "-createdAt -updatedAt");
  res.json({
    status: "success",
    code: 200,
    data: {
      result: allContact,
    },
  });
};

module.exports = getAll;

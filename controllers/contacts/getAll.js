
const { Contact } = require("../../models/contact");

const getAll = async (req, res, next) => {
  const contacts = await Contact.find({});

  res.json({
    status: "success",
    code: 200,
    data: {
      contacts,
    },
  });
};
module.exports = getAll;

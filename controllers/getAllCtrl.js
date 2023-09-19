const Contact = require("../models/model_contact");

const getAllCtrl = async (req, res) => {
  const contactsList = await Contact.find({});
  res.json({
    status: "Success",
    code: 200,
    data: {
      result: contactsList,
    },
  });
};

module.exports = getAllCtrl;

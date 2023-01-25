const { Contact } = require("../../models/contact");

const getByID = async (req, res, next) => {
  const { id } = req.params;
  const result = await Contact.findById(id);

  res.json({
    status: "success",
    code: 200,
    data: {
      result,
    },
  });
};

module.exports = getByID;

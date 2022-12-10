const { Contact } = require("../../models");

const updatedContact = async (req, res, next) => {
  const { id } = req.params;
  const result = await Contact.findByIdAndUpdate(id, req.body, { new: true });
  res.json({
    status: "success",
    code: 200,
    data: {
      result,
    },
  });
};

module.exports = updatedContact;

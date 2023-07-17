const { Contact } = require("../../models/contact");

const updateStatus = async (req, res) => {
  const { id } = req.params;
  const {favorite} = req.body;
  if (!favorite) {
    res.status(400);
    res.json({
      status: "error",
      code: 400,
      message: "Missing field favorite",
    });
  }
  const result = await Contact.findByIdAndUpdate(id, {favorite}, {new: true});
  res.json({
    status: "success",
    code: 200,
    data: {
      result,
    },
  });
};

module.exports = updateStatus;
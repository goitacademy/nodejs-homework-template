const { Contact } = require("../../models/contact");

const updateStatus = async (req, res, next) => {
  const { id } = req.params;
  const { favorite } = req.body;
  const result = await Contact.findByIdAndUpdate(
    id,
    { favorite },
    { new: true }
  );

  res.json({
    status: "success",
    code: 200,
    message: `updated status of contact ${result.name} with id:${id}`,
    data: {
      result,
    },
  });
};

module.exports = updateStatus;

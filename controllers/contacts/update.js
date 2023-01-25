const { Contact } = require("../../models/contact");

const update = async (req, res, next) => {
  const { id } = req.params;
  const result = await Contact.findByIdAndUpdate(id, req.body, { new: true });

  res.json({
    status: "success",
    code: 200,
    message: `updated contact ${req.body.name} with id:${id}`,
    data: {
      result,
    },
  });
};

module.exports = update;

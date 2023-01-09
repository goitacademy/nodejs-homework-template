const { Contact } = require("../../models");

const updateContact = async (req, res, next) => {
  const contactId = req.params.id;
  const userId = req.user._id;
  const result = await Contact.findOneAndUpdate(
    { contactId, userId },
    req.body,
    {
      new: true,
    }
  );

  if (!result) {
    throw new NotFound("Not found");
  }

  res.json({
    status: "success",
    code: 200,
    data: {
      result,
    },
  });
};

module.exports = updateContact;

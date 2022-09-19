const { contacts: operations } = require("../../services");

const updateById = async (req, res) => {
  const { _id: userId } = req.user;
  const contactId = req.params.contactId;

  const updatedContact = await operations.updateById(
    contactId,
    req.body,
    userId
  );

  res.status(200).json({ status: "success", updatedContact });
};

module.exports = updateById;

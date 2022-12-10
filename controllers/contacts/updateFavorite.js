const { Contact } = require("../../models");

const updateFavorite = async (req, res) => {
  const { contactId } = req.params;
  const { favorite } = req.body;

  if (favorite === null || favorite === undefined) {
    res.status(400).json(`missing field favorite`);
  }

  const result = await Contact.findByIdAndUpdate(
    contactId,
    { favorite },
    {
      new: true,
    }
  );
  res.status(200).json({ result });
};

module.exports = updateFavorite;

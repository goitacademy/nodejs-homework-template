const { Contact } = require("../../models");

const updateFavorite = async (req, res) => {
  const { contactId } = req.params;
  const { favorite } = req.body;
  console.log(req.body);
  const result = await Contact.findByIdAndUpdate(
    contactId,
    { favorite },
    {
      new: true,
    }
  );
  console.log(result);
  if (favorite === null || favorite === undefined) {
    res.status(400).json(`missing field favorite`);
  }
  res.status(200).json({ result });
};

module.exports = updateFavorite;

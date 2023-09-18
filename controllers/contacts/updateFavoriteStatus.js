const { updateStatusContact } = require("../../utils/contactsService");

const updateFavoriteStatus = async (req, res, next) => {
  try {
    const { favorite } = req.body;

    if (typeof favorite === "undefined") {
      return res.status(400).json({ message: "missing field favorite" });
    }

    const updatedContact = await updateStatusContact(
      req.params.contactId,
      favorite
    );

    if (updatedContact) {
      res.json(updatedContact);
    } else {
      res.status(404).json({ message: "Not found" });
    }
  } catch (error) {
    next(error);
  }
};

module.exports = updateFavoriteStatus;

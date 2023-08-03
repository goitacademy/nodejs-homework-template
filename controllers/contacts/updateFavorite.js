const updateStatusContact = require("./updateStatusContact");

const updateFavorite = async (req, res) => {
  const { id } = req.params;
  const { body } = req;
  try {
    const updatedContact = await updateStatusContact(id, body);

    if (!updatedContact) {
      return res.status(404).json({ message: "Not found" });
    }

    res.status(200).json(updatedContact);
  } catch (error) {
    if (error.message === "missing field favorite") {
      res.status(400).json({ message: "missing field favorite" });
    } else {
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
};

module.exports = updateFavorite;

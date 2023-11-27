const getContacts = async (req, res) => {
  try {
    // const contacts = await loadContacts();
    res.json(contacts);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

module.exports = getContacts;

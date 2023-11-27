


const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
};

const deleteContacts = async (req, res) => {
  try {
    //const contacts = await loadContacts();
    const contactId = req.params.id;
    const contactIndex = contacts.findIndex((c) => c.id === contactId);

    if (contactIndex === -1) {
      return res.status(HTTP_STATUS.NOT_FOUND).json({ message: "Not found" });
    }

    const deletedContact = contacts.splice(contactIndex, 1)[0];
    // await saveContacts(contacts);
    res.json({ message: "Contact deleted successfully", deletedContact });
  } catch (error) {
    console.error(error);
    res
      .status(HTTP_STATUS.INTERNAL_SERVER_ERROR)
      .json({ message: "Internal Server Error" });
  }
};

module.exports = deleteContacts;

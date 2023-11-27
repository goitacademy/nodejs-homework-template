const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  NOT_FOUND: 404,
  BAD_REQUEST: 400,
  INTERNAL_SERVER_ERROR: 500,
};

const updateContacts = async (req, res) => {
  try {
    // const contacts = await loadContacts();
    const contactId = req.params.id;
    const contactIndex = contacts.findIndex((c) => c.id === contactId);

    if (contactIndex === -1) {
      return res.status(HTTP_STATUS.NOT_FOUND).json({ message: "Not found" });
    }

    const { error } = validateContact(req.body);

    if (error) {
      return res
        .status(HTTP_STATUS.BAD_REQUEST)
        .json({ message: error.details[0].message });
    }

    const updatedContact = {
      id: contactId,
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      favorite: contacts[contactIndex].favorite,
    };

    contacts[contactIndex] = updatedContact;
    // await saveContacts(contacts);
    res.json({ message: "Contact updated successfully", updatedContact });
  } catch (error) {
    console.error(error);
    res
      .status(HTTP_STATUS.INTERNAL_SERVER_ERROR)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

module.exports = updateContacts;

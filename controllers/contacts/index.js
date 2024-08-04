const {
  createNewContact,
  deleteContact,
  fetchContact,
  fetchContacts,
  updateContact,
  updateStatusContact,
} = require("./services.js");

const getAllContacts = async (req, res, page, limit) => {
  try {
      const userId = req.user._id;
      const { favorite } = req.query;
      const contacts = await fetchContacts(userId, page, limit, favorite);
      res.json(contacts);
  } catch (err) {
      console.error(err);
      res.status(500).json(err);
  }
};

const getContact = async (req, res) => {
  try {
      const userId = req.user._id;
      const contact = await fetchContact(userId, req.params.contactId);
      if (!contact) {
          console.log("Contact not found");
          return res.status(404).json({ message: "Contact not found" });
      }
      res.json(contact);
  } catch (err) {
      console.error(err);
      res.status(500).json(err);
  }
};

const createContact = async (req, res) => {
  try {
      const userId = req.user._id;
      const newContact = await createNewContact(userId, req.body);
      console.log("Contact created successfully:", newContact);
      res.status(201).json(newContact);
  } catch (err) {
      console.error(err);
      res.status(500).json(err);
  }
};

const deleteContactById = async (req, res) => {
  try {
      const userId = req.user._id;
      const deletedContact = await deleteContact(
          userId,
          req.params.contactId
      );
      if (deletedContact) {
          console.log("Contact deleted successfully:", deletedContact);
          res.json({ message: "Contact deleted successfully" });
      } else {
          console.log("Contact not found");
          res.status(404).json({ message: "Contact not found" });
      }
  } catch (err) {
      console.error(err);
      res.status(500).json(err);
  }
};

const updateContactById = async (req, res) => {
  try {
      const userId = req.user._id;
      const updatedContact = await updateContact(
          userId,
          req.params.contactId,
          req.body
      );
      if (updatedContact) {
          console.log("Contact updated successfully:", updatedContact);
          res.json(updatedContact);
      } else {
          console.log("Contact not found");
          res.status(404).json({ message: "Contact not found" });
      }
  } catch (err) {
      console.error(err);
      res.status(500).json(err);
  }
};

const updateFavoriteStatus = async (req, res) => {
  try {
      const userId = req.user._id;
      const { favorite } = req.body;
      if (!favorite) {
          return res.status(400).json({ message: "Missing field favorite" });
      }
      const updatedContact = await updateStatusContact(
          userId,
          req.params.contactId,
          favorite
      );
      if (updatedContact) {
          console.log(
              "Favorite status updated successfully:",
              updatedContact
          );
          res.json(updatedContact);
      } else {
          console.log("Contact not found");
          res.status(404).json({ message: "Contact not found" });
      }
  } catch (err) {
      console.error(err);
      res.status(500).json(err);
  }
};

module.exports = {
  getAllContacts,
  getContact,
  createContact,
  deleteContactById,
  updateContactById,
  updateFavoriteStatus,
};
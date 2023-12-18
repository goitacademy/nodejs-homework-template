import * as contactService from "../../models/contactsModel.js";

const getAllContacts = async (req, res) => {
  try {
    const result = await contactService.listContacts();
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getContactById = async (req, res) => {
  try {
    const result = await contactService.listContacts();
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export default {
  getAllContacts,
  getContactById,
};

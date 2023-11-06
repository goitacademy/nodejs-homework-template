// controllers\contacts.js
const service = require("../services/contacts");

const listContacts = async (req, res) => {
  try {
    // console.log(req.query);
    const { success, result, message } = await service.listContacts();
    if (!success) {
      return res.status(400).json({
        result,
        message,
      });
    }

    return res.status(200).json({
      result,
      message,
    });
  } catch (error) {
    return res.status(500).json({
      result: null,
      message: error,
    });
  }
};

const getContactById = async (req, res) => {
  try {
    console.log(req.params.id);
    const id = req.params.id;
    const { success, result, message } = await service.getContactById(id);
    if (!success) {
      return res.status(400).json({
        result,
        message,
      });
    }

    return res.status(200).json({
      result,
      message,
    });
  } catch (error) {
    return res.status(500).json({
      result: null,
      message: error,
    });
  }
};

const removeContact = async (req, res) => {
  try {
    console.log(req.params.id);
    const id = req.params.id;
    const { success, result, message } = await service.removeContact(id);
    if (!success) {
      return res.status(400).json({
        result,
        message,
      });
    }

    return res.status(200).json({
      result,
      message,
    });
  } catch (error) {
    return res.status(500).json({
      result: null,
      message: error,
    });
  }
};

const addContact = async (req, res) => {
  try {
    const { success, result, message } = await service.addContact(req.body);
    console.log(result);

    if (!success) {
      return res.status(400).json({
        result,
        message,
      });
    }

    return res.status(201).json({
      result,
      message,
    });
  } catch (error) {
    return res.status(500).json({
      result: null,
      message: error,
    });
  }
};

const updateContact = async (req, res) => {
  try {
    const { id } = req.params;

    const { success, result, message } = await service.updateContact(
      id,
      req.body
    );
    console.log(result);

    if (!success) {
      return res.status(400).json({
        result,
        message,
      });
    }

    return res.status(200).json({
      result,
      message,
    });
  } catch (error) {
    return res.status(500).json({
      result: null,
      message: error,
    });
  }
};

const updateStatusContact = async (req, res) => {
  try {
    const { contactId } = req.params;
    const { favorite } = req.body;

    const { success, result, message } = await service.updateStatusContact(
      contactId,
      favorite
    );

    console.log(result);

    if (favorite === undefined) {
      return res.status(400).json({
        result,
        message: "missing field favorite",
      });
    }

    if (!success) {
      return res.status(404).json({
        result,
        message,
      });
    }

    return res.status(200).json({
      result,
      message,
    });
  } catch (error) {
    return res.status(500).json({
      result: null,
      message: error,
    });
  }
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateStatusContact,
};

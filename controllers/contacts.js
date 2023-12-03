// controllers\contacts.js
const service = require("../services/contacts");

const getContactOwner = async (req, res) => {
  try {
    const owner = req.user.Id;
    const { skip, limit, favorite } = req.query;

    const query = { owner };
    if (favorite !== undefined) {
      query.favorite = favorite;
    }

    const { success, result, message } = await service.getContactOwner(
      query,
      skip,
      limit
    );

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

const getContactOwnerById = async (req, res) => {
  try {
    const owner = req.user.Id;
    const { id } = req.params;

    const { success, result, message } = await service.getContactOwnerById(
      id,
      owner
    );

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
    const owner = req.user.Id;
    const { id } = req.params;

    const { success, result, message } = await service.removeContact(id, owner);

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

const updateFavoriteContact = async (req, res) => {
  try {
    const owner = req.user.Id;
    const { id } = req.params;
    const { favorite } = req.body;

    const { success, result, message } = await service.updateFavoriteContact(
      id,
      favorite,
      owner
    );

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

// contact
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
// pend
const getContactById = async (req, res) => {
  try {
    // console.log(req.params.id);
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
// pend

const addContact = async (req, res) => {
  try {
    const body = req.body;
    body.owner = req.user.Id;

    const { success, result, message } = await service.addContact(body);
    // console.log(result);

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

module.exports = {
  // contact
  listContacts,
  getContactById,
  addContact,
  // User
  getContactOwner,
  getContactOwnerById,
  removeContact,
  updateFavoriteContact,
};

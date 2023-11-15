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

const updateContactSubscription = async (req, res) => {
  try {
    const owner = req.user.Id;
    const { id } = req.params;
    const { subscription } = req.body;

    if (
      subscription &&
      !["starter", "pro", "business"].includes(subscription)
    ) {
      return res
        .status(400)
        .json({ result: null, message: "Ïnvalid subscription value" });
    }

    const { success, result, message } =
      await service.updateContactSubscription(id, subscription, owner);

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
    const owner = req.user.Id;
    const { id } = req.params;
    const { favorite } = req.body;

    const { success, result, message } = await service.updateStatusContact(
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

module.exports = {
  getContactOwner,
  getContactOwnerById,
  removeContact,
  updateContactSubscription,
  updateStatusContact,
};

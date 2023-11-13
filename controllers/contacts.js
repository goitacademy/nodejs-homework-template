// controllers\contacts.js
const service = require("../services/contacts");

const getContactOwner = async (req, res) => {
  try {
    // console.log(req.params.owner);
    const owner = req.params.owner;
    const { skip, limit, favorite } = req.query;
    // console.log("test: ", req.query);

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
    // console.log(req.params.owner);
    const { owner, id } = req.params;
    // console.log("test: ", req.query);

    const { success, result, message } = await service.getContactOwnerById(
      owner,
      id
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

const getContactCurrent = async (req, res) => {
  try {
    // console.log(req.params.owner);
    const id = req.user;

    const { success, result, message } = await service.getContactCurrent(id);

    if (!success) {
      return res.status(401).json({
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
    // console.log(req.params.id);
    const { owner, id } = req.params;
    const { success, result, message } = await service.removeContact(owner, id);
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

const updateContact = async (req, res) => {
  try {
    const { owner, id } = req.params;
    const { subscription } = req.body;
    // console.log("sub ", subscription);
    // console.log("sub1 ", id);

    if (
      subscription &&
      !["starter", "pro", "business"].includes(subscription)
    ) {
      return res
        .status(400)
        .json({ result: null, message: "Ïnvalid subscription value" });
    }

    const { success, result, message } = await service.updateContact(
      owner,
      id,
      subscription
    );
    // console.log("1 ", result);

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
    const { owner, id } = req.params;
    const { favorite } = req.body;
    // console.log('id; ', id);

    const { success, result, message } = await service.updateStatusContact(
      owner,
      id,
      favorite
    );

    // console.log("cons ", result);

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

const updateTokenRemove = async (req, res) => {
  try {
    const { id } = req.params;
    // console.log('contID: ', id);

    const token = null;

    const { success, result, message } = await service.updateTokenRemove(
      id,
      token
    );

    // console.log(result);

    // if (token === undefined) {
    //   return res.status(400).json({
    //     result,
    //     message: "missing field favorite",
    //   });
    // }

    if (!success) {
      return res.status(401).json({
        result,
        message,
      });
    }

    return res.status(204).json({
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
  getContactCurrent,
  removeContact,
  // addContact,
  updateContact,
  updateTokenRemove,
  updateStatusContact,
};

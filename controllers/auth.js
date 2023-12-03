// service/auth.js
const service = require("../services/auth");
const Jimp = require("jimp");
// const {SECRET_KEY} = require('../utils/variables')

const signup = async (req, res) => {
  try {
    // const token = req.headers.authorization.split(" ")[1];
    // const payload = jwt.verify(token, SECRET_KEY);
    // req.body.owner = payload.Id;

    const { success, result, message } = await service.signup(req.body);

    if (!success) {
      if (message === "Email in use") {
        return res.status(409).json({
          result,
          message,
        });
      } else {
        return res.status(400).json({
          result,
          message,
        });
      }
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

const login = async (req, res) => {
  try {
    const { email, password, active } = req.body;

    const { success, result, message } = await service.login(
      email,
      password,
      active
    );

    if (!success) {
      if (message === "Email or password is wrong") {
        return res.status(401).json({
          result,
          message,
        });
      } else {
        return res.status(400).json({
          result,
          message,
        });
      }
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

const current = async (req, res) => {
  try {
    const owner = req.user.Id;
    let id = req.params.id;

    if (!id) {
      id = owner;
    }

    const { success, result, message } = await service.current(id, owner);

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

const logout = async (req, res) => {
  try {
    const owner = req.user.Id;
    let id = req.params.id;

    if (!id) {
      id = owner;
    }

    const token = null;

    const { success, result, message } = await service.logout(id, token, owner);

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

const updateAvatar = async (req, res) => {
  const { file } = req;
  const { Id } = req.user;
  try {
    // Verifica si existe un archivo
    if (!file) {
      return res.status(400).json({
        result: null,
        message: "No file provided",
      });
    }

    // Process the avatar with Jimp
    const image = await Jimp.read(file.path);

    await image.resize(250, 250).writeAsync(file.path);

    // Update the avatar URL in the database
    const { success, result, message } = await service.updateAvatar(Id, file);

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
    // console.error('Error updating avatar:', error);
    // Delete the temporary file in case of an error
    if (file && file.path) {
      require("fs").unlinkSync(file.path);
    }
    return res.status(500).json({
      result: null,
      message: error,
    });
  }
};

const verifyUser = async (req, res) => {
  try {
    // const owner = req.user.Id;
    // console.log('ids', req.params);

    const id = req.params.verificationToken;
    // console.log('id', id);

    // if (!id) {
    //   id = owner;
    // }

    const { success, result, message } = await service.verifyUser(id);

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

const verifyUserEmail = async (req, res) => {
  try {
    const { email } = req.body;

    const { success, result, message } = await service.verifyUserEmail(email);

    if (!success) {
      if (message === "Verification has already been passed") {
        return res.status(404).json({
          result,
          message,
        });
      } else {
        return res.status(400).json({
          result,
          message,
        });
      }
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
  signup,
  login,
  current,
  logout,
  updateContactSubscription,
  updateAvatar,
  verifyUser,
  verifyUserEmail,
};

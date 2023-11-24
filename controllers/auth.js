// service/auth.js
const service = require("../services/auth");
// const jwt = require("jsonwebtoken");

const signup = async (req, res) => {
  try {

    // const token = req.headers.authorization.split(" ")[1];
    // const payload = jwt.verify(token, process.env.SECRET_KEY);

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

    const { success, result, message } = await service.logout(
      id,
      token,
      owner
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

module.exports = {
  signup,
  login,
  current,
  logout,
  updateContactSubscription,
};

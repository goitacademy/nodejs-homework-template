const express = require("express");

const logOutRouter = express.Router();

const auth = require("../../auth/auth");

const { checkUserByIdAndUpdate } = require("../../models/user");

logOutRouter.get("/", auth, async (req, res) => {
  if (req.headers && req.headers.authorization) {
    const token = req.headers.authorization.split(" ");
    if (!token) {
      res.status(401).send("Not authorized");
    }

    const tokens = req.user.token;
    if (tokens !== token) {
      const newToken = tokens;
      await checkUserByIdAndUpdate(req.user.id, { token: newToken });
      res.status(204).send("No content");
    } else if (tokens === token) {
      const newToken = null;
      await checkUserByIdAndUpdate(req.user.id, { token: newToken });
      res.status(204).send("No content");
    } else res.status(401).send("Not authorized");
  }
});

module.exports = logOutRouter;

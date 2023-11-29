const jwt = require("jsonwebtoken");
const User = require("../models/user");

const authMiddleware = async (req, res, next) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");
    const decoded = jwt.verify(
      token,
      "https://jwt.io/#debugger-io?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"
    );
    const user = await User.findOne({ _id: decoded.userId, token });

    if (!user) {
      throw new Error("Not authorized");
    }

    req.user = user;
    next();
  } catch (error) {
    console.error(error);
    res.status(401).json({ message: "Not authorized" });
  }
};

module.exports = authMiddleware;

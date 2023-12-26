const authenticate = async (req, res, next) => {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", ""); // Змінено спосіб отримання токену
    // eslint-disable-next-line no-undef
    const decoded = jwt.verify(token, SECRET_KEY);

    // eslint-disable-next-line no-use-before-define
    const user = await user.findOne({ _id: decoded._id, token });
    if (!user) {
      return res.status(401).json({ message: "Not authorized" });
    }

    req.token = token;
    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ message: "Not authorized" });
  }
};

module.exports = authenticate;

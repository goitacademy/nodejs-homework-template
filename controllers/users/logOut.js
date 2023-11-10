export const logout = async (req, res, next) => {
  try {
    req.user.token = null;
    await req.user.save();
    // res.status(204).send();
    res.status(200).json({ message: "Logged out" });
  } catch (err) {
    next(err);
  }
};

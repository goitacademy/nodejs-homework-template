export const isEmptyBody = (req, res, next) => {
  const arr = Object.keys(req.body);
  if (arr.length === 0) {
    return res.status(400).json({ message: "missing fields" });
  }
  next();
};

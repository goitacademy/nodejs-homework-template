export const getCurrentUser = (req, res) => {
  return res.status(200).json({ email: req.user.email, subscription: req.user.subscription });
};

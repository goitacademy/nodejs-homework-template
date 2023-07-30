const getCurrent = (req, res) => {
  const { email } = req.user;

  res.json({
    email,
    subscription,
  });
};

export default getCurrent;

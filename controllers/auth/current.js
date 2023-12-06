const getCurrent = async (req, res) => {
  const { email, name } = req.user;

  res.json({
    email,
    name,
  });
};

export default getCurrent

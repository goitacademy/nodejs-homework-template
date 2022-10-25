const getCurrent = async (res, req) => {
  const { name, email } = req.user;
  res.json({
    name,
    email,
  });
};
module.exports = getCurrent;

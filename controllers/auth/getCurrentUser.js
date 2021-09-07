const getCurrentUser = async (req, res, next) => {
  try{
  const { subscription, email } = req.user;

  res.json({
    status: "success",
    code: 200,
    data: {
      email,
      subscription,
    },
  });
} catch (error){
  next(error)
}};

module.exports = getCurrentUser;

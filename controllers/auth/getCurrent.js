const getCurrent = async (req, res, next) => {
  console.log(req.user);

  const { email, subscription } = req.user;
  try {
    res.json({
      status: "sucess",
      code: 200,
      data: {
        user: {
          email,
          subscription,
        },
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = getCurrent;

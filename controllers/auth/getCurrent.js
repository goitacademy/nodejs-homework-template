const getCurrent = (req, res) => {
    const { email, subscription } = req.user;
  
    res.status(200).json({
      status: "Ok",
      code: 200,
      data: {
        user: {
          email,
          subscription,
        },
      },
    });
  };
  
  module.exports = getCurrent;
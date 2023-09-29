const meCtrl = async (req, res, next) => {
    const { username } = req.user;
    res.json({
      status: "Success",
      code: 200,
      data: {
        message: `Authorization was Succesful ${username}`,
      },
    });
  };
  
  module.exports = meCtrl;
  
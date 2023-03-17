
const authUser = async (req,res) => {
    const { email } = req.user;
    res.json({
      status: 'success',
      code: 200,
      data: {
        message: `Authorization was successful: ${email}`,
      },
    });


  };

  module.exports = {authUser}
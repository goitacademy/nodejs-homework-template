const verifyUserEmail = async (user) => {
    if (user.verificationTokenExpiration < Date.now()) {
      user.verificationToken = null;
      user.verificationTokenExpiration = null;
      await user.save();
      return null;
    }
    user.isVerified = true;
    user.verificationToken = null;
    user.verificationTokenExpiration = null;
    await user.save();
    return user;
  };
  
  module.exports = { verifyUserEmail };
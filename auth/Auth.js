const User = require("../models/User");

exports.register = async (req, res, next) => {
  const { email, password } = req.body;
  if (password.length < 6) {
    return res.status(400).json({ message: "Password less than 6 characters" });
  }
  try {
    await User.create({
      email,
      password,
    }).then((user) =>
      res.status(200).json({
        message: "User successfully created",
        user,
      })
    );
  } catch (err) {
    res.status(401).json({
      message: "User not successful created",
      error: "Uknown error",
    });
  }
};

exports.login = async (req, res, next) => {
  try {
    const user = await User.findOne({ email, password });
    if (!user) {
      res.status(401).json({
        message: "Login not successful",
        error: "User not found",
      });
    } else {
      res.status(200).json({
        message: "Login successful",
        user,
      });
    }
  } catch (error) {
    res.status(400).json({
      message: "An error occurred",
      error: "Uknown error",
    });
  }
};

exports.update = async (req, res, next) => {
  const { subscription, email } = req.body;
  // First - Verifying if role and id is presnt
  if (subscription && email) {
    // Second - Verifying if the value of role is admin
    if (subscription === "pro") {
      // Finds the user with the id
      await User.findOne(email)
        .then((user) => {
          // Third - Verifies the user is not an admin
          if (user.subscription !== "pro") {
            user.subscription = subscription;
            user.save((err) => {
              //Monogodb error checker
              if (err) {
                res
                  .status("400")
                  .json({ message: "An error occurred", error: err.message });
                process.exit(1);
              }
              res.status("201").json({ message: "Update successful", user });
            });
          } else {
            res.status(400).json({ message: "User is already an Admin" });
          }
        })
        .catch((error) => {
          res
            .status(400)
            .json({ message: "An error occurred", error: error.message });
        });
    }
    if (subscription === "business") {
      // Finds the user with the id
      await User.findOne(email)
        .then((user) => {
          // Third - Verifies the user is not an admin
          if (user.subscription !== "business") {
            user.subscription = subscription;
            user.save((err) => {
              //Monogodb error checker
              if (err) {
                res.status("400").json({
                  message: "An error occurred",
                  error: err.message,
                });
                process.exit(1);
              }
              res.status("201").json({ message: "Update successful", user });
            });
          } else {
            res.status(400).json({ message: "User is already an Admin" });
          }
        })
        .catch((error) => {
          res
            .status(400)
            .json({ message: "An error occurred", error: error.message });
        });
    }
  }
};

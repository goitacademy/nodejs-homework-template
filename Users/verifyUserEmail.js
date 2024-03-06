const uuid = require('uuid');

function verifyUserEmail(user, callback) {
  // Generate a new verification token
  const verificationToken = uuid.v4();

  // Update the user's verification token and isVerified fields
  user.verificationToken = verificationToken;
  user.isVerified = false;

  // Save the updated user
  user.save((err) => {
    if (err) {
      return callback(err);
    }

    // Send the verification email with the generated token
    const verificationLink = `http://localhost:3000/api/users/verify/${verificationToken}`;
    // Replace the following line with your email sending logic
    console.log(`Verification email sent to ${user.email} with link: ${verificationLink}`);

    return callback(null, user);
  });
}

module.exports = verifyUserEmail;
const crypto = require("crypto");

const hashPassword = (password) =>
  new Promise((resolve, reject) => {
    const salt = crypto.randomBytes(16);
    crypto.scrypt(password, salt, 256, (err, hash) => {
      if (err) {
        reject(err);
        return;
      }

      resolve(Buffer.concat([salt, hash]).toString("base64"));
    });
  });

const comparePassword = async (unhashedPassword, passwordFromDb) =>
  new Promise((resolve, reject) => {
    const buf = Buffer.from(passwordFromDb, "base64");
    const salt = buf.subarray(0, 16);
    const hashedPassword = buf.subarray(16);
    crypto.scrypt(unhashedPassword, salt, 256, (err, hash) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(crypto.timingSafeEqual(hashedPassword, hash));
    });
  });

module.exports = {
  hashPassword,
  comparePassword,
};

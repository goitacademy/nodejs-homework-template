const bcrypt = require("bcryptjs");

const password = "aaa123"; // Hasło, które chcesz haszować

bcrypt.genSalt(10, (err, salt) => {
  if (err) throw err;

  bcrypt.hash(password, salt, (err, hash) => {
    if (err) throw err;
    console.log("Nowy hasz:", hash); // Wydrukuje nowy hasz
  });
});

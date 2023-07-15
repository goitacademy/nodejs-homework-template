const fs = require("fs");
const os = require("os");
const path = require("path");
const chalk = require("chalk");
const request = require("request");

const ROOT_PATH = os.homedir();
// const localUsernamePath = `/.lint/refs/user`;
// const usernameDir = path.join(ROOT_PATH, localUsernamePath);

const API_BASE_URL = "https://api.omnilint.com";
const DEV_API_BASE_URL = "http://localhost:3000";

function fetchUser(username, token) {
  const url = `${API_BASE_URL}/${username}.json?user_token=${token}`;
  return new Promise((resolve, reject) => {
    request(url, (error, response, body) => {
      if (!error && response.statusCode == 200) {
        resolve(JSON.parse(body));
      } else {
        reject({
          reason: "Unable to complete operation."
        });
      }
    });
  });
}

function saveUsernameAndTokenOnLocalDevice(username, token) {
  var tmpPath = ROOT_PATH;
  if (fs.existsSync(tmpPath)) {
    tmpPath = path.join(tmpPath, ".lint");
    if (!fs.existsSync(tmpPath)) {
      fs.mkdirSync(tmpPath);
    }
    tmpPath = path.join(tmpPath, "refs");
    if (!fs.existsSync(tmpPath)) {
      fs.mkdirSync(tmpPath);
    }
    fs.writeFileSync(path.join(tmpPath, "user"), username);
    fs.writeFileSync(path.join(tmpPath, "token"), token);
    // console.log(chalk.green('Login successful.'));
    return true;
  } else {
    console.log("Unable to save Username and Token.", tmpPath);
  }
  return false;
}

function logout() {
  var tmpPath = path.join(ROOT_PATH, ".lint", "refs", "user");
  if (fs.existsSync(tmpPath)) {
    fs.unlinkSync(tmpPath);
  }
  var tokenPath = path.join(ROOT_PATH, ".lint", "refs", "token");
  if (fs.existsSync(tokenPath)) {
    fs.unlinkSync(tokenPath);
  }
  console.log("Logout successful.");
}

function getUsernameFromLocalDevice() {
  const dir = path.join(ROOT_PATH, ".lint", "refs", "user");
  if (fs.existsSync(dir)) {
    const username = fs.readFileSync(dir, "utf8").replace(/\r?\n|\r/g, "");
    return username;
  } else {
    return false;
  }
}

function getTokenFromLocalDevice() {
  const dir = path.join(ROOT_PATH, ".lint", "refs", "token");
  if (fs.existsSync(dir)) {
    const token = fs.readFileSync(dir, "utf8").replace(/\r?\n|\r/g, "");
    return token;
  } else {
    return false;
  }
}

function login(credentials) {
  const url = `${API_BASE_URL}/users/sign_in.json?user[login]=${
    credentials.username
  }&user[password]=${credentials.password}`;
  request.post(url, (error, response, body) => {
    if (!error && response.statusCode == 201) {
      try {
        const user = JSON.parse(body);
        if (
          saveUsernameAndTokenOnLocalDevice(
            user.username,
            user.authentication_token
          )
        ) {
          console.log(
            "Successfully signed in as " + chalk.green(user.username) + "."
          );
          return true;
        } else {
          console.log(chalk.red("Unable to perform signup."));
          return false;
        }
        return false;
      } catch (e) {
        console.log(e);
        return false;
      }
    } else {
      console.log(chalk.red("Invalid credentials."));
      return false;
    }
  });
}

function printLoginStatus() {
  const username = getUsernameFromLocalDevice();
  const token = getTokenFromLocalDevice();
  if (username && token) {
    fetchUser(username, token)
      .then(user => {
        console.log("Logged in as:", chalk.green(user.username));
        process.exit(0);
      })
      .catch(err => {
        console.log("Not logged in.");
        process.exit(1);
      });
  } else {
    console.log("Not logged in.");
    process.exit(1);
  }
}

function signup(answers) {
  const url = `${API_BASE_URL}/users.json?user[username]=${
    answers.username
  }&user[email]=${answers.email}&user[password]=${answers.password}`;
  request.post(url, (err, response, body) => {
    if (err) {
      // console.log(err);
      process.exit(1);
    }

    if (!err && response.statusCode == 201) {
      const user = JSON.parse(body);
      if (
        saveUsernameAndTokenOnLocalDevice(
          user.username,
          user.authentication_token
        )
      ) {
        console.log(
          "Successfully signed up as " + chalk.green(user.username) + "."
        );
      } else {
      }
    } else {
      console.log("Unable to perform signup.");
      if (body && response) {
        // console.log(response);
        // console.log(chalk.red(body));
        // console.log();
        const bodyParsed = JSON.parse(body);
        // console.log("bodyParsed");

        // console.log(bodyParsed);
        if (bodyParsed && bodyParsed.errors) {
          if (bodyParsed.errors.email) {
            bodyParsed.errors.email.map(error => {
              console.log("Email:", chalk.red(error));
            });
          }
          if (bodyParsed.errors.username) {
            bodyParsed.errors.username.map(error => {
              console.log("Username:", chalk.red(error));
            });
          }
          if (bodyParsed.errors.password) {
            bodyParsed.errors.password.map(error => {
              console.log("Password:", chalk.red(error));
            });
          }
        }
      }
    }
  });
}

// Export all methods
module.exports = {
  getUsernameFromLocalDevice,
  getTokenFromLocalDevice,
  printLoginStatus,
  login,
  logout,
  signup
};

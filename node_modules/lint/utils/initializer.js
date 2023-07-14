const fs = require("fs");
const path = require("path");
const http = require("http");
const url = require("url");
const yaml = require("js-yaml");
const chalk = require("chalk");
const request = require("request");
const { prompt } = require("inquirer");
const ora = require("ora");
const {
  getEnclosingGitRepository,
  isLintFilePresent,
  getDotLintDirectory,
  isLocalInstall,
  parseLintFile
} = require("./filesHandler");

const {
  getUsernameFromLocalDevice,
  getTokenFromLocalDevice
} = require("./user");

const {
  getRepositories,
  fetchRepositories,
  smartCloneRepository,
  createRepositoryOnLint
} = require("./repository");

const { exec, execSync, spawn } = require("child_process");

const SITE_URL = "https://www.omnilint.com";
const GIT_BASE_URL = "git@git.omnilint.com";
const API_BASE_URL = "https://api.omnilint.com";
const DEV_API_BASE_URL = "http://localhost:3000";

const dotLintDirectory = getDotLintDirectory();

function init() {
  const username = getUsernameFromLocalDevice();
  const token = getTokenFromLocalDevice();
  if (username && token) {
    initializeAndCreateRepository(username, token);
  } else {
    console.log(chalk.red("Please log in first."));
    return process.exit(1);
  }
}

function getFullPath(dirPath) {
  fs.readdirSync(dirPath).map(fileName => {
    return path.join(dirPath, fileName);
  });
}

function initializeAndCreateRepository(username, token) {
  const reportSpinner = ora("Initializing Omnilint...");
  reportSpinner.start();

  // console.log("Initializing Omnilint...");

  if (isLintFilePresent()) {
    const repo = yaml.load(fs.readFileSync(dotLintDirectory + "/config"));
    // console.log(chalk.green(repo) + " already exists.");
    reportSpinner.succeed(chalk.green(repo) + " already exists on Omnilint.");
    // console.log(chalk.green(username) + "/" + chalk.green(repo) + " has already been initialized");
    // console.log("To init again delete .lint file and run init");
    process.exit(0);
  }

  var enclosingGitRepository = getEnclosingGitRepository();
  if (
    !enclosingGitRepository ||
    enclosingGitRepository == "" ||
    enclosingGitRepository == " "
  ) {
    // console.log("Can't find Repository, skipping init.");
    // reportSpinner.fail("Can't find Repository, skipping init.");
    reportSpinner.fail("Not inside a repository, skipping init.");

    process.exit(0);
  }
  // console.log("./ = %s", path.resolve(enclosingGitRepository));
  var defaultRepositoryName = path
    .resolve(enclosingGitRepository)
    .split("/")
    .pop();
  //
  // console.log("Process");
  // console.log(process.cwd());
  //
  // console.log("defaultRepositoryName");

  // console.log(defaultRepositoryName);

  searchRepo(defaultRepositoryName, username, token)
    .then(body => {
      if (body.length == 1) {
        // console.log("One repository found: " + chalk.green(body[0].uuid));
        reportSpinner.succeed("Repository found: " + chalk.green(body[0].uuid));
        confirmWriteLintFile(defaultRepositoryName, body, username, token);
      } else if (body.length == 0) {
        // console.log("Repository not found on Omnilint.");fail
        reportSpinner.stop();
        confirmRepoName(defaultRepositoryName);
      } else {
        console.log(
          "More than one repository found, please contact your administrator."
        );
        process.exit(0);
      }
    })
    .catch(err => {
      console.log(chalk.red("Error during search repository."));
      console.log(chalk.red(err.message));
      process.exit(0);
    });
}

function writeLintFile(repositoryName, repositories, username, token) {
  yml = yaml.dump(username + "/" + repositoryName);

  if (!fs.existsSync(dotLintDirectory)) {
    fs.mkdirSync(dotLintDirectory);
  }
  if (!fs.existsSync(dotLintDirectory + "/config")) {
    fs.writeFileSync(dotLintDirectory + "/config", yml);
    console.log(
      "Repository " +
        chalk.green(username + "/" + repositoryName) +
        " initialized successfully."
    );
    // console.log(chalk.green(".lint/config") + " created");
    // commitAfterInstall();
    // askToCommit();
  }
}

function confirmWriteLintFile(repositoryName, repositories, username, token) {
  // console.log(username)
  // console.log(username)
  prompt([
    {
      type: "confirm",
      name: "confirm",
      message: "Do you want to use this repository?"
    }
  ]).then(answers => {
    if (answers.confirm) {
      writeLintFile(repositoryName, repositories, username, token);
    } else if (!answers.confirm) {
      console.log("Please enter a repository name:");
      confirmRepoName("");
    }
  });
}

function askToCommit() {
  prompt([
    {
      type: "confirm",
      name: "confirm",
      message: "Do you want to commit " + chalk.green(".lint/config") + "?"
    }
  ]).then(answers => {
    if (answers.confirm) {
      commitAfterInstall();
    } else if (!answers.confirm) {
      process.exit(0);
    }
  });
}

function commitAfterInstall() {
  try {
    var addFiles = execSync("git add " + dotLintDirectory + "/config");
    // console.log(addFiles.toString());
    if (addFiles) {
      try {
        var enclosingRepository = getEnclosingGitRepository();
        // console.log("enclosingRepository");
        // console.log(enclosingRepository);
        // if (!fs.existsSync(enclosingRepository + "/.git/COMMIT_EDITMSG")) {
        // console.log(enclosingRepository + "COMMIT_EDITMSG doesnt exist");
        try {
          var commitFiles = execSync('git commit -m "Install Omnilint"');
          if (commitFiles) {
            // console.log(commitFiles.toString());
            process.exit(0);
          }
        } catch (err) {
          // Silent error
          // console.log("error at git commit");
          // console.log(err.stdout.toString());
        }
        // } else {
        //   console.log(enclosingRepository + "/.git/COMMIT_EDITMSG exists");
        //
        //   var gitStatus = execSync("git diff-index --cached --name-only HEAD");
        //   // console.log("gitStatus");
        //   // console.log(gitStatus.toString());
        //   if (gitStatus) {
        //     if (gitStatus.length > 0) {
        //       try {
        //         var commitFiles = execSync('git commit -m "Install Omnilint"');
        //         if (commitFiles) {
        //           console.log(commitFiles.toString());
        //           process.exit(0);
        //         }
        //       } catch (err) {
        //         console.log("error at git commit");
        //         console.log(err.stdout.toString());
        //       }
        //     } else {
        //       console.error(
        //         chalk.red("The config file has already been commited")
        //       );
        //       process.exit(0);
        //     }
        //   } else {
        //     console.log("No staged files");
        //   }
        // }
      } catch (err) {
        console.log("error at git ls");
        console.log(err.stdout.toString());
      }
    }
  } catch (err) {
    console.log("error at git add");
    console.log(err.stdout.toString());
  }
}

function confirmRepoName(defaultRepositoryName) {
  const defaultMsg = "Please enter a repository name:";
  prompt([
    {
      type: "input",
      name: "name",
      message: defaultMsg,
      default: defaultRepositoryName
    },
    {
      type: "list",
      name: "policy",
      message: "Pick a code checker policy",
      choices: [
        { name: "No policy", value: null },
        { name: "Default policy", value: "1" },
        { name: "Strict policy", value: "4" }
      ],
      initial: 1
    },
    {
      type: "confirm",
      name: "autofix",
      message: "Do you want Omnilint to automatically fix your code offenses ?",
      default: false
    }
  ])
    .then(answers => {
      if (answers.name) {
        // console.log(answers.policy);
        createRepositoryOnLint(
          answers.name,
          answers.policy,
          answers.autofix
        )
          .then(body => {
            const username = getUsernameFromLocalDevice();
            const token = getTokenFromLocalDevice();
            writeLintFile(defaultRepositoryName, body, username, token);
          })
          .catch(function(e) {
            process.exit(1);
          });
      } else {
        console.error("Name can't be blank please try to run init again");
        process.exit(1);
      }
    })
    .catch(function(err) {
      console.log(err);
      process.exit(1);
    });
  // process.exit(1);
}

function checkAccess(token) {
  const repo = yaml.load(fs.readFileSync(dotLintDirectory + "/config"));
  const repoUUID = repo.uuid;
  const url = `${API_BASE_URL}/${repoUUID}.json?user_token=${token}`;
  return new Promise((resolve, reject) => {
    request(url, (error, response, body) => {
      if (!error && response.statusCode == 200) {
        // console.log("works");
        resolve(JSON.parse(body));
      } else {
        // console.log(body)
        reject(new Error("Unable to fetch repositories from server."));
      }
    });
  });
}

function searchRepo(repoArguments, username, token) {
  const url = `${API_BASE_URL}/${username}/repositories.json?user_token=${token}&slug=${repoArguments}`;
  return new Promise((resolve, reject) => {
    request(url, (error, response, body) => {
      if (!error && response.statusCode == 200) {
        // console.log("works");
        // console.log(body);

        resolve(JSON.parse(body));
      } else {
        // console.log(body)
        reject(new Error("Unable to fetch repositories from server."));
      }
    });
  });
}

module.exports = {
  init
};

const fs = require("fs");
const os = require("os");
const path = require("path");
const ora = require("ora");
const chalk = require("chalk");
const request = require("request");
var CliTable = require("cli-table");
var moment = require("moment");
const simpleGit = require("simple-git");

const {
  getUsernameFromLocalDevice,
  getTokenFromLocalDevice
} = require("./user");

const { parseLintFile } = require("./filesHandler");

const ROOT_PATH = os.homedir();
// const localUsernamePath = `/.lint/refs/user`;
// const usernameDir = path.join(ROOT_PATH, localUsernamePath);

const SITE_URL = "https://www.omnilint.com";
const GIT_BASE_URL = "git@git.omnilint.com";
const API_BASE_URL = "https://api.omnilint.com";
const DEV_API_BASE_URL = "http://localhost:3000";

function fetchRepositories(username, token) {
  const url = `${API_BASE_URL}/${username}/repositories.json?user_token=${token}`;
  return new Promise((resolve, reject) => {
    request(url, (error, response, body) => {
      if (!error && response.statusCode == 200) {
        resolve(JSON.parse(body));
      } else {
        // console.log(body)
        reject(new Error("Unable to fetch repositories from server."));
      }
    });
  });
}

function fetchRepositoryKey() {
  var repositoryUUID = parseLintFile();
  const token = getTokenFromLocalDevice();

  if (!repositoryUUID) {
    console.error("Unable to get repositoryUUID.");
    process.exit(1);
  }
  const url = `${API_BASE_URL}/${repositoryUUID}.json?user_token=${token}`;
  return new Promise((resolve, reject) => {
    request(url, (error, response, body) => {
      if (!error && response.statusCode == 200) {
        resolve(JSON.parse(body));
      } else {
        reject(
          new Error(
            'Unable to fetch repository "' + repositorySlug + '" from server.'
          )
        );
      }
    });
  });
}

function fetchRepository(repositorySlug, username, token) {
  const url = `${API_BASE_URL}/${username}/${repositorySlug}.json?user_token=${token}`;
  console.log(url);
  return new Promise((resolve, reject) => {
    request(url, (error, response, body) => {
      if (!error && response.statusCode == 200) {
        resolve(JSON.parse(body));
      } else {
        reject(
          new Error(
            'Unable to fetch repository "' + repositorySlug + '" from server.'
          )
        );
      }
    });
  });
}

function cloneRepository(repoPath, localPath, options) {
  // test
  if (localPath) {
    console.log(
      "Cloning " +
        chalk.green(repoPath) +
        " at " +
        chalk.green(localPath) +
        "..."
    );
    simpleGit().clone(repoPath, localPath, options);
  } else {
    console.log(
      "Cloning " +
        chalk.green(repoPath) +
        " at " +
        chalk.green(process.cwd()) +
        "..."
    );
    simpleGit().clone(repoPath);
  }
}
// fff

function smartCloneRepository(repoPathOrSlug, localPath, options) {
  // const url = `${API_BASE_URL}/${username}/${repositorySlug}.json?user_token=${token}`;
  return new Promise((resolve, reject) => {
    const username = getUsernameFromLocalDevice();
    const token = getTokenFromLocalDevice();

    if (username && token) {
      let repoSplitted = repoPathOrSlug.split("/");
      if (repoSplitted.length === 1) {
        // console.log('Looks like an Lint repository aaa. Checking on Lint...');
        fetchRepository(repoPathOrSlug, username, token)
          .then(body => {
            // console.log('body', body)
            console.log(
              `Repository ${chalk.green(username)}/${chalk.green(
                repoPathOrSlug
              )} found on Lint...`
            );
            const gitUrl = `${GIT_BASE_URL}:${username}/${repoPathOrSlug}.git`;
            // console.log('gitUrl', gitUrl)
            cloneRepository(gitUrl, localPath, options);
          })
          .catch(err => {
            console.log(chalk.red("Unable to clone repository."));
            // console.log(chalk.red(err.message));
          });
      } else if (repoSplitted.length === 2) {
        let repoSplitted2 = repoPathOrSlug.split("@");
        let repoSplitted3 = repoPathOrSlug.split("://");
        if (repoSplitted2.length === 1 && repoSplitted3.length === 1) {
          // console.log('Looks like an Lint repository aaa/bbb. Checking on Lint...');
          fetchRepository(repoSplitted[1], repoSplitted[0], token)
            .then(body => {
              console.log(
                'Repository "' +
                  chalk.green(repoPathOrSlug) +
                  '" found on Lint...'
              );
              const gitUrl = `${GIT_BASE_URL}:${repoSplitted[0]}/${
                repoSplitted[1]
              }.git`;
              // console.log('gitUrl', gitUrl)
              cloneRepository(gitUrl, localPath, options);
            })
            .catch(err => {
              console.log(chalk.red("Unable to clone repository."));
            });
        } else {
          // console.log('Logged in: Looks like a repository url.');
          cloneRepository(repoPathOrSlug, localPath, options);
        }
      } else {
        // console.log('Logged in: Looks like a repository url.');
        cloneRepository(repoPathOrSlug, localPath, options);
      }
    } else {
      // console.log('Not logged in: Looks like a repository url.');
      cloneRepository(repoPathOrSlug, localPath, options);
    }
  });
}

function getRepositories() {
  const username = getUsernameFromLocalDevice();
  const token = getTokenFromLocalDevice();
  if (username && token) {
    fetchRepositories(username, token)
      .then(repositories => {
        printRepositories(repositories);
      })
      .catch(err => {
        console.log(chalk.red("Unable to fetch repositories.")); // remote
        console.log(err); // remote
      });
  } else {
    console.log(chalk.red("Not logged in.")); // locally
  }
}

function printRepositories(repositories) {
  if (repositories.length > 0) {
    var table = new CliTable({
      head: [
        chalk.cyan("Repositories (" + repositories.length + ")"),
        chalk.cyan("URL"),
        chalk.cyan("Visibility"),
        chalk.cyan("Created")
        // chalk.cyan('Updated'),
      ],
      // colWidths: [30, 45, 12, 12, 12, 16, 16],
      colWidths: [35, 50, 12, 18]
    });
    repositories.map(repository => {
      // const url = SITE_URL + '/' + repository.uuid;
      const url = repository.uuid;
      table.push([
        chalk.green(repository.name),
        url,
        repository.status,
        moment(repository.created_at).fromNow()
        // moment(repository.updated_at).fromNow(),
      ]);
    });
    console.log(table.toString());
    process.exit(0);
  } else {
    console.log("No repositories.");
  }
}

function findRepositoryInDatabase(repoName) {
  const currentUser = getUsernameFromLocalDevice();
  const token = getTokenFromLocalDevice();
  if (!currentUser && !token) {
    console.log("Please Sign In");
    process.exit(0);
  }
  const url = `${API_BASE_URL}/${currentUser}/${repoName}.json?user_token=${token}`;
  request.get(url, function(error, response, body) {
    if (response) {
      if (response.statusCode == 200) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  });
}

function createRepositoryOnLint(
  repoName,
  policy,
  has_autofix
) {
  var spinner = ora("Adding repository to Omnilint");
  spinner.start();
  return new Promise((resolve, reject) => {
    const currentUser = getUsernameFromLocalDevice();
    const token = getTokenFromLocalDevice();
    if (!currentUser && !token) {
      console.log("Please Sign In");
      process.exit(0);
    }
    // const token = "v5NnNqL3C9bQyrzUfzDxTnmvztPr8PMheTebeF8zr7VKozq1uQ";
    const url = `${API_BASE_URL}/${currentUser}/repositories.json?user_token=${token}`;
    request.post(
      url,
      {
        json: {
          repository: {
            name: repoName,
            slug: repoName.toLowerCase(),
            status: "Public",
            deploy_to: "none",
            has_autofix: has_autofix,
            policy_id: policy,
            git_host: "",
            git_address: `git@git.omnilint.com:${currentUser.toLowerCase()}/${repoName.toLowerCase()}.git`
          }
        }
      },
      function(error, response, body) {
        // // console.log(url);
        // // console.log(response);
        // // console.log(body);
        if (error) {
          console.log(error);
        }
        if (response) {
          // console.log(response);
          if (!error && response.statusCode == 201) {
            // console.log("Repository added to omnilint");
            spinner.succeed("Repository added to Omnilint");

            var stringify = JSON.stringify(body);
            // console.log(body);

            resolve(body);
          } else if (response.statusCode == 500) {
            spinner.fail(
              "Repository " +
                currentUser.toLowerCase() +
                "/" +
                repoName.toLowerCase() +
                " already exists, please choose another name"
            );
            reject();

            // console.log(
            //   chalk.green(repoName.toLowerCase()) +
            //     " already exists, please choose another name."
            // )
            // );
          } else {
            spinner.fail(
              "Repository " +
                currentUser.toLowerCase() +
                "/" +
                repoName.toLowerCase() +
                " already exists, please choose another name."
            );
            reject();
          }
        } else {
          console.error(new Error("Unable to connect."));
          // console.log(error);
          reject(error);
        }
        reject(error);
      }
    );
  });
}

// Export all methods
module.exports = {
  getRepositories,
  fetchRepository,
  smartCloneRepository,
  createRepositoryOnLint,
  fetchRepositoryKey
};

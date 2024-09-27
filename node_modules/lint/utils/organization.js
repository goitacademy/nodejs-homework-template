const fs = require("fs");
const path = require("path");
const http = require("http");
const url = require("url");
const yaml = require("js-yaml");
const chalk = require("chalk");
const request = require("request");
const { prompt } = require("inquirer");
var CliTable = require("cli-table");

const {
  getEnclosingGitRepository,
  isLintFilePresent,
  getDotLintDirectory,
  isLocalInstall
} = require("./filesHandler");

const {
  getUsernameFromLocalDevice,
  getTokenFromLocalDevice
} = require("./user");

const SITE_URL = "https://www.omnilint.com";
const GIT_BASE_URL = "git@git.omnilint.com";
const API_BASE_URL = "https://api.omnilint.com";
const DEV_API_BASE_URL = "http://localhost:3000";

function fetchOrganizations() {
  const username = getUsernameFromLocalDevice();
  const token = getTokenFromLocalDevice();
  const url = `${API_BASE_URL}/${username}/organizations.json?user_token=${token}`;
  return new Promise((resolve, reject) => {
    request(url, (error, response, body) => {
      if (!error && response.statusCode == 200) {
        // console.log("works");
        // console.log(body);
        if (body) {
          // console.log(body);
          resolve(JSON.parse(body));
        }
      } else {
        // console.log(body)
        reject(new Error("Unable to fetch repositories from server."));
      }
    });
  });
}
function printOrganizations() {
  fetchOrganizations().then(organizations => {
    if (organizations) {
      var table = new CliTable({
        head: [
          chalk.cyan("Organizations (" + organizations.length + ")")
          // chalk.cyan('Updated'),
        ],
        // colWidths: [30, 45, 12, 12, 12, 16, 16],
        colWidths: [35]
      });
      organizations.map(organization => {
        // const url = SITE_URL + '/' + repository.uuid;
        // console.log(organization);
        table.push([organization.name]);
      });
      console.log(table.toString());
      process.exit(0);
    } else {
      console.log("No Linters.");
      process.exit(1);
    }
  });
}

function chooseOrgToSet() {
  fetchOrganizations().then(organizations => {
    prompt([
      {
        type: "list",
        name: "choose",
        message: "Select the organization you want to set for this repository?",
        choices: organizations
      }
    ])
      .then(answers => {
        // console.log(answers);
      })
      .catch(e => {
        console.log(e);
        process.exit(0);
      });
  });
}

module.exports = {
  fetchOrganizations,
  chooseOrgToSet,
  printOrganizations
};

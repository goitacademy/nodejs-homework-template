#!/usr/bin/env node

const program = require("commander");
const { prompt } = require("inquirer");
const chalk = require("chalk");
const simpleGit = require("simple-git");
var path = require("path");
const fs = require("fs");
const { init } = require("./utils/initializer");

const {
  getUsernameFromLocalDevice,
  getTokenFromLocalDevice,
  printLoginStatus,
  signup,
  login,
  logout
} = require("./utils/user");

const {
  getStagedFiles,
  getDeletedStagedFiles,
  fetchPolicyRules,
  lintingPreCommit,
  lintStaged,
  preCommit,
  prepareCommitMsg,
  postCommit,
  createLintStagedConfig,
  fetchLinters
} = require("./utils/linter");

const { install, uninstall } = require("./utils/hooks");

const {
  runEslint,
  createESlintConfig,
  parseOutPoutForRuleCheckAsTable,
  installEslint,
  assignESlintRules,
  selectFilesForESLint,
  checkIfLintStagedConfigExist,
  checkIfEslintIsInstalled,
  eslintNoConfig
} = require("./utils/linters/eslint");

const {
  installBrakeman
} = require("./utils/linters/brakeman");

const {
  installErbLint
} = require("./utils/linters/erbLint");

// const {
//   checkInstalledPackages,
//   installRubocop
// } = require("./utils/linters/rubocop");

const {
  createPrettierConfig,
  runPrettierOnStagedFiles,
  runPrettierOnProject
} = require("./utils/linters/prettier");

// ********** Version **********
program.version("v0.8.19", "-v, --version");

program
  .command("init")
  .description("Initializes current repository")
  .action(() => {
    init();
  });

program
  .command("install:hooks")
  .description("Install git hooks")
  .action(() => {
    console.log("Installing git hooks...");
    install();
  });

// program
//   .command("uninstall:hooks")
//   .description("Uninstall git hooks")
//   .action(() => {
//     console.log("Uninstalling git hooks...");
//     uninstall();
//   });

// ********** Linters **********

program
  .command("install:eslint")
  .description("Install ESLint")
  .action(() => {
    installEslint();
  });

program
  .command("install:erblint")
  .description("Install ERB Lint")
  .action(() => {
    installErbLint();
  });

program
  .command("install:brakeman")
  .description("Install Brakeman")
  .action(() => {
    installBrakeman();
  });

program
  .command("install:rubocop")
  .description("Install Rubocop")
  .action(() => {
    console.log("Installing Rubocop...");
    installRubocop();
  });

program
  .command("install:stylelint")
  .description("Install StyleLint")
  .action(() => {
    console.log("Installing StyleLint...");
    installRubocop();
  });

program
  .command("lint:staged")
  .description("Lint Staged files")
  .option(
    "-f, --format [desiredFormat]",
    "Set the errors report format in console"
  )
  .action(desiredFormat => {
    lintingPreCommit(desiredFormat.format);
  });

// Git hooks

program
  .command("pre-commit")
  .description("Simulates pre-commit git hook actions.")
  .option("-k, --keep", "Skip temporary files deletion.")
  .option("-t, --time", "Show execution time.")
  .option("-T, --truncate", "Shorten the output to display only the first 10 offenses.")
  .action(cmd => {
    preCommit(cmd.keep, cmd.time, cmd.truncate);
  });

program
  .command("prepare-commit-msg")
  .description("Triggers 'prepare-commit-msg' hook actions.")
  .action(() => prepareCommitMsg());

program
  .command("post-commit")
  .description("Triggers 'post-commit' hook actions.")
  .action(() => postCommit());

program
  .command("prettify <extenstion>")
  .description("Run Prettier on project.")
  .action(extenstion => runPrettierOnProject(extenstion));

// ********** User **********

program
  .command("login")
  .description("Sign in on local device.")
  .action(() => {
    const username = getUsernameFromLocalDevice();
    const token = getTokenFromLocalDevice();
    if (username && token) {
      console.log("Already logged in as " + chalk.green(username) + ".");
    } else {
      prompt([
        {
          type: "input",
          name: "username",
          message: "Enter your username or email..."
        },
        {
          type: "password",
          name: "password",
          mask: "*",
          message: "Enter your password...",
          hidden: true
        }
      ]).then(credentials => {
        login(credentials);
      });
    }
  });

program
  .command("logout")
  .description("Sign out from local device.")
  .action(() => {
    const username = getUsernameFromLocalDevice();
    const token = getTokenFromLocalDevice();
    if (!username && !token) {
      console.log("Not logged in.");
    } else {
      prompt([
        {
          type: "confirm",
          name: "confirm",
          message: "Are you sure you want to log out from Omnilint?"
        }
      ]).then(answers => {
        if (answers.confirm) {
          logout();
        }
      });
    }
  });

program
  .command("signup")
  .description("Creates an account")
  .action(() => {
    const username = getUsernameFromLocalDevice();
    const token = getTokenFromLocalDevice();
    if (username && token) {
      console.log("Already logged in as " + chalk.green(username) + ".");
      process.exit(0);
    } else {
      prompt([
        {
          type: "input",
          name: "username",
          message: "Enter an username..."
        },
        {
          type: "input",
          name: "email",
          message: "Enter an email..."
        },
        {
          type: "password",
          name: "password",
          mask: "*",
          message: "Enter your password...",
          hidden: true
        }
      ]).then(answers => signup(answers));
    }
  });

program
  .command("whoami")
  .description("Get current user status")
  .action(() => {
    printLoginStatus();
  });

// program
//   .command("list")
//   .alias("ls")
//   .description("Lists repositories")
//   .action(() => getRepositories());

program.parse(process.argv);

// Show help if no args
if (program.args.length === 0) {
  // program.help();
  lintingPreCommit();
}

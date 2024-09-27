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
  getRepositories,
  // fetchRepository,
  smartCloneRepository,
  createRepositoryOnLint
} = require("./utils/repository");

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

const {
  checkInstalledPackages,
  installRubocop
} = require("./utils/linters/rubocop");

const {
  createPrettierConfig,
  runPrettierOnStagedFiles,
  runPrettierOnProject
} = require("./utils/linters/prettier");

// ********** Version **********
program.version("v0.8.12", "-v, --version");

program
  .command("init")
  .description("Initializes Omnilint for current repository")
  .action(() => {
    init();
  });

program
  .command("install")
  .description("Install Omnilint")
  .action(() => {
    console.log("Installing Omnilint...");
    install();
  });

program
  .command("uninstall")
  .description("Uninstall Omnilint")
  .action(() => {
    console.log("Uninstalling Omnilint...");
    uninstall();
  });

program
  .command("install-rubocop")
  .description("Install Rubocop")
  .action(() => {
    console.log("Installing Rubocop...");
    installRubocop();
  });

program
  .command("login")
  // .command('login', 'Login on local device.', {isDefault: true})
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

// ********** User **********
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
  .command("status")
  .description("Get status")
  .action(() => {
    // simpleGit().status((err, status) => {
    //   console.log('Getting status...');
    //   if (err) {
    //     console.log(err)
    //   } else {
    //     console.log(status)
    //   }
    // })

    simpleGit().raw(["status"], (err, result) => {
      if (err) {
        console.log(err);
      } else {
        console.log(result);
      }
    });

    printLoginStatus();
  });

program
  .command("whoami")
  .description("Get current user status")
  .action(() => {
    printLoginStatus();
  });

// ********** Linters **********

program
  .command("config-eslint <repoOwner> <repoName>")
  .description("Set config file for EsLint")
  .action((repoOwner, repoName) => {
    setConfigfile(repoOwner, repoName);
  });

program
  .command("install-eslint")
  .description("Install ESLint")
  .action(() => {
    installEslint();
  });

program
  .command("install-erblint")
  .description("Install ERB Lint")
  .action(() => {
    installErbLint();
  });

program
  .command("install-brakeman")
  .description("Install Brakeman")
  .action(() => {
    installBrakeman();
  });


program
  .command("check eslint")
  .description("Check if ESLint is installed")
  .action(() => {
    if (checkIfEslintIsInstalled()) {
      console.log("Eslint is Installed");
    } else {
      console.log("Eslint is not Installed");
    }
  });

program
  .command("eslint-no-config")
  .description("Launch ESLint without configuration file.")
  .action(() => {
    eslintNoConfig();
  });

program
  .command("deleted-staged-files")
  .description("Get deleted staged files.")
  .action(() => {
    var deletedStagedFilePaths = getDeletedStagedFiles();
    deletedStagedFilePaths.forEach((file, index) => {
      console.log(deletedStagedFilePaths[index]);
    });
  });

program
  .command("staged-files")
  .description("Get staged files.")
  .action(() => {
    console.log('staged-files');
    var stagedFilePaths = getStagedFiles();
    stagedFilePaths.forEach((file, index) => {
      console.log(stagedFilePaths[index]);
    });
  });

program
  .command("lint-staged")
  .description("Lint Staged files")
  .option(
    "-f, --format [desiredFormat]",
    "Set the errors report format in console"
  )
  .action(desiredFormat => {
    lintingPreCommit(desiredFormat.format);
  });

program
  // .command("prepare-commit-msg")
  .command("pre-commit")
  .description("Run before commit")
  .option("-k, --keep", "Skip temporary files deletion.")
  .option("-t, --time", "Show execution time.")
  .option("-T, --truncate", "Shorten the output to display only the first 10 offenses.")

  .action(cmd => {
    // lintingPreCommit(desiredFormat.format);
    preCommit(cmd.keep, cmd.time, cmd.truncate);
  });

program
  .command("lint [files...]")
  .description("Lint current respository")
  .action(files => {
    // console.log("### omnilint lint called ###");
    // console.log(files);
    // lint(files);
    runEslint(files);
    // WIP
    // const ruleTester = new eslint.RuleTester({ parserOptions: { ecmaVersion: 2015 } });
    //
    // ruleTester.run("my-rule", rule, {
    //   valid: [
    //     {
    //       code: "var foo = true",
    //       options: [{ allowFoo: true }]
    //     }
    //   ],
    //   invalid: [
    //     {
    //       code: "var invalidVariable = true",
    //       errors: [{ message: "Unexpected invalid variable." }]
    //     },
    //     {
    //       code: "var invalidVariable = true",
    //       errors: [{ message: /^Unexpected.+variable/ }]
    //     }
    //   ]
    // });
  });

program
  .command("beautify <extenstion>")
  .description("Make your project prettier.")
  .action(extenstion => runPrettierOnProject(extenstion));

program
  .command("post-commit")
  .description("post-commit actions")
  .action(() => postCommit());

program
  .command("prepare-commit-msg")
  .description("prepare-commit-msg actions")
  .action(() => prepareCommitMsg());

program
  .command("linters")
  .alias("lts")
  .description("Lists installed linters")
  .action(() => fetchLinters());
// ********** Rubocop **********

program
  .command("check-packages")
  .description("Check Installed Packages")
  .action(() => checkInstalledPackages());

// ********** Repositories **********

program
  .command("publish")
  .description("Add current repository to Lint")
  .action(() => {
    const defaultRepositoryName = process
      .cwd()
      .split("/")
      .pop();
    const default_msg =
      "Enter Repository Name (default:" + defaultRepositoryName + ")";
    prompt([
      {
        type: "input",
        name: "name",
        message: default_msg,
        default: defaultRepositoryName
      }
    ])
      .then(answers => {
        if (answers.name) {
          createRepositoryOnLint(answers.name, false)
            .then(body => {
              process.exit(0);
            })
            .catch(function (e) {
              process.exit(1);
            });
        } else {
          console.error("Can't be blank");
        }
      })
      .catch(function (err) {
        console.log(err);
        process.exit(1);
      });
  });

program
  .command("list")
  .alias("ls")
  .description("Lists repositories")
  .action(() => getRepositories());

// ********** Git **********

program
  .command("clone <repoPath> [localPath, [options]]")
  .description("Creates an Omnilint account")
  .action((repoPath, localPath, options) => {
    smartCloneRepository(repoPath, localPath, options);
  });

program
  .command("push")
  .description("Pushes repository")
  .action(() => {
    console.log("Pushing repository...");
    simpleGit().push();
  });

program
  .command("pull")
  .description("Pulls repository")
  .action(() => {
    console.log("Pulling repository...");
    simpleGit().pull();
  });

// program
//   .command("init")
//   .description("Initializes repository")
//   .action(() => {
//     console.log("Initiating repository...");
//     simpleGit().init();
//   });

program
  .command("fetch")
  .description("Fetches repository")
  .action(() => {
    console.log("Fetching repository...");
    simpleGit().fetch();
  });

program
  .command("merge <from> <to>")
  .description("Merges repository from one branch to another")
  .action((from, to) => {
    console.log("Merging repository...");
    simpleGit().merge(from, to);
  });

program
  .command("add [files...]")
  .description("Adds one or more files to be under source control")
  .action(files => {
    if (files) {
      console.log("Adding files to source control...");
      simpleGit().add(files);
    }
  });

program
  .command("checkout <something>")
  .description("Checks out the supplied tag, revision or branch")
  .action(something => {
    if (something) {
      console.log("Checking out " + chalk.green(something) + "...");
    }
    simpleGit().checkout(files);
  });

program
  .command("commit <message>")
  .description("Commits changes in the current working directory")
  .action(message => {
    if (message) {
      console.log("Commiting " + chalk.green(message) + "...");
    }
    simpleGit().commit(message);
  });

program
  .command("checkIfIgnored [files...]")
  .description("Checks if one or more files are c by .gitignore rules")
  .action(files => {
    if (files) {
      console.log("Checking if files are excluded by .gitignore rules...");
    }
    simpleGit().checkIgnore(files);
  });

program
  .command("checkIfRepository")
  .description(
    "Checks whether the current working directory is a git repository"
  )
  .action(() => {
    simpleGit().checkIsRepo((err, result) => {
      // console.log('Checking whether ' + chalk.green(process.cwd()) + ' is a git repository...');
      if (result) {
        console.log(chalk.green(process.cwd()) + " is a git repository.");
      } else {
        console.log(chalk.red(process.cwd()) + " is not a git repository.");
      }
    });
  });

program
  .command("list-all")
  .description("List all files managed by git.")
  .action(() => {
    listAllFiles()
      .then(files => {
        console.log(files.length + " files found.");
      })
      .catch(err => {
        console.log(err);
        process.exit(1);
      });
  });

program.parse(process.argv);

// Show help if no args
if (program.args.length === 0) {
  program.help();
}

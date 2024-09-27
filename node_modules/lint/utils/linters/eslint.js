const fs = require("fs");
const os = require("os");
const path = require("path");
const chalk = require("chalk");
const request = require("request");
const { exec, execSync, spawn } = require("child_process");
var CliTable = require("cli-table");
const ora = require("ora");
var _ = require("lodash");

const {
  getUsernameFromLocalDevice,
  getTokenFromLocalDevice
} = require("../user");
const {
  getEnclosingGitRepository,
  isLintFilePresent,
  getDotLintDirectory
} = require("../filesHandler");
const dotLintDirectory = getDotLintDirectory();

const yaml = require("js-yaml");

const API_BASE_URL = "https://api.omnilint.com";
const DEV_API_BASE_URL = "http://localhost:3000";

function checkIfEslintIsInstalled() {
  try {
    var res = execSync("which eslint");
    if (res) {
      // console.log(res.toString())
      return true;
    }
  } catch (err) {
    // console.log('Error')
    // console.log(err)
    return false;
  }
  return false;
}

function runEslint(files, autofix, commitAttempt, desiredFormat, truncate) {
  // var cmd = "which eslint";
  // console.log("=== Lint called ===");
  if (autofix) {
    var cmd =
      'eslint --config ' +
      dotLintDirectory +
      '/tmp/eslintrc --fix --format json "' + files.join('" "') + '"'
    // console.log("Prepare to fix");
  } else {
    var cmd =
      'eslint --config ' +
      dotLintDirectory +
      '/tmp/eslintrc --format json "' + files.join('" "') + '"'
  }
  try {
    // console.log("=== Try ===");
    var linter_command = execSync(cmd);
    if (linter_command) {
      // // console.log("linter_command.toString() WORKS");
      // console.error(linter_command.toString() );
      // process.stdout.write(linter_command);
      // console.log(linter_command.stdout);
      // console.log(linter_command);
      var output = JSON.parse(linter_command);

      if (desiredFormat == "simple") {
        parseOutPoutForRuleCheckAsText(output, truncate);
      } else {
        parseOutPoutForRuleCheckAsTable(output);
      }
      // console.log("Error");
      // console.log(parseEslintResults(output, body));
      return parseEslintResults(output, commitAttempt);

      // console.log(output)
      // prepareRequestAfterLint(true, body, 0, output);
    }
  } catch (err) {
    // // console.log("=== Catch ===");
    // // console.log(err);
    //

    if (err.stdout) {
      // console.log("=== Catch stdout ===");
      // console.log(err.stdout.toString());
      var output = JSON.parse(err.stdout);
      // parseOutPoutForRuleCheckAsTable(output)
      // prepareRequestAfterLint(false, body, 1, output);
      if (desiredFormat == "simple") {
        parseOutPoutForRuleCheckAsText(output);
      } else {
        parseOutPoutForRuleCheckAsTable(output);
      }

      return parseEslintResults(output, commitAttempt);
    }
  }
}

function parseOutPoutForRuleCheckAsTable(output) {
  output.forEach(function(file) {
    console.log("");
    console.log("*******************************************************");
    console.log(file.filePath);
    console.log("*******************************************************");

    var table = new CliTable({
      // style: { 'padding-left': 0, 'padding-right': 0 },
      head: [
        chalk.cyan("Line:Column"),
        chalk.cyan("Severity"),
        chalk.cyan("Rule"),
        chalk.cyan("Message")
        // chalk.cyan('Updated'),
      ],
      colWidths: [16, 10, 15, 80]
    });
    file.messages.forEach(function(message) {
      // console.log(message);
      var ruleName = message.ruleId;
      var linterMessage;
      var severity;
      if (message.severity == 1) {
        linterMessage = message.message;
        severity = chalk.yellow("Warning");
      } else if (message.severity == 2) {
        linterMessage = message.message;
        severity = chalk.red("Error");
      }
      // var line = message.line
      // var column = message.column
      // console.log("Line From ");
      // console.log(message.line);
      //
      // console.log(column);
      var codeCoordinate = message.line + ":" + message.column;
      // var codeCoordinate = chalk.gray(message.line + ":" + message.column)

      table.push([codeCoordinate, severity, ruleName, message.message]);
    });

    if (file.warningCount > 0 || file.errorCount > 0) {
      console.log(table.toString());
      console.log(chalk.yellow("Number of warnings: " + file.warningCount));
      console.log(chalk.red("Number of errors: " + file.errorCount));
    } else {
      ora("No offense, bravo!").succeed();

      // console.log(chalk.green("No offense found !"));
    }
  });
}

function sortErrorsToDisplay(file, truncate) {
  var errorMessages = [];
  var warningMessages = [];

  if (truncate && file.messages.length > 10) {
    file.messages.forEach(function(message) {
      // console.log(message);
      if (message.severity == 1) {
        warningMessages.push(message);
        // console.log(message);
      } else {
        errorMessages.push(message);
        // console.log(message);
      }
    });
    var errorsToDisplay = warningMessages.concat(errorMessages);
    // errorsToDisplay.sort((a, b) =>
    //   b.severity > a.severity ? 1 : a.severity > b.severity ? -1 : 0
    // );
    errorsToDisplay.sort(function(a, b) {
      if (a.severity === b.severity) {
        // Line is only important when severities are the same
        if (a.line === b.line) {
          // Column is only important when lines are the same
          return a.column > b.column ? 1 : -1;
        }
        return a.line > b.line ? 1 : -1;
      }
      return b.severity > a.severity ? 1 : -1;
    });

    errorsToDisplay = errorsToDisplay.slice(0, 10);
  } else {
    // var errorsToDisplay = file.messages.sort((a, b) =>
    //   b.severity > a.severity ? 1 : a.severity > b.severity ? -1 : 0
    // );
    var errorsToDisplay = file.messages.sort(function(a, b) {
      if (a.severity === b.severity) {
        // Line is only important when severities are the same
        if (a.line === b.line) {
          // Column is only important when lines are the same
          return a.column > b.column ? 1 : -1;
        }
        return a.line > b.line ? 1 : -1;
      }
      return b.severity > a.severity ? 1 : -1;
    });
  }
  return errorsToDisplay;
}

function parseOutPoutForRuleCheckAsText(output, truncate) {
  // console.log("Parse");
  // console.log(output);
  const spinner = ora("No offense, bravo!");

  output.forEach(function(file) {
    console.log("");
    // console.log("- " + chalk.green(file.filePath.substring(
    //   file.filePath.lastIndexOf("/") + 1
    // )))
    var relativePath = file.filePath.replace(process.cwd() + "/", "");

    // console.log(file.filePath.indexOf(directory));

    // console.log(file.filePath.substring(file.filePath.indexOf(process.cwd())))

    console.log("- " + chalk.green(relativePath));

    console.log(
      "--------------------------------------------------------------------------------------"
    );
    // console.log(file);
    if (file.messages.length == 0) {
      spinner.succeed();
      // console.log("");
      // console.log(chalk.green("No offense in file"));
      return;
    }
    // console.log("Line:Column Severity Rule Message");
    file.messages.sort((a, b) =>
      b.severity > a.severity ? 1 : a.severity > b.severity ? -1 : 0
    );

    var errorsToDisplay = sortErrorsToDisplay(file, truncate);
    // console.log(errorsToDisplay);
    // console.log(errorMessages.length);
    // file.messages.sort( function( a.severity, b.severity ) { return a.severity - b.severity });
    errorsToDisplay.forEach(function(message) {
      // console.log(message);
      var ruleName = message.ruleId;
      var linterMessage;
      var severity;
      if (message.severity == 1) {
        linterMessage = message.message;
        severity = chalk.yellow("Warning");
      } else if (message.severity == 2) {
        linterMessage = message.message;
        severity = chalk.red("Error");
      }
      var codeCoordinate = message.line + ":" + message.column;

      console.log(
        chalk.grey(codeCoordinate) +
          " " +
          severity +
          " " +
          ruleName +
          " " +
          chalk.grey(message.message)
      );
    });
    if (truncate && file.messages.length > 10) {
      console.log(
        chalk.grey(
          " + " +
            (file.messages.length - errorsToDisplay.length) +
            " other offenses."
        )
      );
    }
    // console.log("");
    var messageToPrint = "Found ";
    var messageToPrint2 = "Found ";

    if (file.errorCount > 0) {
      messageToPrint += chalk.red(file.errorCount) + " errors";
    } else {
      messageToPrint += chalk.green(file.errorCount) + " error";
    }

    if (file.warningCount > 0) {
      messageToPrint += ", " + chalk.yellow(file.warningCount) + " warnings.";
    } else {
      messageToPrint += ", " + chalk.green(file.warningCount) + " warning.";
    }

    if (file.fixableErrorCount > 0) {
      messageToPrint2 += chalk.red(file.fixableErrorCount) + " fixable errors";
    } else {
      messageToPrint2 += chalk.green(file.fixableErrorCount) + " fixable error";
    }

    if (file.fixableWarningCount > 0) {
      messageToPrint2 +=
        ", " + chalk.yellow(file.fixableWarningCount) + " fixable warnings.";
    } else {
      messageToPrint2 +=
        ", " + chalk.green(file.fixableWarningCount) + " fixable warning.";
    }
    console.log(messageToPrint);
    console.log(messageToPrint2);
    // console.log("");

    // console.log("errorCount: " + file.errorCount);
    // console.log("warningCount: " + file.warningCount);
    // console.log("fixableErrorCount: " + file.fixableErrorCount);
    // console.log("fixableWarningCount: " + file.fixableWarningCount);
  });
}

function createESlintConfig(rules) {
  json = {
    parserOptions: {
      ecmaVersion: 2018,
      ecmaFeatures: {
        jsx: true
      }
    },
    env: {
      es6: true,
      node: true
    },

    plugins: [],

    globals: {
      document: false,
      navigator: false,
      window: false
    },

    rules
  };
  json = JSON.stringify(json);

  if (!fs.existsSync(dotLintDirectory)) {
    fs.mkdirSync(dotLintDirectory);
  }
  if (!fs.existsSync(dotLintDirectory + "/tmp")) {
    fs.mkdirSync(dotLintDirectory + "/tmp");
  }
  fs.writeFileSync(dotLintDirectory + "/tmp/eslintrc", json);
  // console.log("ESLint configuration file successfully updated.");
}

function assignESlintRules(policy_rule) {
  if (policy_rule.linter.linter.command == "eslint") {
  } else if (policy_rule.linter.linter.command == "rubocop") {
  }
}

function selectFilesForESLint(stagedFilePaths) {
  var selectedFiles = [];
  stagedFilePaths.forEach(function(file) {
    if (getExtension(file) === "js" || getExtension(file) === "jsx") {
      selectedFiles.push(file);
    }
  });
  return selectedFiles;
}

function checkIfLintStagedConfigExist() {
  try {
    var res = execSync("which lint-staged");
    if (res) {
      return true;
    }
  } catch (err) {
    return false;
  }
  return false;
}

function getExtension(file) {
  var extenstion = file.split(".").pop();
  return extenstion;
}

function eslintNoConfig() {
  exec(
    "eslint index.js --no-eslintrc --parser-options=ecmaVersion:6",
    (err, stdout, stderr) => {
      if (err) {
        throw err;
        return;
      }
    }
  );
}

function createRuleCheckJson(output, commitAttempt) {
  var rule_checks_attributes = [];
  var file_rule_checks = [];
  // console.log("Output createRuleCheckJson");
  //
  //

  // console.log(output);
  console.log("");
  // console.log("createRuleCheckJson");
  var dict = [];

  output.forEach(function(file) {
    var relativePath = file.filePath.replace(process.cwd() + "/", "");
    if (file.messages.length == 0) {
      var fileReport = {
        file_name: relativePath.substring(relativePath.lastIndexOf("/") + 1),
        file_path: relativePath,
        linter: "eslint"
      };
      rule_checks_attributes.push(fileReport);
    } else {
      file.messages.forEach(function(message) {
        var fileReport = {};
        fileReport.file_path = relativePath;
        fileReport.file_name = file.filePath.substring(
          file.filePath.lastIndexOf("/") + 1
        );

        fileReport.line = message.line;
        fileReport.column = message.column;
        fileReport.line_end = message.endLine;
        fileReport.column_end = message.endColumn;

        fileReport.message = message.message;
        fileReport.linter = "eslint";


        fileReport.rule_id = null;

        // console.log(policy_rule.slug);

        fileReport.name = message.ruleId;

        fileReport.severity_level = message.severity;
        // console.log(fileReport);
        // console.log("");

        var lines = getOffenseLine(file.filePath, message.line);
        fileReport.source = lines;
        // console.log(fileReport);
        // console.log(line);
        rule_checks_attributes.push(fileReport);
      });
    }
  });
  return rule_checks_attributes;
}

function getOffenseLine(file, lineStart) {
  var offenseLines = [];
  var allLines = fs
    .readFileSync(file)
    .toString()
    .split("\n");
  for (var i = lineStart - 3; i < lineStart + 2; i++) {
    if (i > -1) {
      if (typeof allLines[i] !== "undefined") {
        offenseLines.push({ line: i + 1, code: allLines[i] });
      }
    }
  }
  return offenseLines;
}

function createPolicyCheckJson(passed, output, commitAttempt) {
  var totalError = 0;
  var totalWarn = 0;
  var totalfixableErrorCount = 0;
  var totalfixableWarnCount = 0;

  output.forEach(function(file) {
    totalError += file.errorCount;
    totalWarn += file.warningCount;
    totalfixableErrorCount += file.fixableErrorCount;
    totalfixableWarnCount += file.fixableWarningCount;
  });

  var policy_check_attribute = {
    name: content.message,
    passed: passed,
    commit_attempt_id: content.id,
    policy_id: content.id,
    repository_id: content.repository.id,
    user_id: commitAttempt.user_id,
    policy_id: commitAttempt.policy.id,
    error_count: totalError,
    warning_count: totalWarn,
    fixable_error_count: totalfixableErrorCount,
    fixable_warning_count: totalfixableWarnCount,
    rule_checks_attributes: createRuleCheckJson(output, commitAttempt)
  };
  return policy_check_attribute;
}

// Create Policy_check with result
function prepareRequestAfterLint(passed, commitAttempt, exitCode, output) {
  const token = getTokenFromLocalDevice();
  var postUrl = `${API_BASE_URL}/policy_checks.json?user_token=${token}`;
  return new Promise((resolve, reject) => {
    request.post(
      postUrl,
      {
        json: {
          policy_check: createPolicyCheckJson(passed, output, commitAttempt)
        }
      },
      function(error, response, obj) {
        if (response) {
          if (!error && response.statusCode === 201) {
            // console.log("Policy Check Saved");
            var stringify = JSON.stringify(obj);
            // console.log(obj);
            resolve(obj);
            process.exit(exitCode);
          } else {
            reject(new Error("Unable to create Policy Check."));
          }
        } else {
          console.error(new Error("Unable to create Policy Check."));
          reject(error);
        }
      }
    );
  });
}

function installEslint() {
  try {
    console.log("=== Instaling ESLint ===");
    var install_cmd = execSync("npm install -g eslint", { stdio: [0, 1, 2] });
    if (install_cmd) {
      console.log(install_cmd.toString());
      // process.exit(0);
    }
  } catch (err) {
    // console.log("=== Catch ===");
    console.log(err);
    if (err.stdout) {
      // console.log("=== Catch stdout ===");
      console.log(err.stdout.toString());
    }
    // process.exit(1);
    // console.log("=== Catch after ===");
  }
}

function parseEslintResults(output, commitAttempt) {
  var eslintReport = {};
  var totalError = 0;
  var totalWarn = 0;
  var totalfixableErrorCount = 0;
  var totalfixableWarnCount = 0;
  var fileInfo = [];

  output.forEach(function(file) {
    totalError += file.errorCount;
    totalWarn += file.warningCount;
    totalfixableErrorCount += file.fixableErrorCount;
    totalfixableWarnCount += file.fixableWarningCount;
  });

  eslintReport.name = commitAttempt.message;
  eslintReport.commit_attempt_id = commitAttempt.id;
  eslintReport.repository_id = commitAttempt.repository_id;
  eslintReport.user_id = commitAttempt.user_id;
  eslintReport.policy_id = commitAttempt.policy.id;
  eslintReport.error_count = totalError;
  eslintReport.warning_count = totalWarn;
  eslintReport.fixable_error_count = totalfixableErrorCount;
  eslintReport.fixable_warning_count = totalfixableWarnCount;

  eslintReport.rule_checks_attributes = createRuleCheckJson(output, commitAttempt);

  // console.log(eslintReport);
  return eslintReport;
}

module.exports = {
  createESlintConfig,
  runEslint,
  assignESlintRules,
  selectFilesForESLint,
  installEslint,
  checkIfEslintIsInstalled,
  checkIfLintStagedConfigExist,
  eslintNoConfig,
  parseOutPoutForRuleCheckAsText,
  parseOutPoutForRuleCheckAsTable,
  parseEslintResults
};

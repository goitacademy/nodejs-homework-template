const { execSync } = require("child_process");
// const readln = require('readline')
const { prompt } = require("inquirer");
const ora = require("ora");
var CliTable = require("cli-table");
const chalk = require("chalk");
const request = require("request");
const path = require("path");
var _ = require('lodash');

const fs = require("fs");
const yaml = require("js-yaml");
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

const API_BASE_URL = "https://api.omnilint.com";
const DEV_API_BASE_URL = "http://localhost:3000";

function checkIfRubyIsInstalled() {
  try {
    var res = execSync("ruby -v");
    if (res) {
      console.log(res.toString());
      return true;
    }
  } catch (err) {
    return false;
  }
  return false;
}

function enableRule(policy_rule) {
  if (policy_rule.status == "off") {
    return false;
  } else {
    return true;
  }
}

function createRubocopConfig(rubocopRules) {
  // console.log(rubocopRules);

  var yml = yaml.dump(rubocopRules);
  // console.log("yml");

  // console.log(yml);

  if (!fs.existsSync(dotLintDirectory)) {
    fs.mkdirSync(dotLintDirectory);
  }
  if (!fs.existsSync(dotLintDirectory + "/tmp")) {
    fs.mkdirSync(dotLintDirectory + "/tmp");
  }
  fs.writeFileSync(dotLintDirectory + "/tmp/rubocop.yml", yml);
}

function checkIfRubocopIsInstalled() {
  try {
    var res = execSync("which rubocop");
    if (res) {
      return true;
    }
  } catch (err) {
    return false;
  }
  return false;
}

function checkInstalledPackages() {
  if (checkIfRubyIsInstalled()) {
    console.log("Ruby is installed");
    if (checkIfRubocopIsInstalled()) {
      console.log("Rubocop is installed.");
    } else {
      return console.error("Rubocop is not installed.");
    }
  } else {
    return console.error(
      "Ruby is not installed. Please install Ruby to continue."
    );
  }
}

function selectFilesForRuboCop(stagedFilePaths) {
  var selectedFiles = [];
  stagedFilePaths.forEach(function(file) {
    if (
      getRubyExtension(file).toLowerCase() === "rake" ||
      getRubyExtension(file).toLowerCase() === "rb" ||
      getRubyExtension(file).toLowerCase() === "gemfile"
    ) {
      selectedFiles.push(file);
    }
  });
  return selectedFiles;
}

function getRubyExtension(file) {
  var extenstion = file.split(".").pop();
  return extenstion;
}

function askToInstallRubocop() {
  prompt([
    {
      type: "confirm",
      name: "confirm",
      message: "Do you want to install Rubocop ? ?"
    }
  ]).then(answer => {
    if (!answer.confirm) {
      process.exit(0);
    }
    installRubocop();
  });
}

function installRubocop() {
  try {
    console.log("==== Instaling Rubocop ===");
    var install_cmd = execSync("gem install rubocop", { stdio: [0, 1, 2] });
    if (install_cmd) {
      console.log(install_cmd.toString());
      // process.exit(0);
    }
  } catch (err) {
    // console.log("==== Catch ===");
    console.log(err);
    if (err.stdout) {
      // console.log("==== Catch stdout ===");
      console.log(err.stdout.toString());
    }
    // process.exit(1);
    // console.log("==== Catch after ===");
  }
}

function runRubocopJson(files, autofix, body, desiredFormat) {
  // console.log("Launching Rubocop");

  if (checkIfRubocopIsInstalled()) {
    // console.log(files);
    // console.log("Rubocop is installed.");
    if (autofix) {
      var cmd =
        "rubocop --config " +
        dotLintDirectory +
        // TODO: Fix autofix
        // "/tmp/rubocop.yml --color --fix --format json " +
        "/tmp/rubocop.yml --color --format json " +
        files.join(" ");
      // console.log("Running autofix");
    } else {
      // console.log("Prepare to lint");

      var cmd =
        "rubocop --config " +
        dotLintDirectory +
        "/tmp/rubocop.yml --color --format json " +
        files.join(" ");
    }


    try {
      // console.log("==== Try ===");
      // console.log(cmd);
      var linter_command = execSync(cmd);
      if (linter_command) {
        var output = JSON.parse(linter_command);
        if (desiredFormat == "simple") {
          parseOutPoutForRuleCheckAsText(output);
        } else {
          parseOutPoutForRuleCheckAsTable(output);
        }

        return parseRubocopResults(output, body);

      }
    } catch (err) {
      // console.log("==== Catch ===");
      // console.log(err);
      if (err.stdout) {
        var output = JSON.parse(err.stdout);
        // console.log(output);
        if (desiredFormat == "simple") {
          parseOutPoutForRuleCheckAsText(output);
        } else {
          parseOutPoutForRuleCheckAsTable(output);
        }
        return parseRubocopResults(output, body);
        // console.log("Output");
        // console.log(output);
        // prepareRequestAfterLint(false, body, 1, output);

        // console.log("==== Catch stdout ===");
        // console.log(err.stdout.toString());
      }
      // console.log("==== Catch after ===");
    }
    // console.log("Linting Done");
  } else {
    console.log("Rubocop not Installed");
    installRubocop();
  }
}

function runRubocop(files, autofix) {
  // console.log("Launching Rubocop");
  if (checkIfRubocopIsInstalled()) {
    // console.log("Rubocop is installed.");

    if (autofix) {
      var cmd =
        "rubocop --config .rubocop.yml --color --fix --format simple " +
        files.join(" ");
      console.log("Running autofix");
    } else {
      // console.log("Prepare to lint");

      var cmd =
        "rubocop --config .rubocop.yml --color --format simple " +
        files.join(" ");
    }
    try {
      // console.log("==== Try ===");
      var linter_command = execSync(cmd);
      if (linter_command) {
        console.log("linter_command.toString() WORKS");

        console.error(linter_command);

        process.stdout.write(linter_command);
        // console.log(linter_command.stdout);
        // console.log(linter_command);
        process.exit(0);
        return linter_command;
      }
    } catch (err) {
      // console.log("==== Catch ===");
      // console.log(err);
      if (err.stdout) {
        // console.log("==== Catch stdout ===");
        console.log(err.stdout.toString());
      }
      process.exit(1);
      // console.log("==== Catch after ===");
    }
    // console.log("Linting Done");
  } else {
    console.log("Rubocop not Installed");
    installRubocop();
  }
}

function getOffenseLine(file, lineStart){
  var offenseLines = []
  var allLines = fs.readFileSync(file).toString().split('\n')
  for (var i = lineStart-3; i < lineStart+2; i++) {
    if (i > -1) {
      if (typeof allLines[i] !== 'undefined') {
        offenseLines.push({line:i+1, code:allLines[i]})
      }
    }
  }

  return offenseLines
}


function parseRubocopResults(output, body) {
  var rubocopReport = {};
  var totalError = 0;
  var totalWarn = 0;
  var totalfixableErrorCount = 0;
  var totalfixableWarnCount = 0;

  output.files.forEach(function(file) {
    file.offenses.forEach(function(offense) {
      // console.log(offense);
      if (offense.severity == "warning") {
        totalWarn = totalWarn + 1;
        if (offense.corrected == true) {
          totalfixableWarnCount = totalfixableWarnCount + 1;
        }
      } else if (offense.severity == "error") {
        totalError = totalError + 1;
        if (offense.corrected == true) {
          totalfixableErrorCount = totalfixableErrorCount + 1;
        }
      }
    });

  });


  rubocopReport.name = body.content.message
  rubocopReport.commit_attempt_id = body.content.id
  rubocopReport.repository_id = body.content.repository_id
  rubocopReport.user_id = body.content.user_id
  rubocopReport.policy_id = body.policy.content.id
  rubocopReport.error_count = totalError
  rubocopReport.warning_count = totalWarn
  rubocopReport.fixable_error_count = totalfixableErrorCount
  rubocopReport.fixable_warning_count = totalfixableWarnCount
  rubocopReport.rule_checks_attributes = createRuleCheckJson(output, body);


  return rubocopReport;
}

function sortErrorsToDisplay(file) {
  var errorMessages = [];
  var warningMessages = [];
  var errorsToDisplay;
  if (file.offenses.length > 10) {
    file.offenses.forEach(function(offense) {
      // console.log(offense);

      if (offense.severity == "Warning") {
        warningMessages.push(offense);
        // console.log(message);
      } else {
        errorMessages.push(offense);
        // console.log(message);
      }
    });
    errorsToDisplay = warningMessages.concat(errorMessages);
    // errorsToDisplay.sort((a, b) =>
    //   b.severity > a.severity ? 1 : a.severity > b.severity ? -1 : 0
    // );
    errorsToDisplay.sort(function(a, b) {
      if (a.severity === b.severity) {
        // Line is only important when severities are the same
        if (a.location.line === b.location.line) {
          // Column is only important when lines are the same
          return a.location.column > b.location.column ? 1 : -1;
        }
        return a.location.line > b.location.line ? 1 : -1;
      }
      return b.severity < a.severity ? 1 : -1;
    });
    errorsToDisplay = errorsToDisplay.slice(0, 10);
  } else {
    // var errorsToDisplay = file.offenses.sort((a, b) =>
    //   b.severity < a.severity ? 1 : a.severity < b.severity ? -1 : 0
    // );
    errorsToDisplay = file.offenses.sort(function(a, b) {
      if (a.severity === b.severity) {
        // Line is only important when severities are the same
        if (a.location.line === b.location.line) {
          // Column is only important when lines are the same
          return a.location.column > b.location.column ? 1 : -1;
        }
        return a.location.line > b.location.line ? 1 : -1;
      }
      return b.severity < a.severity ? 1 : -1;
    });
  }
  return errorsToDisplay;
}

function parseOutPoutForRuleCheckAsText(output) {
  const spinner = ora("No offense, bravo!");
  output.files.forEach(function(file) {
    var warningCount = 0;
    var errorCount = 0;
    console.log("");
    console.log("- " + chalk.green(file.path));
    // console.log(file.path);
    console.log("--------------------------------------------------------------------------------------");
    // console.log(file.offenses);
    // console.log(file.offenses.length);
    // console.log(file.offenses.count);
    // console.log(file.offenses);
    if (file.offenses.length > 0) {
      // console.log("Line:Column Severity Rule Message");
    } else {
      spinner.succeed();
      // console.log(chalk.green("No offense, bravo!"));
    }
    // if (file.offenses.length > 10) {
    //   var errorMessages = file.offenses.slice(0, 10);
    // } else {
    //   var errorMessages = file.offenses;
    // }
    var errorsToDisplay = sortErrorsToDisplay(file);

    errorsToDisplay.forEach(function(offense) {
      var ruleName = offense.cop_name;
      var linterMessage;
      var ruleSeverity;
      if (offense.severity == "warning") {
        linterMessage = offense.message;
        ruleSeverity = chalk.yellow("Warning");
        warningCount++;
      } else if (offense.severity == "error") {
        linterMessage = offense.message;
        ruleSeverity = chalk.red("Error");
        errorCount++;
      }
      var codeCoordinate =
        offense.location.line + ":" + offense.location.column;

      console.log(
        codeCoordinate +
          " " +
          ruleSeverity +
          " " +
          ruleName +
          " " +
          linterMessage
      );
    });

    if (file.offenses.length > 10) {
      console.log(
        chalk.grey(
          " + " +
            (file.offenses.length - errorsToDisplay.length) +
            " others offenses."
        )
      );
    }

    // console.log("");
    var messageToPrint = "Found ";
    var messageToPrint2 = "Found ";

    if (errorCount > 0) {
      messageToPrint += chalk.red(errorCount) + " errors";
    } else {
      messageToPrint += chalk.green(errorCount) + " error";
    }

    if (warningCount > 0) {
      messageToPrint += ", " + chalk.yellow(warningCount) + " warnings.";
    } else {
      messageToPrint += ", " + chalk.green(warningCount) + " warning.";
    }


    // console.log(messageToPrint);

    // console.log(messageToPrint2);
  });
}
function parseOutPoutForRuleCheckAsTable(output) {
  // console.log(output);
  var warning_count = 0;
  var error_count = 0;
  output.files.forEach(function(file) {
    console.log("");
    console.log("*******************************************************");
    console.log(file.path);
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
      colWidths: [16, 10, 20, 80]
    });
    file.offenses.forEach(function(offense) {
      // console.log((offense.location.line + ":" + offense.location.column).toString());
      // console.log(offense.cop_name);
      // console.log(offense.message);
      // console.log(offense.severity);

      var ruleName = offense.cop_name;
      var linterMessage;
      var ruleSeverity;
      if (offense.severity == "warning") {
        linterMessage = offense.message;
        ruleSeverity = chalk.yellow("Warning");
        warning_count++;
      } else if (offense.severity == "error") {
        linterMessage = offense.message;
        ruleSeverity = chalk.red("Error");
        error_count++;
      }
      // console.log(offense);
      // var coordinate = offense.location
      // console.log("coordinate");
      // console.log(coordinate);

      // var line = coordinate.line
      // var column = coordinate.column
      //
      // console.log("Line From ");
      // console.log(message.line);
      //
      // console.log(line);

      // console.log(column);
      // if ((line) && (column)) {
      // }
      // var codeCoordinate = chalk.gray(message.line + ":" + message.column)
      var codeCoordinate =
        offense.location.line + ":" + offense.location.column;

      table.push([codeCoordinate, ruleSeverity, ruleName, linterMessage]);
    });

    console.log(table.toString());

    console.log(chalk.yellow("Number of warnings: " + warning_count));
    console.log(chalk.red("Number of errors: " + error_count));
  });
}

function prepareRequestAfterLint(passed, body, exitCode, output) {
  const token = getTokenFromLocalDevice();
  var postUrl = `${API_BASE_URL}/policy_checks.json?user_token=${token}`;
  return new Promise((resolve, reject) => {
    request.post(
      postUrl,
      {
        json: {
          policy_check: createPolicyCheckJson(passed, output, body)
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

function createPolicyCheckJson(passed, output, body) {
  var totalError = 0;
  var totalWarn = 0;
  var totalfixableErrorCount = 0;
  var totalfixableWarnCount = 0;

  output.files.forEach(function(file) {
    file.offenses.forEach(function(offense) {
      // console.log(offense);
      if (offense.severity == "warning") {
        totalWarn = totalWarn + 1;
      } else if (offense.severity == "error") {
        totalError = totalError + 1;
      }
      if (offense.corrected) {
        totalfixableErrorCount = totalfixableErrorCount + 1;
      }
    });
    totalfixableErrorCount += file.fixableErrorCount;
    totalfixableWarnCount += file.fixableWarningCount;
  });

  var policy_check_attribute = {
    name: body.content.message,
    passed: passed,
    commit_attempt_id: body.content.id,
    policy_id: body.policy.id,
    repository_id: body.content.repository_id,
    user_id: body.content.user_id,
    policy_id: body.policy.content.id,
    error_count: totalError,
    warning_count: totalWarn,
    fixable_error_count: totalfixableErrorCount,
    fixable_warning_count: totalfixableWarnCount,
    rule_checks_attributes: createRuleCheckJson(output, body)
  };
  return policy_check_attribute;
}

function createRuleCheckJson(output, body) {
  var rule_checks_attributes = [];
  var file_rule_checks = [];
  console.log("");
  var filePath = ""

  // body.policy.policy_rules.forEach(function(policy_rule) {
    var fileInfo = []

    output.files.forEach(function(file) {



      if (file.offenses.length == 0) {
        if (filePath !== file.path) {


        var fileReport = {
          file_name: file.path.substring( file.path.lastIndexOf("/") + 1 ),
          file_path: file.path

        }

        rule_checks_attributes.push(fileReport);
        }
        filePath = file.path
        // _.union(rule_checks_attributes, fileReport);
      } else {
        file.offenses.forEach(function(offense) {
          var fileReport = {};
          // if (offense.cop_name == policy_rule.slug) {
            fileReport.file_path = file.path;
            fileReport.file_name = file.path.substring(
              file.path.lastIndexOf("/") + 1
            );
            fileReport.message = offense.message;
            // console.log(offense);

            fileReport.line = offense.location.line;
            fileReport.column = offense.location.column;
            fileReport.line_end = offense.location.last_line;
            fileReport.column_end = offense.location.last_column;
            // console.log(policy_rule.slug);
            // fileReport.rule_id = policy_rule.id;

            fileReport.name = offense.cop_name;
            if (offense.severity == "warning") {
              fileReport.severity_level = 1;
            } else if (offense.severity == "error") {
              fileReport.severity_level = 2;
            }

            var lines = getOffenseLine(file.path, offense.location.line)
            fileReport.source = lines

            // fileReport.language_id = policy_rule.language_id;

            rule_checks_attributes.push(fileReport);
          }
        });
      }
    });
  // });

  return rule_checks_attributes;
}

module.exports = {
  checkInstalledPackages,
  selectFilesForRuboCop,
  createRubocopConfig,
  installRubocop,
  enableRule,
  runRubocop,
  checkIfRubocopIsInstalled,
  runRubocopJson
};

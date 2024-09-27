const fs = require("fs");
const { exec, execSync, spawn } = require("child_process");
const ora = require("ora");
const chalk = require("chalk");
var _ = require("lodash");

const {
  getEnclosingGitRepository,
  isLintFilePresent,
  getDotLintDirectory
} = require("../filesHandler");

const dotLintDirectory = getDotLintDirectory();

function checkIfStyleLintIsInstalled() {
  try {
    var res = execSync("which stylelint");
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

function installStyleLint() {
  try {
    console.log("==== Instaling StyleLint ===");
    var install_cmd = execSync("npm install -g stylelint", {
      stdio: [0, 1, 2]
    });
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

function sortstyleLintRules(policy_rule, styleLintRules) {
  var name = policy_rule.slug;
  var styleLintSelectedOptions = {};
  var styleLintRules = styleLintRules;
  var options = [];

  if (
    policy_rule.linter &&
    policy_rule.linter.command == "stylelint"
  ) {
    if (policy_rule.status == "warn") {
      styleLintSelectedOptions["severity"] = "warning";
    } else if (policy_rule.status == "error") {
      styleLintSelectedOptions["severity"] = "error";
    }

    if (policy_rule.options.length == 0) {
      if (policy_rule.status == "warn") {
        styleLintRules[name] = [true, { severity: "warning" }];
      } else if (policy_rule.status == "error") {
        styleLintRules[name] = [true, { severity: "error" }];
      }
    } else {
      policy_rule.options.forEach(function(option) {
        var rule_option = option.rule_option;
        if (rule_option) {
          switch (rule_option.value_type) {
            case "integer":
              // console.log("integer");
              styleLintSelectedOptions[rule_option.slug] = parseInt(
                option.selected.value
              );
              break;
            case "boolean":
              // console.log("Boolean");
              var isTrueSet = option.selected.value == "true";
              styleLintSelectedOptions[rule_option.slug] = isTrueSet;
              break;
            case "string":
              // console.log("String");
              styleLintSelectedOptions[rule_option.slug] =
                option.selected.value;
              break;
            case "array-single":
              styleLintRules[name] = [
                policy_rule.status,
                option.selected.value
              ];
              break;
            case "array-multiple":
              // console.log("array-multiple");
              if (option.rule_option_options.length == 0) {
                // console.log("0 choice");
                styleLintRules[name] = policy_rule.status;
              } else if (option.rule_option_options.length == 1) {
                // console.log("1 choice");
                options.push(option.rule_option_options[0].value);
                styleLintSelectedOptions[rule_option.slug] = options;
              } else if (option.rule_option_options.length > 1) {
                // console.log("More than 1 choice");
                option.rule_option_options.forEach(function(
                  rule_option_option
                ) {
                  options.push(rule_option_option.value);
                });
                styleLintSelectedOptions[rule_option.slug] = options;
              }
              break;
            default:
          }

          // Check if options are selected
          if (Object.keys(styleLintSelectedOptions).length > 0) {
            styleLintRules[name] = [true, styleLintSelectedOptions];
          }
        } else {
          styleLintRules[name] = policy_rule.status;
          // console.log(name);
          // console.log(policy_rule.status);
        }
      });
    }
  }
  // console.log(styleLintRules);
  return styleLintRules;
}

function createStyleLintConfig(rules) {
  rules = { rules: rules };
  var json = JSON.stringify(rules);

  if (!fs.existsSync(dotLintDirectory)) {
    fs.mkdirSync(dotLintDirectory);
  }
  if (!fs.existsSync(dotLintDirectory + "/tmp")) {
    fs.mkdirSync(dotLintDirectory + "/tmp");
  }
  fs.writeFileSync(dotLintDirectory + "/tmp/.stylelintrc", json);
  // console.log("ESLint configuration file successfully updated.");
}

function getExtension(file) {
  return file.split(".").pop();
}

function selectFilesForStyleLint(stagedFilePaths) {
  var selectedFiles = [];
  stagedFilePaths.forEach(function(file) {
    if (
      getExtension(file).toLowerCase() === "sass" ||
      getExtension(file).toLowerCase() === "scss" ||
      getExtension(file).toLowerCase() === "less" ||
      getExtension(file).toLowerCase() === "sss" ||
      getExtension(file).toLowerCase() === "css" ||
      getExtension(file).toLowerCase() === "html"
    ) {
      selectedFiles.push(file);
    }
  });
  return selectedFiles;
}

function sortErrorsToDisplay(file, truncate) {
  var errorMessages = [];
  var warningMessages = [];

  if (truncate && file.warnings.length > 10) {
    file.warnings.forEach(function(message) {
      // console.log(message);
      if (message.severity == "warning") {
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
      return b.severity < a.severity ? 1 : -1;
    });

    errorsToDisplay = errorsToDisplay.slice(0, 10);
  } else {
    // var errorsToDisplay = file.messages.sort((a, b) =>
    //   b.severity > a.severity ? 1 : a.severity > b.severity ? -1 : 0
    // );
    var errorsToDisplay = file.warnings.sort(function(a, b) {
      if (a.severity === b.severity) {
        // Line is only important when severities are the same
        if (a.line === b.line) {
          // Column is only important when lines are the same
          return a.column > b.column ? 1 : -1;
        }
        return a.line > b.line ? 1 : -1;
      }
      return b.severity < a.severity ? 1 : -1;
    });
  }
  return errorsToDisplay;
}

function parseOutPoutForRuleCheckAsText(output, truncate) {
  const spinner = ora("No offense, bravo!");

  output.forEach(function(file) {
    console.log("");

    // console.log(file);
    var relativePath = file.source.replace(process.cwd() + "/", "");
    // console.log(relativePath);

    console.log("- " + chalk.green(relativePath));

    console.log(
      "--------------------------------------------------------------------------------------"
    );

    if (file.warnings.length == 0) {
      spinner.succeed();

      return;
    }
    file.warnings.sort((a, b) =>
      b.severity < a.severity ? 1 : a.severity < b.severity ? -1 : 0
    );
    var totalError = 0;
    var totalWarn = 0;
    file.warnings.forEach(function(message) {
      if (message.severity == "warning") {
        totalWarn++;
      } else if (message.severity == "error") {
        totalError++;
      }
    });
    var errorsToDisplay = sortErrorsToDisplay(file, truncate);
    errorsToDisplay.forEach(function(message) {
      // console.log(message);

      var ruleName = message.rule;
      var severity;
      if (message.severity == "warning") {
        severity = chalk.yellow("Warning");
      } else if (message.severity == "error") {
        severity = chalk.red("Error");
      }
      var codeCoordinate = message.line + ":" + message.column;
      // console.log(message.text.split(/[()]+/)[0]);
      console.log(
        chalk.grey(codeCoordinate) +
          " " +
          severity +
          " " +
          ruleName +
          " " +
          chalk.grey(message.text.split(/[()]+/)[0])
      );
    });

    if (truncate && file.warnings.length > 10) {
      console.log(
        chalk.grey(
          " + " +
            (file.warnings.length - errorsToDisplay.length) +
            " other offenses."
        )
      );
    }

    // console.log("");text
    var messageToPrint = "Found ";
    var messageToPrint2 = "Found ";

    if (totalError > 0) {
      messageToPrint += chalk.red(totalError) + " errors";
    } else {
      messageToPrint += chalk.green(totalError) + " error";
    }

    if (totalWarn > 0) {
      messageToPrint += ", " + chalk.yellow(totalWarn) + " warnings.";
    } else {
      messageToPrint += ", " + chalk.green(totalWarn) + " warning.";
    }

    console.log(messageToPrint);
  });
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

function createRuleCheckJson(output, commitAttempt) {
  var rule_checks_attributes = [];
  var file_rule_checks = [];
  console.log("");

  output.forEach(function(file) {
    var relativePath = file.source.replace(process.cwd() + "/", "");

    if (file.warnings.length == 0) {
      var fileReport = {
        file_name: relativePath.substring(relativePath.lastIndexOf("/") + 1),
        file_path: relativePath,
        linter: "stylelint"
      };
      rule_checks_attributes.push(fileReport);
    } else {
      file.warnings.forEach(function(message) {
        // console.log(message);
        var fileReport = {};

        fileReport.file_path = relativePath;
        fileReport.file_name = relativePath.substring(
          relativePath.lastIndexOf("/") + 1
        );
        fileReport.line = message.line;
        fileReport.column = message.column;
        fileReport.rule_id = null;

        fileReport.message = message.text.split(/[()]+/)[0];

        fileReport.linter = "stylelint"

        // console.log(policy_rule.slug);

        fileReport.name = message.rule;

        if (message.severity == "warning") {
          fileReport.severity_level = 1;
        } else if (message.severity == "error") {
          fileReport.severity_level = 2;
        }

        var lines = getOffenseLine(file.source, message.line);
        fileReport.source = lines;
        rule_checks_attributes.push(fileReport);
      });
    }
  });

  // console.log(rule_checks_attributes);
  return rule_checks_attributes;
}

function parseStyleLintResults(output, commitAttempt) {
  var stylintReport = {};
  var totalError = 0;
  var totalWarn = 0;
  var totalfixableErrorCount = 0;
  var totalfixableWarnCount = 0;
  var fileInfo = [];

  output.forEach(function(file) {
    file.warnings.forEach(function(message) {
      if (message.severity == "warning") {
        totalWarn++;
      } else if (message.severity == "error") {
        totalError++;
      }
    });
  });

  stylintReport.name = commitAttempt.message;
  stylintReport.commit_attempt_id = commitAttempt.id;
  stylintReport.repository_id = commitAttempt.repository_id;
  stylintReport.user_id = commitAttempt.user_id;
  stylintReport.policy_id = commitAttempt.policy.id;
  stylintReport.error_count = totalError;
  stylintReport.warning_count = totalWarn;
  stylintReport.rule_checks_attributes = createRuleCheckJson(output, commitAttempt);

  // console.log(eslintReport);
  return stylintReport;
}

function runStyleLint(styleLintFiles, autofix, commitAttempt, desiredFormat, truncate) {
  // sortPolicyRules()
  var cmd =
    "stylelint --config " +
    dotLintDirectory +
    "/tmp/.stylelintrc " +
    styleLintFiles.join(" ") +
    " -f json";
  // console.log(cmd);
  try {
    var styleLintRunner = execSync(cmd);
    if (styleLintRunner) {
      console.log("styleLintRunner Success");

      var output = JSON.parse(styleLintRunner.toString());

      if (desiredFormat == "simple") {
        parseOutPoutForRuleCheckAsText(output, truncate);
      } else {
        parseOutPoutForRuleCheckAsTable(output);
      }
      // console.log("Error");
      // console.log(parseEslintResults(output, body));
      return parseStyleLintResults(output, commitAttempt);
    }
  } catch (e) {
    if (e) {
      console.log("error");

      console.log(e);
    }
    if (e.stdout) {
      // console.log("e.stdout");
      // console.log(e.stdout.toString());
      // console.log(e.stdout.toString());
      var output = JSON.parse(e.stdout.toString());

      if (desiredFormat == "simple") {
        parseOutPoutForRuleCheckAsText(output, truncate);
      } else {
        parseOutPoutForRuleCheckAsTable(output);
      }
      // console.log("Error");
      // console.log(parseEslintResults(output, body));
      return parseStyleLintResults(output, commitAttempt);
    }
  }
}

module.exports = {
  checkIfStyleLintIsInstalled,
  installStyleLint,
  runStyleLint,
  selectFilesForStyleLint,
  sortstyleLintRules,
  createStyleLintConfig
};

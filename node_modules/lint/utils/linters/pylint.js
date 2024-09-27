const fs = require("fs");
const { execSync } = require("child_process");
const chalk = require("chalk");
const ora = require("ora");
var _ = require("lodash");

const {
  getEnclosingGitRepository,
  isLintFilePresent,
  getDotLintDirectory
} = require("../filesHandler");

const dotLintDirectory = getDotLintDirectory();

function checkIfPythonIsInstalled() {
  try {
    var res = execSync("which python");
    if (res) {
      return true;
    }
  } catch (err) {
    return false;
  }
  return false;
}

function checkIfPipIsInstalled() {
  try {
    var res = execSync("which pip");
    if (res) {
      return true;
    }
  } catch (err) {
    return false;
  }
  return false;
}

function checkIfPylintIsInstalled() {
  try {
    var res = execSync("which pylint");
    if (res) {
      return true;
    }
  } catch (err) {
    return false;
  }
  return false;
}

function installPip() {
  try {
    console.log("=== Instaling Pip ===");
    execSync("curl https://bootstrap.pypa.io/get-pip.py -o get-pip.py");
    var install_cmd = execSync("python get-pip.py", { stdio: [0, 1, 2] });
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

function installPytlint() {
  try {
    console.log("=== Instaling Pytlint ===");
    var install_cmd = execSync("pip install pylint", { stdio: [0, 1, 2] });
    if (install_cmd) {
      console.log(install_cmd.toString());

      // process.exit(0);
    }
  } catch (err) {
    console.log("=== Catch ===");
    console.log(err);
    if (err.stdout) {
      // console.log("=== Catch stdout ===");
      console.log(err.stdout.toString());
    }
    // process.exit(1);
    // console.log("=== Catch after ===");
  }
}

function checkForPyLintRequirement() {
  const spinner = ora();

  var pythonInstalled = checkIfPythonIsInstalled();
  var pipInstalled = checkIfPipIsInstalled();
  var pylintInstalled = checkIfPylintIsInstalled();

  if (!pythonInstalled) {
    console.log("Please install Python first");
    return;
  }

  if (!pipInstalled) {
    console.log("Pip is not installed. Installing...");
    try {
      installPip();
      spinner.succeed("Pip is now installed.");
    } catch (e) {
      console.log(e);
      spinner.fail(
        "Could not install Pip. Please install it using " +
          chalk.cyan(
            "curl https://bootstrap.pypa.io/get-pip.py -o get-pip.py && python get-pip.py"
          ) +
          "."
      );
    }
  }

  if (!pylintInstalled) {
    console.log("Pylint is not installed. Installing...");
    try {
      installPytlint();
      spinner.succeed("Pylint is now installed.");
    } catch (e) {
      console.log(e);
      spinner.fail(
        "Could not install Pylint. Please install it using " +
          chalk.cyan("pip install pylint") +
          "."
      );
    }
  } else {
    spinner.succeed("Pylint is installed.");
  }
}

function formatPylintConfig(
  basicOptions,
  formatOptions,
  similaritiesOptions,
  pythonRules
) {
  pythonRules.forEach(rule => {
    // console.log(rule);
    if (rule.type == "Basic") {
      basicOptions +=
        "\n" + rule.slug + " = " + rule.options[0].selected.value;
    }
    if (rule.type == "Format") {
      formatOptions +=
        "\n" + rule.slug + " = " + rule.options[0].selected.value;
    }
    if (rule.type == "Similaties") {
      similaritiesOptions +=
        "\n" + rule.slug + " = " + rule.options[0].selected.value;
    }
  });
  var config = basicOptions + "\n" + formatOptions + "\n" + similaritiesOptions;

  return config;
}

function sortPylintConfig(rules) {
  var reportOptions = "[REPORTS]\n\noutput-format=text\nreports=no";
  var basicOptions = "[BASIC]";
  var formatOptions = "[FORMAT]";
  var similaritiesOptions = "[SIMILARITIES]";
  var config = formatPylintConfig(
    basicOptions,
    formatOptions,
    similaritiesOptions,
    rules
  );
  return config;
}

function getPythonExtension(file) {
  var extenstion = file.split(".").pop();
  return extenstion;
}

function selectFilesForPylint(stagedFilePaths) {
  var selectedFiles = [];
  stagedFilePaths.forEach(function(file) {
    if (getPythonExtension(file).toLowerCase() === "py") {
      selectedFiles.push(file);
    }
  });
  return selectedFiles;
}

function createPylintConfig(pylintRules) {
  var pylintRulesConfig = pylintRules;

  if (!fs.existsSync(dotLintDirectory)) {
    fs.mkdirSync(dotLintDirectory);
  }
  if (!fs.existsSync(dotLintDirectory + "/tmp")) {
    fs.mkdirSync(dotLintDirectory + "/tmp");
  }
  fs.writeFileSync(dotLintDirectory + "/tmp/.pylintrc", pylintRulesConfig);
}

function sortErrorsToDisplay(file, truncate) {
  var errorMessages = [];
  var warningMessages = [];
  var errorsToDisplay;



  if (truncate && file.length > 10) {
    file.forEach(function(offense) {
      // console.log(message);
      if (offense.severity_level == 1) {
        warningMessages.push(offense);
        // console.log(message);
      } else {
        errorMessages.push(offense);
        // console.log(message);
      }
    });
    errorsToDisplay = warningMessages.concat(errorMessages);
    errorsToDisplay = errorsToDisplay.slice(0,10).sort(function(a, b) {
      if (a.severity_level === b.severity_level) {
        // Line is only important when severities are the same
        if (a.line === b.line) {
          // Column is only important when lines are the same
          return a.column > b.column ? 1 : -1;
        }
        return a.line > b.line ? 1 : -1;
      }
      return b.severity_level > a.severity_level ? 1 : -1;
    });
  } else {
    errorsToDisplay = file.sort(function(a, b) {
      if (a.severity_level === b.severity_level) {
        // Line is only important when severities are the same
        if (a.line === b.line) {
          // Column is only important when lines are the same
          return a.column > b.column ? 1 : -1;
        }
        return a.line > b.line ? 1 : -1;
      }
      return b.severity_level > a.severity_level ? 1 : -1;
    });
  }
  return errorsToDisplay;
}


function parseOutPoutForRuleCheckAsText(output, truncate) {
  var parseableOutput = Object.keys(output);

  const spinner = ora("No offense, bravo!");

  parseableOutput.forEach(function(file) {
    console.log("");

    var relativePath = file;

    console.log("- " + chalk.green(relativePath));
    console.log(
      "--------------------------------------------------------------------------------------"
    );

    if (output[file].length == 0) {
      spinner.succeed();
      return;
    }
    var errorsToDisplay =  sortErrorsToDisplay(output[file], truncate)
    errorsToDisplay.forEach(function(error) {
      // console.log(error);
      var ruleName = error.symbol;
      var codeCoordinate = error.line + ":" + error.column;
      var shortMessage = error.message.split("\n")[0];
      console.log(
        chalk.grey(codeCoordinate) +
          " " +
          ruleName +
          " " +
          chalk.grey(shortMessage)
      );
    });
    if (truncate && output[file].length > 10) {
      console.log(
        chalk.grey(
          " + " +
            (output[file].length - errorsToDisplay.length) +
            " other offenses."
        )
      );
    }
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

  var dict = [];

  // body.policy.policy_rules.forEach(function(policy_rule) {
  var parseableOutput = Object.keys(output);

  parseableOutput.forEach(function(file) {
    var relativePath = file;

    if (output[file].length == 0) {
      var fileReport = {
        file_name: relativePath.substring(relativePath.lastIndexOf("/") + 1),
        file_path: relativePath,
        linter: "pylint"
      };
      rule_checks_attributes.push(fileReport);
    } else {
      output[file].forEach(function(offense) {
        var fileReport = {};

        fileReport.file_path = relativePath;
        fileReport.file_name = relativePath.substring(
          relativePath.lastIndexOf("/") + 1
        );

        fileReport.line = offense.line;
        fileReport.column = offense.column;
        fileReport.long_message = offense.message;
        fileReport.message = offense.message.split("\n")[0];
        fileReport.linter = "pylint"

        fileReport.rule_id = null;

        // console.log(policy_rule.slug);

        fileReport.name = offense.symbol;
        // fileReport.language_id = policy_rule.language_id;
        fileReport.severity_level = 1;
        var lines = getOffenseLine(relativePath, offense.line);
        fileReport.source = lines;
        // console.log(lines);
        // console.log(fileReport);
        rule_checks_attributes.push(fileReport);
      });
    }
  });

  // });

  return rule_checks_attributes;
}

function parsePylinResults(output, commitAttempt) {
  var pylintReport = {};
  var totalError = 0;
  var totalWarn = 0;
  var totalfixableErrorCount = 0;
  var totalfixableWarnCount = 0;

  var parseableOutput = Object.keys(output);

  parseableOutput.forEach(function(file) {
    totalWarn += output[file].length;
  });

  pylintReport.name = commitAttempt.message;
  pylintReport.commit_attempt_id = commitAttempt.id;
  pylintReport.repository_id = commitAttempt.repository_id;
  pylintReport.user_id = commitAttempt.user_id;
  pylintReport.policy_id = commitAttempt.policy.id;
  pylintReport.error_count = totalError;
  pylintReport.warning_count = totalWarn;
  pylintReport.fixable_error_count = totalfixableErrorCount;
  pylintReport.fixable_warning_count = totalfixableWarnCount;

  pylintReport.rule_checks_attributes = createRuleCheckJson(output, commitAttempt);

  // console.log(pylintReport);
  return pylintReport;
}

function runPylintOntStagedFiles(
  pythonFiles,
  autofix,
  commitAttempt,
  desiredFormat,
  truncate
) {
  // var cmd = "pylint --output-format json " + pythonFiles.join(" ");
  var cmd =
    'pylint --rcfile ' +
    dotLintDirectory +
    '/tmp/.pylintrc --output-format json "'
     + pythonFiles.join('" "') + '"';

  try {
    // console.log("=== Try ===");
    var linter_command = execSync(cmd, { stdio: [0] });
    if (linter_command) {
      var pylintOutPut = JSON.parse(linter_command.stdout);
      var output = _.mapValues(_.groupBy(pylintOutPut, "path"));

      if (desiredFormat == "simple") {
        parseOutPoutForRuleCheckAsText(output, truncate);
      } else {
        parseOutPoutForRuleCheckAsTable(output);
      }

      return parsePylinResults(output, commitAttempt);
    }
  } catch (err) {
    if (err.stdout) {
      var pylintOutPut = JSON.parse(err.stdout);
      var output = _.mapValues(_.groupBy(pylintOutPut, "path"));

      if (desiredFormat == "simple") {
        parseOutPoutForRuleCheckAsText(output, truncate);
      } else {
        parseOutPoutForRuleCheckAsTable(output);
      }
      return parsePylinResults(output, commitAttempt);
    }
    // prepareRequestAfterLint(passed, body)
    // process.exit(1);
    // // console.log("=== Catch after ===");
  }
}

module.exports = {
  selectFilesForPylint,
  sortPylintConfig,
  createPylintConfig,
  runPylintOntStagedFiles,
  checkForPyLintRequirement
};

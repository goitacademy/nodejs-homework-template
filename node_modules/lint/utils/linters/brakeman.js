const { execSync } = require("child_process");
const chalk = require("chalk");
const fs = require("fs");
const yaml = require("js-yaml");
var _ = require("lodash");
const { getRelevantSource } = require("../filesHandler");
const ora = require("ora");





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

function checkIfBrakemanIsInstalled() {
  try {
    var res = execSync("which brakeman");
    if (res) {
      return true;
    }
  } catch (err) {
    return false;
  }
  return false;
}

function installBrakeman() {
  try {
    console.log("=== Instaling Brakeman ===");
    var install_cmd = execSync("gem install brakeman", { stdio: [0, 1, 2] });
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

function displayOffenseAsText(offense) {
  var ruleName = offense.name;

  var linterMessage;
  var ruleSeverity;

  if (offense.severity_level == 1) {
    linterMessage = offense.message;
    ruleSeverity = chalk.yellow("Warning");
    // warningCount++;
  } else if (offense.severity_level == 2) {
    linterMessage = offense.message;
    ruleSeverity = chalk.red("Error");
    // errorCount++;
  }

  console.log(
    chalk.grey("Line " + offense.line) + " " + ruleSeverity + " " + ruleName + " " + chalk.grey(linterMessage)
  );
}
function sortErrorsToDisplay(offenses, truncate) {
  var errorMessages = [];
  var warningMessages = [];
  var errorsToDisplay;



  if (truncate && offenses.length > 10) {
    offenses.forEach(function(offense) {
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
      if (a.line === b.line) {
        // Column is only important when lines are the same
        return a.message > b.message ? 1 : -1;
      }
      return a.line > b.line ? 1 : -1;
    });
  } else {
    errorsToDisplay = offenses.sort(function(a, b) {
      if (a.severity_level === b.severity_level) {
        // Line is only important when severities are the same
        if (a.line === b.line) {
          // Column is only important when lines are the same
          return a.message > b.message ? 1 : -1;
        }
        return a.line > b.line ? 1 : -1;
      }
      return b.severity_level > a.severity_level ? 1 : -1;
    });
  }
  return errorsToDisplay;
}

function displayOffensesAsText(formattedBrakemanResult, truncate) {
  // console.log('formattedBrakemanResult');
  // console.log(formattedBrakemanResult);
  var groupedBrakemanResult = _.mapValues(
    _.groupBy(formattedBrakemanResult.rule_checks_attributes, "file_path")
  );
  var filePaths = Object.keys(groupedBrakemanResult);
  filePaths.forEach(function(file) {
    var warningCount = 0;
    var errorCount = 0;
    console.log("");
    console.log("- " + chalk.green(file));
    console.log(
      "--------------------------------------------------------------------------------------"
    );
    // console.log("No Offenses");
    if (groupedBrakemanResult[file]) {
      // console.log("Offenses");
      var errorsToDisplay = sortErrorsToDisplay(groupedBrakemanResult[file], truncate)

      errorsToDisplay.forEach(function(offense) {
        // console.log('offense');
        // console.log(offense);
        displayOffenseAsText(offense);
      });
    }
  });
}

function formatBrakemanResult(rawBrakemanResult) {
  // console.log(rawBrakemanResult.scan_info);
  // console.log();
  // console.log(rawBrakemanResult.warnings);
  // console.log(rawBrakemanResult);
  // console.log(rawBrakemanResult);


  var formattedBrakemanResult = {
    error_count: 0,
    warning_count: rawBrakemanResult.warnings.length || 0,
    linter: "brakeman",
    rule_checks_attributes: []

  };
  if (rawBrakemanResult.warnings.length > 0) {
    rawBrakemanResult.warnings.forEach(function(offense) {
      var fileReport = {};
      fileReport.file_path = offense.file;
      fileReport.file_name = offense.file.substring(
        offense.file.lastIndexOf("/") + 1
      );
      fileReport.message = offense.message;
      fileReport.line = offense.line;
      fileReport.name = offense.warning_type;
      fileReport.severity_level = 1;
      fileReport.rule_id = null;

      // fileReport.location = offense.location
      // fileReport.user_input = offense.user_input
      // fileReport.confidence = offense.confidence
      // fileReport.confidence_level = offense.confidence ?

      var lines = getRelevantSource(offense.file, offense.line);

      fileReport.source = lines;

      formattedBrakemanResult.rule_checks_attributes.push(fileReport);
    });
  }

  // console.log('rawBrakemanResult.errors');
  // console.log(rawBrakemanResult.errors);
  if (rawBrakemanResult.errors.length > 0) {
    rawBrakemanResult.errors.forEach(function(offense) {

      // console.log(offense);


      // Resultat Brakeman
      // { error:
      //    'invalid byte sequence in US-ASCII While processing /Users/jimmy/Dev/gatrix/app/views/commit_attempts/show.html.erb',
      //   location:
      //    '/Users/jimmy/.rvm/gems/ruby-2.5.3/gems/brakeman-4.3.1/lib/brakeman/parsers/rails3_erubis.rb:78:in 'gsub\'' }


      var tmp_1 = offense.error
      var line;
      var name;
      var message;
      var absoluteFilePath;
      if (tmp_1.split(" :: ").length > 1) {
        var tmp_2 = tmp_1[0]
        var tmp_3 = tmp_2.split(":")
        absoluteFilePath = tmp_3[0]
        line = parseInt(tmp_3[1])
        if (tmp_1[1]) {
          message = tmp_1[1].replace(/^\w/, c => c.toUpperCase());
        }
        name = offense.location.replace(absoluteFilePath, 'file.');
      } else {
        absoluteFilePath = tmp_1.substring(tmp_1.lastIndexOf(" "));
        message = tmp_1;
        name = tmp_1.replace(absoluteFilePath, ' file.');
      }

      var relativePath = absoluteFilePath.replace(process.cwd() + "/", "");

      // console.log("$$$ absoluteFilePath:", absoluteFilePath);
      // console.log("$$$ relativePath:", relativePath);
      // console.log("$$$ line:", line);
      // console.log("$$$ message:", message);
      // console.log("$$$ name:", name);

      var fileReport = {};
      fileReport.file_path = relativePath;
      fileReport.file_name = relativePath.substring(
        relativePath.lastIndexOf("/") + 1
      );
      fileReport.message = message;
      fileReport.line = line;
      fileReport.name = name;
      fileReport.severity_level = 1;
      fileReport.rule_id = null;
      formattedBrakemanResult.warning_count += 1

      if (line) {
        var lines = getRelevantSource(absoluteFilePath, line);
        fileReport.source = lines;
      }


      formattedBrakemanResult.rule_checks_attributes.push(fileReport);

      if (offense.file) {
        var fileReport = {};
        fileReport.file_path = offense.file;
        fileReport.file_name = offense.file.substring(
          offense.file.lastIndexOf("/") + 1
        );
        fileReport.message = offense.message;
        fileReport.line = offense.line;
        fileReport.name = offense.warning_type;
        fileReport.severity_level = 2;
        fileReport.rule_id = null;
        formattedBrakemanResult.error_count += 1
        // fileReport.location = offense.location
        // fileReport.user_input = offense.user_input
        // fileReport.confidence = offense.confidence
        // fileReport.confidence_level = offense.confidence ?

        var lines = getRelevantSource(offense.file, offense.line);

        fileReport.source = lines;

        formattedBrakemanResult.rule_checks_attributes.push(fileReport);
      }
    });

  }
  return formattedBrakemanResult;
}

function runBrakeman(files, truncate) {
  // var sanitizedFiles = [];
  // files.forEach(function(file) {
  //   file.replace(/"/g, "\'")
  // })
  // if(checkIfRubyIsInstalled()) {
  //   console.log("Ruby is installed");
  // } else {
  //   console.log("Ruby is not installed");
  //   // return 1;
  // }
  if(checkIfBrakemanIsInstalled()) {
    console.log("Brakeman is installed");
  } else {
    console.log("Brakeman is not installed");
    console.log("Install it using " + chalk.bold.cyan("lint install-brakeman") + " or " + chalk.bold.cyan("gem install brakeman") + " or ");
    return 1;
  }

  var cmd = 'brakeman -f json --only-files "' + files.join(",") + '"';
  var output;
  try {
    // console.log(cmd);
    var brakemanResult = execSync(cmd, { stdio: [0] });
    if (brakemanResult) {
      // console.log(brakemanResult);
      // console.log(brakemanResult.toString());
      output = JSON.parse(brakemanResult.toString());
      // console.log(output);
      var formattedBrakemanResult = formatBrakemanResult(output);

      // console.log("formattedBrakemanResult");
      // console.log(formattedBrakemanResult);

      // displayOffensesAsText(formattedBrakemanResult);

      // return formattedBrakemanResult;

      // console.log(output);
    }
  } catch (e) {
    if (e) {
      console.log("Error launching Brakeman");
      console.log(e.stdout);
    }
    if (e.status === 4) {
      console.log("");
      console.log("Not inside a Rails application.");
      console.log(e);
      return
    } else {
      if (e.stdout) {
        console.log(e.stdout);
        output = JSON.parse(e.stdout.toString());
      }
      // console.log(output);
    }
  }
  var formattedBrakemanResult = formatBrakemanResult(output);

  if (formattedBrakemanResult.rule_checks_attributes.length == 0) {
    console.log("");
    ora("No offense").succeed()
  }
  displayOffensesAsText(formattedBrakemanResult, truncate);

  return formattedBrakemanResult;
}

module.exports = {
  checkIfBrakemanIsInstalled,
  installBrakeman,
  runBrakeman
};

const { execSync } = require("child_process");
const fs = require("fs");
const yaml = require("js-yaml");
var _ = require('lodash');
const chalk = require("chalk");

const {
  getEnclosingGitRepository,
  isLintFilePresent,
  getDotLintDirectory
} = require("../filesHandler");
const ora = require("ora");

const dotLintDirectory = getDotLintDirectory();

function installErbLint() {
  try {
    console.log("==== Instaling ErbLint ===");
    var install_cmd = execSync("gem install erblint", { stdio: [0, 1, 2] });
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

function createErbLintConfig() {
  var rubocopConfigPath = dotLintDirectory + "/tmp/rubocop.yml"
  var configContent = {
    "linters": {
      "Rubocop": {
        "enabled": true,
        "rubocop_config": {
          "inherit_from": rubocopConfigPath
        }
      }
    }
  }

  var yml = yaml.dump(configContent);

  // console.log("yml");
  // console.log(yml);

  if (!fs.existsSync(dotLintDirectory)) {
    fs.mkdirSync(dotLintDirectory);
  }
  if (!fs.existsSync(dotLintDirectory + "/tmp")) {
    fs.mkdirSync(dotLintDirectory + "/tmp");
  }
  fs.writeFileSync(dotLintDirectory + "/tmp/.erb-lint.yml", yml);
}

function checkIfErbLintIsInstalled() {
  try {
    var res = execSync("which erblint");
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
    if (checkIfErbLintIsInstalled()) {
      console.log("ERB Lint is installed.");
    } else {
      return console.error("ERB Lint is not installed.");
    }
  } else {
    return console.error(
      "Ruby is not installed. Please install Ruby to continue."
    );
  }
}

function getExtension(file) {
  return file.split(".").pop();
}



function selectFilesForErbLint(stagedFilePaths) {
  var selectedFiles = [];
  stagedFilePaths.forEach(function(file) {
    if (
      getExtension(file).toLowerCase() === "erb"
    ) {
      selectedFiles.push(file);
    }
  });
  return selectedFiles;
}


function parseErbLintOutput(output, statusCode) {
  // console.log(output);
  var result = output.split("\n")
  result.shift()
  result.shift()
  result.pop()
  // result.pop()

  // var offenses = result.split("\n")
  var tmpOffenses = []

  var offenses = []

  if (statusCode === 0) {
    // console.log(tmpOffenses);
    // console.log("No offenses");

    return offenses
  }
  var i,j,temparray,chunk = 3;
  for (i=0,j=result.length; i<j; i+=chunk) {
      temparray = result.slice(i,i+chunk);
      temparray.pop()
      tmpOffenses.push(temparray)
  }





  tmpOffenses.forEach(function(tmpOffense) {

    var filePath = tmpOffense[1].split(":")[1];
    if (filePath) {
      filePath = filePath.substr(1)
    }
    var message = tmpOffense[0].split(":")[1];
    if (message) {
      var slug = tmpOffense[0].split(":")[0];
      message = message.substr(1)
    } else {
      var slug = null;
      message = tmpOffense[0].split(":")[0];
    }
    var line = parseInt(tmpOffense[1].split(":")[2]);
    var source = getRelevantSource(filePath, line)

    var offense = {
      file_path: filePath,
      file_name: filePath.substring(filePath.lastIndexOf("/") + 1),
      name: slug,
      message: message,
      line: line,
      severity_level: 1,
      source: source
    };
    // console.log('offense')
    // console.log(offense)
    offenses.push(offense);

  });

  // offenses = _.mapValues(_.groupBy(offenses, "filePath"));

  // console.log('offenses')
  // console.log(offenses)


  return offenses
}


function getRelevantSource(file, lineStart) {
  var offenseLines = []
  try {
    var content = fs.readFileSync(file)
    var allLinesString = content.toString()
    var allLines = allLinesString.split("\n")
    for (var i = lineStart - 3; i < lineStart + 2; i++) {
      if (i > -1) {
        if (typeof allLines[i] !== 'undefined') {
          offenseLines.push({
            line: i + 1,
            code: allLines[i]
          })
        }
      }
    }
    return offenseLines
  } catch (e) {
    console.log('Error reading the relevant source for file: ' + file + ' at line: ' + lineStart)
    console.log(e)
  }
  return null
}


function parseErbLintResults(offenses, body) {
  var erbLintReport = {};
  var totalError = 0;
  var totalWarn = 0;
  var totalfixableErrorCount = 0;
  var totalfixableWarnCount = 0;
  // console.log("offenses");

  // console.log(offenses);
  erbLintReport.name = body.content.message
  erbLintReport.commit_attempt_id = body.content.id
  erbLintReport.repository_id = body.content.repository_id
  erbLintReport.user_id = body.content.user_id
  erbLintReport.policy_id = body.policy.content.id
  erbLintReport.error_count = totalError

  offenses.forEach(function(offense) {
    if (offense.message) {
      totalWarn += 1
    }

  })
  if (offenses.length > 0) {
    erbLintReport.warning_count = totalWarn
    erbLintReport.rule_checks_attributes = offenses
  } else{
    erbLintReport.warning_count = totalWarn
    erbLintReport.rule_checks_attributes = []
  }
  erbLintReport.fixable_error_count = totalfixableErrorCount
  erbLintReport.fixable_warning_count = totalfixableWarnCount
  // erbLintReport.rule_checks_attributes = createRuleCheckJson(offensesGroups, body)

  // console.log(erbLintReport);
  return erbLintReport


}


function parseOutPoutForRuleCheckAsText(offenses) {
  var output =  _.mapValues(_.groupBy(offenses, "file_path"));
  var parseableOutput = Object.keys(output)

  const spinner = ora("No offense, bravo!");
  // console.log("parseOutPoutForRuleCheckAsText");
  // console.log(parseableOutput);

  parseableOutput.forEach(function(file) {
    console.log("");

    var relativePath = file

    console.log("- " + chalk.green(relativePath));
    console.log("--------------------------------------------------------------------------------------");
    // console.log(output);

    if (output[file]) {
      output[file].forEach(function(error){

        if (!error.message) {
          spinner.succeed();
          return
        }
        if (error.name != null) {
          var ruleName = error.name
        }
        var codeCoordinate = error.line
        var shortMessage = error.message
        if (ruleName) {
          console.log( chalk.grey(codeCoordinate) + " " + ruleName + " " + chalk.grey(shortMessage) );

        } else {
          console.log( chalk.grey(codeCoordinate) + " " + chalk.grey(shortMessage) );

        }
      })
    }
  })
  console.log("");


}

function runErbLint(files, body) {
  console.log("")

  var cmd = "erblint --config "+ dotLintDirectory + "/tmp/.erb-lint.yml "+ files.join(" ")
  var statusCode = 0
  try {
    // console.log("merde1");

    var erbLintRunner = execSync(cmd)

    if (erbLintRunner) {
      // console.log("no offenses");
      // console.log(erbLintRunner);

      // console.log(erbLintRunner.toString());

      var offenses = parseErbLintOutput(erbLintRunner.toString(), statusCode)
      // console.log("BBBBBBB");
      // console.log(offenses);
      // console.log(offenses.length);

      if (offenses.length == 0) {
        // console.log("no offenses");
        files.forEach(function(file){
          var offense = {
            file_path: file,
            file_name: file.substring(file.lastIndexOf("/") + 1)
          }
          // console.log("Loop");

          // console.log(offenses);
          offenses.push(offense);

        })
        // offenses.push(offense);


      }
      parseOutPoutForRuleCheckAsText(offenses);

      // console.log("Status Code");
      // console.log(statusCode);
      return parseErbLintResults(offenses, body);

    }
  } catch (e) {
    // console.log("Error maison");
    // console.log(e);
    statusCode = e.status

    if (e.stdout && statusCode === 1) {

      var output = e.stdout.toString();
      // console.log(output);
      // console.log('-------------------');
      var offenses = parseErbLintOutput(output, statusCode)
      var output =  _.mapValues(_.groupBy(offenses, "file_path"));
      var parseableOutput = Object.keys(output)

      files.forEach(function(file){
        if (parseableOutput.indexOf(file) === -1 ) {
          // console.log("No error");
          var offense = {
            file_path: file,
            file_name: file.substring(file.lastIndexOf("/") + 1)
          }

          offenses.push(offense);
        }
      })
      // console.log('offenses');
      // console.log(offenses);

      // if (desiredFormat == "simple") {
      parseOutPoutForRuleCheckAsText(offenses);
      // } else {
      //   parseOutPoutForRuleCheckAsTable(offenses);
      // }
      // console.log("Status Code");
      // console.log(statusCode);

      return parseErbLintResults(offenses, body);
    } else {
      console.log("Error");
      console.log(e);
    }

  }

}

module.exports = {
  createErbLintConfig,
  selectFilesForErbLint,
  runErbLint,
  installErbLint,
  checkIfErbLintIsInstalled
}

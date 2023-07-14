const fs = require("fs")
const os = require("os")
const path = require("path")
const chalk = require("chalk")
const request = require("request")
const { exec, execSync, spawn } = require("child_process")
var CliTable = require("cli-table")
const { prompt } = require("inquirer")

const {
  getUsernameFromLocalDevice,
  getTokenFromLocalDevice
} = require("../user")
const {
  getEnclosingGitRepository,
  isLintFilePresent,
  getDotLintDirectory
} = require("../filesHandler")

const dotLintDirectory = getDotLintDirectory()


function runPrettierOnProject(extenstion) {
  var root_path = getEnclosingGitRepository()
  if (root_path == " ") {
    return
  }
  var extenstionToFormat = "**/*." + extenstion
  try {
    var cmd = execSync('prettier --write "' + extenstionToFormat + '"')

    if (cmd) {
      console.log(cmd.toString())
      console.log("Successfully made project prettier.")
    }
  } catch (err) {
    if (err.stdout) {
      console.log(err.stdout.toString())
    }
    if (err.stderr) {
      console.log(err.stderr.toString())
    }

    process.exit(1)
  }
}

function runPrettierOnStagedFiles(prettierFiles) {
  if (prettierFiles.length == 0) {
    return
  }
  // console.log("prettierFiles")
  console.log(prettierFiles)
  // console.log("quotedAndCommaSeparated")

  var quotedAndCommaSeparated = '"' + prettierFiles.join('" "') + '"'

  // console.log(quotedAndCommaSeparated)
  try {
    var cmd = execSync(
      "prettier --config " +
        dotLintDirectory +
        "/tmp/prettierrc " +
        "--write " +
        quotedAndCommaSeparated
    )
    if (cmd) {
      console.log("Successfully made " + files.length + " files prettier.")
      console.log(cmd.toString())
      return true
    }
  } catch (err) {
    console.log(err.stdout.toString())
    return false
  }
  return false
}
//test
function verifyIfFilesNeedPrettier() {
  var stagedFiles = getStagedFiles()
  if (stagedFiles.length === 0) {
    console.log("No staged files.")
    console.log("")
    process.exit(0)
    return
  }
  try {
    var quotedAndCommaSeparated = '"' + stagedFiles.join('" "') + '"'

    console.log(quotedAndCommaSeparated)
    var res = execSync(
      "prettier --config " +
        dotLintDirectory +
        "/tmp/prettierrc --list-different " +
        quotedAndCommaSeparated
    )
    if (res) {
      // console.log(res.stdout);
      return true
    }
  } catch (err) {
    console.log(err.stdout.toString())
    console.log(err.stdout.toString().count)
    // console.log(err);
    return false
  }
  return false
}

function askToRunPrettier(stagedFiles) {
  var files = stagedFiles
  if (files.length == 0) {
    return
  }
  prompt([
    {
      type: "confirm",
      name: "confirm",
      message: "Do you want to run prettier on " + files.length + " files ?"
    }
  ]).then(answers => {
    if (answers.confirm) {
      runPrettierOnStagedFiles()
    }
  })
}

function checkIfPrettierIsInstalled() {
  try {
    var res = execSync("which prettier")
    if (res) {
      return true
    }
  } catch (err) {
    return false
  }
  return false
}


function installPrettier() {
  try {
    console.log("==== Instaling Prettier ===");
    var install_cmd = execSync("npm install -g prettier", { stdio: [0, 1, 2] });
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


function formatPrettierRules(prettier_rules, policy_rule) {
  var name = policy_rule.slug
  var prettier_rules = prettier_rules
  if (
    policy_rule.linter &&
    policy_rule.linter.command == "prettier"
  ) {
    // console.log(policy_rule);

    if (policy_rule.options.length == 0) {
      prettier_rules[name] = parseInt(policy_rule.options)
    } else {
      policy_rule.options.forEach(function(option) {
        var rule_option = option.rule_option
        var options = []
        if (rule_option) {
          switch (rule_option.value_type) {
            case "integer":
              // console.log("integer");
              prettier_rules[name] = parseInt(option.selected.value)
              break
            case "boolean":
              // console.log("Boolean");
              var isTrueSet = option.selected.value == "true"
              prettier_rules[name] = isTrueSet
              break
            case "string":
              // console.log("String");
              prettier_rules[name] = option.selected.value
              break
            case "array-single":
              prettier_rules[name] = option.selected.value
              break
            case "array-multiple":
              // console.log("array-multiple");
              if (option.rule_option_options.length == 0) {
                // console.log("0 choice");
                prettier_rules[name] = policy_rule.status
              } else if (option.rule_option_options.length == 1) {
                // console.log("1 choice");
                options.push(option.rule_option_options[0].value)
                prettier_rules[name] = options
              } else if (option.rule_option_options.length > 1) {
                // console.log("More than 1 choice");
                option.rule_option_options.forEach(function(
                  rule_option_option
                ) {
                  options.push(rule_option_option.value)
                })
                prettier_rules[name] = options
              }
              break
            default:
          }
        } else {
          prettier_rules[name] = rule.content.options
        }
      })
    }
  }
  return prettier_rules
}

function createPrettierConfig(rules) {
  // console.log(rules);
  var rulesSet = JSON.stringify(rules)

  if (!fs.existsSync(dotLintDirectory)) {
    fs.mkdirSync(dotLintDirectory)
  }
  if (!fs.existsSync(dotLintDirectory + "/tmp")) {
    fs.mkdirSync(dotLintDirectory + "/tmp")
  }
  fs.writeFileSync(dotLintDirectory + "/tmp/prettierrc", rulesSet)
  // verifyIfFilesNeedPrettier();
  // console.log("Prettier configuration file successfully updated.");
}

// function getStagedFiles() {
//   try {
//     var git_staged_result = execSync("git diff-index --cached --name-only HEAD")
//     if (git_staged_result) {
//       var stagedFilePaths = git_staged_result
//         .toString()
//         .replace(/[\r]+/g, "")
//         .split("\n")
//         .slice(0, -1)
//     }
//     return stagedFilePaths
//   } catch (err) {
//     console.log("Error getting Staged Files in prettier.js");
//     console.log(err)
//     process.exit(1)
//   }
// }

function setParser(file) {
  var parser = ""
  switch (getFileExtension(file)) {
    case "js":
      parser = "babylon"
      break;
    case "css":
      parser = "css"
      break;
    case "scss":
      parser = "css"
      break;
    case "flow":
      parser = "flow"
      break;
    case "ts":
      parser = "typescript"
      break;
    case "less":
      parser = "less"
      break;
    case "json":
      parser = "json"
      break;
    case "json5":
      parser = "json"
      break;
    case "json-stringify":
      parser = "json"
      break;
    case "html":
      parser = "html"
      break;
    case "vue":
      parser = "html"
      break;
    case "angular":
      parser = "angular"
      break;
    case "yaml":
      parser = "yaml"
      break;
    case "yml":
      parser = "yaml"
      break;
    default:
    parser = "babylon"
  }
  return parser
}

function selectFilesForPrettier(stagedFilePaths) {
  var selectedFiles = []
  stagedFilePaths.forEach(function(file) {
    if (
      getFileExtension(file) === "js" ||
      getFileExtension(file) === "css" ||
      getFileExtension(file) === "scss" ||
      getFileExtension(file) === "babylon" ||
      getFileExtension(file) === "flow" ||
      getFileExtension(file) === "typescript" ||
      getFileExtension(file) === "css" ||
      getFileExtension(file) === "scss" ||
      getFileExtension(file) === "less" ||
      getFileExtension(file) === "json" ||
      getFileExtension(file) === "json5" ||
      getFileExtension(file) === "json-stringify" ||
      getFileExtension(file) === "graphql" ||
      getFileExtension(file) === "markdown" ||
      getFileExtension(file) === "mdx" ||
      getFileExtension(file) === "html" ||
      getFileExtension(file) === "vue" ||
      getFileExtension(file) === "angular" ||
      getFileExtension(file) === "yaml"
    ) {
      selectedFiles.push(file)
    }
  })
  return selectedFiles
}
function getFileExtension(file) {
  var extenstion = file.split(".").pop()
  return extenstion
}
module.exports = {
  createPrettierConfig,
  formatPrettierRules,
  runPrettierOnStagedFiles,
  askToRunPrettier,
  runPrettierOnProject,
  selectFilesForPrettier,
  setParser,
  installPrettier,
  checkIfPrettierIsInstalled
}

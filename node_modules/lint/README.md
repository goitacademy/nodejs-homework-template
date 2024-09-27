![Omnilint logo](./assets/images/logo-dark.png#gh-dark-mode-only)
![Omnilint logo](./assets/images/logo-light.png#gh-light-mode-only)

---

# Installation (global)
Install globally:
```sh
$ npm i -g lint
```
## Usage (global)

Get inside your repository:
```sh
$ cd /path/to/repo
```
Use it globally
```sh
$ lint [COMMAND]
```
Start new repository:
```sh
$ lint init
```
Lint files linted by git:
```sh
$ lint
```
To install git hooks:
```sh
$ cd path/to/repository
$ lint install:hooks
```

---

## Installation (local)
Install into your devDependencies:
```sh
$ npm i -D lint
```
### Usage (local)
Use it with NPX from inside your repository:

```sh
$ npx lint [COMMAND]
```

To install git hooks:
```sh
$ npx lint install:hooks
```


```
Usage: lint [options] [command]

Options:
  -v, --version          output the version number
  -h, --help             output usage information

Commands:
  init                   Initializes current repository
  install:hooks          Install git hooks
  install:eslint         Install ESLint
  install:erblint        Install ERB Lint
  install:brakeman       Install Brakeman
  install:rubocop        Install Rubocop
  install:stylelint      Install StyleLint
  lint:staged [options]  Lint Staged files
  pre-commit [options]   Simulates pre-commit git hook actions.
  prepare-commit-msg     Triggers 'prepare-commit-msg' hook actions.
  post-commit            Triggers 'post-commit' hook actions.
  prettify <extenstion>  Run Prettier on project.
  login                  Sign in on local device.
  logout                 Sign out from local device.
  signup                 Creates an account
  whoami                 Get current user status
```

## Sign Up
Create your free Omnilint account:
```sh
$ lint signup
```
## Log In
Log in with your existing Omnilint account:
```sh
$ lint login
```
## Version
Print the CLI version:
```sh
$ lint version
```
## Help
Print the list of available commands:
```sh
$ lint --help
```
## Website
[https://www.omnilint.com](https://www.omnilint.com)

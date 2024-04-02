# Configuration Wizard CLI

This CLI tool provides a configuration wizard for setting up owner and allowed repositories on GitHub.

## Installation

To use the Configuration Wizard CLI, you need to have Node.js installed on your system.

1. Install NPM package:

   ```bash
   npm install relez -g
   ```

2. Install and configure GitHub CLI
   
   ```bash
   sudo apt update 
   sudo apt install gh -y
   gh auth login
   ```
   
   **Important**
   GH CLI version required: v2.46 (2024-03-20)
   

## Usage

### Commands:

- `create`: Create different entities.
- `list`: List all not merged pull requests.
- `update`: Update different entities.
- `config`: Configure GitHub username and repository.

### Sub-commands:

#### `create`:

- `release [type]`: Create a major, minor, or patch release branch.
- `pr <branch> [target]`: Create a pull request for the given branch to the target branch.

#### `list`:

- `pr`: List all not merged PRs.

#### `update`:

- `branch <target> <source>`: Update branch with sourceBranch.

#### `config`:

- `view`: View the configured GitHub username and repository.

### Options:

- `-t, --tag <tag>`: Specify the tag for the release branch.

### Example:

To create a release branch with a specified tag:

```bash
./cli.js create release <type> --tag <tag>
```

To create a pull request for a specific branch:

```bash
./cli.js create pr <branch> [target]
```

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

Feel free to customize the content as per your project requirements and add additional sections like Installation,
Usage, License, etc., based on your project's needs.
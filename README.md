# About

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
relez create release <type> --tag <tag>
```

To create a pull request for a specific branch:

```bash
relez create pr <branch> [target]
```

## License

Feel free to customize the content as per your project requirements and add additional sections like Installation,
Usage, License, etc., based on your project's needs.


## Disclaimer

This project is provided "as is," without warranty of any kind, express or implied, including but not limited to the warranties of merchantability, fitness for a particular purpose, and noninfringement. In no event shall the authors or copyright holders be liable for any claim, damages, or other liability, whether in an action of contract, tort, or otherwise, arising from, out of, or in connection with the software or the use or other dealings in the software.

Use this project at your own risk. The authors and contributors of this project disclaim all liability for any damages or losses, direct or indirect, that may arise from your use or inability to use the project or any part thereof, including but not limited to any loss of business, revenue, profits, or data, even if advised of the possibility of such damages.

By using this project, you agree to indemnify and hold harmless the authors and contributors from any claims, damages, losses, liabilities, costs, and expenses, including attorney's fees, arising from your use of the project or your violation of these terms.

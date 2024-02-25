#!/usr/bin/env node

const { program } = require('commander');
const branchCommand = require('../commands/branchCommand');
const cfg = require('../lib/config');

program
    .version('1.0.0')
    .description('A configuration wizard for setting up owner and allowed repositories');

// Create Command
const createCommand = program.command('create')
    .description('Create different entities');

createCommand
    .command('release [type]')
    .description('Create a major, minor, or patch release branch')
    .option('-t, --tag <tag>', 'Specify the tag for the release branch')
    .action(branchCommand.createBranchCommand);

createCommand
    .command('pr <branch> [target]')
    .description('Create a pull request for the given branch to the target branch')
    .action(branchCommand.createPrCommand);

// List Command
const listCommand = program.command('list')
    .description('List all not merged pull requests');

listCommand
    .command('pr')
    .description('List all not merged PRs')
    .action(() => {
        // Logic to list not merged PRs
    });

// Update Command
const updateCommand = program.command('update')
    .description('Update different entities');

updateCommand
    .command('branch <target> <source>')
    .description('Update branch with sourceBranch')
    .action(branchCommand.updateBranchCommand);

// Config Command
const configCommand = program.command('config')
    .description('Configure GitHub username and repository')
    .action(cfg.init);

configCommand
    .command('view')
    .description('View the configured GitHub username and repository')
    .action(() => {
        console.log(cfg.read());
    });

// Parse the command line arguments
program.parse(process.argv);

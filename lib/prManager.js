const {execSync} = require('child_process');
const validator = require("./validator");
const cfg = require("./config");
const utils = require('./utils');
const repo = require('./repo');

const create = (branchName, target) => {

    validator.validateIfBranchExists(branchName);
    validator.validateIfBranchExists(target);

    const repository = cfg.get('repository');
    const owner = cfg.get('owner');
    const title = utils.ucfirst(branchName);

    try {
        repo.cleanupRepository(repository);
        repo.cloneRepository(repository, owner);
        repo.switchTo(repository, branchName);
        repo.status(repository);
        repo.pull(repository);
        repo.mergeBranch(repository, target);
        repo.createPr(repository, owner, title, target);

        console.log(`### PR ${branchName} created to ${target}`);
    }
    catch (e) {
        console.error(e.toString());

        repo.cleanupRepository(repository);
    }
};

module.exports = {
    create
};